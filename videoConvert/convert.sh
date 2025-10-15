#!/bin/bash
set -euo pipefail

# ───────────── config base ─────────────
KIT_DIR="./videokit"

# Cargar módulos
source "${KIT_DIR}/config.sh"
source "${KIT_DIR}/helpers.sh"

# Verificaciones
[ -x "$FFMPEG" ] || die "No se encontró ffmpeg en $FFMPEG"
command -v "$FFPROBE" >/dev/null 2>&1 || die "No se encontró ffprobe"

# Directorios
INPUT_DIR="./video"
OUTPUT_DIR="./ready"
mkdir -p "$OUTPUT_DIR" || die "No pude crear $OUTPUT_DIR"

# Extensiones a procesar
shopt -s nullglob
mapfile -t FILES < <(printf "%s\n" "$INPUT_DIR"/*.{mp4,mov,mkv,webm,m4v,avi} 2>/dev/null | sed '/\*\.{/d')

[ "${#FILES[@]}" -gt 0 ] || die "No hay videos en ${INPUT_DIR} (mp4, mov, mkv, webm, m4v, avi)."

# ───────────── pedir opciones UNA VEZ (usando el 1er archivo como referencia de dimensiones/duración) ─────────────
INPUT="${FILES[0]}"
export INPUT OUTPUT_DIR FFMPEG FFPROBE
source "${KIT_DIR}/prompts.sh"
# prompts.sh exporta: WANT_CROP, MODE, TARGET_MB, PRESET, FPS_FILTER, DENOISE_FILTER, WANT_GIF, GIF_FPS, GIF_MAX_COLORS, (opcional) GIF_LOSSY, y si MODE=1 exporta CRF_START.

echo ""
echo "🗂  Archivos a procesar: ${#FILES[@]}"
printf '%s\n' "${FILES[@]}" | sed 's/^/   • /'

# ───────────── procesar cada archivo ─────────────
idx=0
for INPUT in "${FILES[@]}"; do
  idx=$((idx+1))
  BASENAME="$(basename -- "$INPUT")"
  NAME_NOEXT="${BASENAME%.*}"

  echo ""
  echo "────────────────────────────────────────────────────────"
  echo "▶️  [$idx/${#FILES[@]}] Procesando: $BASENAME"
  echo "────────────────────────────────────────────────────────"

  # Definir rutas de salida por archivo
  CROPPED="${OUTPUT_DIR}/${NAME_NOEXT}_cropped.mp4"
  FINAL="${OUTPUT_DIR}/${NAME_NOEXT}_reduced.mp4"
  GIF_OUT="${OUTPUT_DIR}/${NAME_NOEXT}_video.gif"
  export INPUT CROPPED FINAL GIF_OUT OUTPUT_DIR

  # Limpiar restos previos de este archivo
  rm -f "$CROPPED" "$FINAL" "$GIF_OUT" 2>/dev/null || true

  # ── Recorte (opcional)
  if [[ "$WANT_CROP" =~ ^[Yy]$ ]]; then
    source "${KIT_DIR}/run_crop.sh"   # debe escribir en $CROPPED
    echo "🧩 Recorte aplicado → $CROPPED"
    WORK_INPUT="$CROPPED"
  else
    echo "ℹ️  Sin recorte; se comprimirá desde $INPUT"
    WORK_INPUT="$INPUT"
  fi
  export WORK_INPUT

  # ── Preparar cadena de filtros para video (FPS + Denoise)
  FILTERS=""
  if [ -n "${FPS_FILTER:-}" ] && [ -n "${DENOISE_FILTER:-}" ]; then
    FILTERS="${DENOISE_FILTER},${FPS_FILTER}"
  elif [ -n "${FPS_FILTER:-}" ]; then
    FILTERS="${FPS_FILTER}"
  elif [ -n "${DENOISE_FILTER:-}" ]; then
    FILTERS="${DENOISE_FILTER}"
  fi
  export FILTERS

  # ── Codificación (CRF o 2-pass)
  case "$MODE" in
    2)
      echo "→ Codificando (2-pass, objetivo ${TARGET_MB} MB)…"
      source "${KIT_DIR}/run_encode_2pass.sh"   # escribe $FINAL
      ;;
    1|*)
      echo "→ Codificando (CRF iterativo desde ${CRF_START:-32}, salto=1, objetivo ≤ ${TARGET_MB} MB)…"
      source "${KIT_DIR}/run_encode_crf.sh"     # escribe $FINAL (o mejor intento)
      ;;
  esac

  # Verificar que exista el MP4 final antes del GIF
  if [ ! -f "$FINAL" ]; then
    echo "⛔ No se generó $FINAL; salto la creación del GIF para este archivo."
    continue
  fi

  # ── GIF (opcional)
  if [[ "$WANT_GIF" =~ ^[Yy]$ ]]; then
    # Defaults seguros por si no vienen del prompt
    : "${GIF_FPS:=8}"
    : "${GIF_MAX_COLORS:=128}"
    : "${GIF_BAYER_SCALE:=3}"
    export GIF_FPS GIF_MAX_COLORS GIF_BAYER_SCALE GIF_LOSSY
    source "${KIT_DIR}/run_gif.sh"
  fi

  # ── Reporte por archivo
  read OUT_W OUT_H < <(dims "$FINAL")
  FINAL_BYTES=$(stat -c%s "$FINAL")
  echo "✅ Terminado: $BASENAME"
  echo "   MP4:  $FINAL  ($(printf '%.0f' "$((FINAL_BYTES/1024))") KB)  ${OUT_W}x${OUT_H}"
  if [[ "$WANT_CROP" =~ ^[Yy]$ ]]; then
    [ -f "$CROPPED" ] && echo "   Crop: $CROPPED"
  fi
  if [[ "$WANT_GIF" =~ ^[Yy]$ ]]; then
    [ -f "$GIF_OUT" ] && echo "   GIF:  $GIF_OUT"
  fi
done

echo ""
echo "🎉 Lote completado. Salidas en: $OUTPUT_DIR"
