#!/usr/bin/env bash
set -euo pipefail

# =========================================================
#  RECORTE SOLAMENTE (sin CRF) + HANDOFF AL CRF (sin tocarlo)
#  - No deforma: si es chico → COVER (upscale + crop); si es grande/igual → CUT (solo crop)
#  - No crea carpetas (falla si no existen)
#  - Usa ./ffmpeg/ffmpeg y ./ffmpeg/ffprobe si existen; sino, los del sistema
#  - Al final pasa el recorte como fuente al CRF: WORK_INPUT/SRC_ORIG = CROPPED (ABS)
#  - No modifica tu código de CRF; solo asegura LEVEL numérico si era inválido
#
#  Requiere (export antes de llamar):
#    INPUT, CROPPED, PRESET, PROFILE, LEVEL, PIXFMT
#  Opcional:
#    FFMPEG, FFPROBE, TARGET_W, TARGET_H   (por defecto 1080x1920, ambos pares)
# =========================================================

# --- die guard (si ya existe, no redefinir) ---
if ! type -t die >/dev/null 2>&1; then
  die() { echo "❌ $*"; exit 1; }
fi

# --- localizar ffmpeg/ffprobe (sin tocar tus vars globales) ---
FFMPEG_BIN="${FFMPEG:-}"
FFPROBE_BIN="${FFPROBE:-}"
if [ -z "$FFMPEG_BIN" ]; then
  if [ -x "./ffmpeg/ffmpeg" ]; then FFMPEG_BIN="./ffmpeg/ffmpeg"; else FFMPEG_BIN="$(command -v ffmpeg || true)"; fi
fi
if [ -z "$FFPROBE_BIN" ]; then
  if [ -x "./ffmpeg/ffprobe" ]; then FFPROBE_BIN="./ffmpeg/ffprobe"; else FFPROBE_BIN="$(command -v ffprobe || true)"; fi
fi
[ -n "$FFMPEG_BIN" ]  || die "ffmpeg no encontrado"
[ -n "$FFPROBE_BIN" ] || die "ffprobe no encontrado"

# --- validar entradas (no crear carpetas) ---
: "${INPUT:?Falta INPUT}"
: "${CROPPED:?Falta CROPPED}"
: "${PRESET:?Falta PRESET}"
: "${PROFILE:?Falta PROFILE}"
: "${PIXFMT:?Falta PIXFMT}"
[ -f "$INPUT" ] || die "No existe INPUT: $INPUT"
outdir="$(dirname "$CROPPED")"
[ -d "$outdir" ] || die "No existe carpeta destino: $outdir"

# --- util: ruta absoluta sin readlink -f (no cambia cwd global) ---
abspath() {
  local tgt="$1"
  if [ -d "$tgt" ]; then
    (cd "$tgt" && pwd)
  else
    (cd "$(dirname "$tgt")" && printf "%s/%s\n" "$(pwd)" "$(basename "$tgt")")
  fi
}
INPUT_ABS="$(abspath "$INPUT")"
CROPPED_ABS="$(abspath "$CROPPED")"

# --- lienzo destino (pares). por defecto 1080x1920 si no se definen ---
TARGET_W_LOCAL="${TARGET_W:-1080}"
TARGET_H_LOCAL="${TARGET_H:-1920}"
[ $((TARGET_W_LOCAL % 2)) -eq 0 ] || die "TARGET_W debe ser par"
[ $((TARGET_H_LOCAL % 2)) -eq 0 ] || die "TARGET_H debe ser par"

# --- leer dimensiones reales (ffprobe CSV con coma) ---
IFS=',' read -r IN_W IN_H < <("$FFPROBE_BIN" -v error -select_streams v:0 \
  -show_entries stream=width,height -of csv=p=0 "$INPUT_ABS")
case "$IN_W" in (*[!0-9]*|'') die "width inválido: '$IN_W'";; esac
case "$IN_H" in (*[!0-9]*|'') die "height inválido: '$IN_H'";; esac

# --- filtro sin deformar ---
# pequeño: cover (scale up + crop) ; grande/igual: cut (solo crop)
if [ "$IN_W" -lt "$TARGET_W_LOCAL" ] || [ "$IN_H" -lt "$TARGET_H_LOCAL" ]; then
  MODE="COVER (upscale + crop)"
  FILTER_CROP="scale=${TARGET_W_LOCAL}:${TARGET_H_LOCAL}:force_original_aspect_ratio=increase:flags=lanczos,\
crop=${TARGET_W_LOCAL}:${TARGET_H_LOCAL}:floor((iw-${TARGET_W_LOCAL})/2):floor((ih-${TARGET_H_LOCAL})/2),setsar=1,\
scale=ceil(iw/2)*2:ceil(ih/2)*2"
else
  MODE="CUT (solo crop)"
  FILTER_CROP="crop=${TARGET_W_LOCAL}:${TARGET_H_LOCAL}:floor((iw-${TARGET_W_LOCAL})/2):floor((ih-${TARGET_H_LOCAL})/2),setsar=1,\
scale=ceil(iw/2)*2:ceil(ih/2)*2"
fi

echo "🧩 Aplicando scale/crop (sin deformar) → $CROPPED_ABS"
echo "   INPUT=${IN_W}x${IN_H}  TARGET=${TARGET_W_LOCAL}x${TARGET_H_LOCAL}"
echo "   Modo: $MODE"
echo "   FILTER=$FILTER_CROP"

# --- validación rápida del filtro (no escribe archivo) ---
"$FFMPEG_BIN" -v error -i "$INPUT_ABS" -vf "$FILTER_CROP" -t 0.5 -f null - \
  || die "Filtro inválido (revisa dimensiones/filtro)."

# --- opciones de encoder SOLO para este recorte (no tocar tu CRF) ---
# Si LEVEL no es numérico (ej. "ultra"), NO pasar -level (evita error en recorte)
X264_PLVL_ARGS=()
if [[ "${LEVEL:-}" =~ ^[0-9]+(\.[0-9])?$ ]]; then
  X264_PLVL_ARGS=( -profile:v "${PROFILE}" -level "${LEVEL}" )
else
  X264_PLVL_ARGS=( -profile:v "${PROFILE}" )
fi

# elegir encoder según este ffmpeg
if "$FFMPEG_BIN" -hide_banner -encoders 2>/dev/null | grep -q '\blibx264\b'; then
  VENC_OPTS=( -c:v libx264 -preset "${PRESET}" -crf 18 "${X264_PLVL_ARGS[@]}" -pix_fmt "${PIXFMT}" -movflags +faststart )
else
  VENC_OPTS=( -c:v mpeg4 -q:v 2 -pix_fmt yuv420p )
fi

# --- recortar + codificar (SOLO este paso; SIN CRF aquí) ---
"$FFMPEG_BIN" -y -v error -i "$INPUT_ABS" -vf "$FILTER_CROP" \
  "${VENC_OPTS[@]}" -an "$CROPPED_ABS" || die "Falló recorte"

[ -s "$CROPPED_ABS" ] || die "Recorte no produjo archivo: $CROPPED_ABS"
echo "🧩 Recorte aplicado → $CROPPED_ABS"

# --- HANDOFF al CRF (sin modificar tu código de CRF) ---
# 1) asegurar que la etapa CRF use el ARCHIVO RECORTADO como fuente (ABS)
SOURCE="$CROPPED_ABS"
export WORK_INPUT="$SOURCE"
SRC_ORIG="$SOURCE"

# 2) si LEVEL no es numérico, forzar un nivel válido SOLO para lo que siga (x264)
if [ -z "${LEVEL:-}" ] || ! [[ "$LEVEL" =~ ^[0-9]+(\.[0-9])?$ ]]; then
  echo "⚠ LEVEL='${LEVEL:-<vacío>}' no válido para x264; usando 4.1 solo para la etapa posterior"
  LEVEL="4.1"
fi

# (tu script continuará con el CRF debajo, sin cambios)
