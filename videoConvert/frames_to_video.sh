#!/usr/bin/env bash
set -euo pipefail

# =============== Config rápida ===============
FRAME_ROOT="frame"     # raíz donde están las carpetas de frames
OUT_DIR="video"        # salida de videos
FPS=12                 # fps del video final
CRF=18                 # si hay libx264 (18-23 típico). Ignorado con mpeg4
SCALE=""               # ej: 1080x1920 (vacío = tamaño de frames)
# =============================================

# Usa primero ./ffmpeg/ffmpeg si existe; si no, el del sistema.
FFMPEG="${FFMPEG:-}"
if [ -z "$FFMPEG" ]; then
  if [ -x "./ffmpeg/ffmpeg" ]; then
    FFMPEG="./ffmpeg/ffmpeg"
  else
    FFMPEG="$(command -v ffmpeg || true)"
  fi
fi
[ -n "$FFMPEG" ] || { echo "No encontré ffmpeg (ni ./ffmpeg/ffmpeg ni en PATH)"; exit 1; }

mkdir -p "$OUT_DIR"

# Listar subcarpetas candidatas
mapfile -t CANDIDATES < <(find "$FRAME_ROOT" -mindepth 1 -maxdepth 1 -type d | sort)
if [ ${#CANDIDATES[@]} -eq 0 ]; then
  echo "No encontré subcarpetas dentro de '$FRAME_ROOT'."
  exit 1
fi

echo "📂 Carpetas de frames:"
for i in "${!CANDIDATES[@]}"; do
  echo "  [$i] ${CANDIDATES[$i]##*/}"
done
echo
read -rp "Selecciona el índice (0..$(( ${#CANDIDATES[@]} - 1 ))): " idx
[[ "$idx" =~ ^[0-9]+$ ]] || { echo "Índice inválido."; exit 1; }
(( idx >= 0 && idx < ${#CANDIDATES[@]} )) || { echo "Fuera de rango."; exit 1; }

DIR="${CANDIDATES[$idx]}"
NAME="${DIR##*/}"
OUT_MP4="$OUT_DIR/${NAME}.mp4"

# Detectar extensión de frames
shopt -s nullglob
PNGS=( "$DIR"/*.png )
JPGS=( "$DIR"/*.jpg "$DIR"/*.jpeg )
shopt -u nullglob

if [ ${#PNGS[@]} -eq 0 ] && [ ${#JPGS[@]} -eq 0 ]; then
  echo "No hay .png ni .jpg en '$DIR'."
  exit 1
fi

if [ ${#PNGS[@]} -gt 0 ]; then
  EXT="png"
  GLOB="$DIR/*.png"
else
  EXT="jpg"
  # Preferir *.jpg si existe; si no, *.jpeg
  if ls "$DIR"/*.jpg >/dev/null 2>&1; then
    GLOB="$DIR/*.jpg"
  else
    GLOB="$DIR/*.jpeg"
  fi
fi

# Elegir encoder disponible en ESTE ffmpeg
pick_encoder() {
  if "$FFMPEG" -hide_banner -encoders 2>/dev/null | grep -q '\blibx264\b'; then
    echo "libx264"
  else
    echo "mpeg4"
  fi
}
ENCODER="$(pick_encoder)"

# Armar opciones de salida
OUT_ARGS=()
[ -n "$SCALE" ] && OUT_ARGS+=( -vf "scale=${SCALE}" )

if [ "$ENCODER" = "libx264" ]; then
  OUT_ARGS+=( -c:v libx264 -crf "$CRF" -pix_fmt yuv420p -movflags +faststart )
else
  # Fallback universal (sin dependencias dinámicas): MPEG-4 ASP
  OUT_ARGS+=( -c:v mpeg4 -q:v 2 -pix_fmt yuv420p )
fi

echo "🔎 FFmpeg: $FFMPEG"
echo "   • Carpeta:   $DIR"
echo "   • Extensión: .$EXT"
echo "   • Encoder:   $ENCODER"
echo "   • Salida:    $OUT_MP4"

# Usar patrón glob SIEMPRE (evita problemas con ceros a la izquierda)
"$FFMPEG" -hide_banner -loglevel error -y \
  -framerate "$FPS" \
  -pattern_type glob -i "$GLOB" \
  "${OUT_ARGS[@]}" \
  "$OUT_MP4"

echo "✅ Video creado: $OUT_MP4"
echo "   (Nota: MP4 no soporta alpha. Para transparencia usa WebM VP9:"
echo "          -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0)"
