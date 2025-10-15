#!/usr/bin/env bash
set -euo pipefail

# ================== Config ==================
ORIGIN_DIR="video_origin"   # carpeta de entrada de videos
OUT_BASE="frame"            # carpeta base para frames
EXT="png"                   # "png" (sin pérdida) o "jpg" (con pérdida)
JPG_QUALITY=2               # 1–31 (solo si EXT=jpg; menor = mejor)
PATTERN="%06d"              # ceros a la izquierda para nombres
# ============================================

# Usar ./ffmpeg/ffmpeg si existe; si no, el del sistema
FFMPEG_BIN="${FFMPEG:-}"
if [ -z "$FFMPEG_BIN" ]; then
  if [ -x "./ffmpeg/ffmpeg" ]; then FFMPEG_BIN="./ffmpeg/ffmpeg"; else FFMPEG_BIN="$(command -v ffmpeg || true)"; fi
fi
[ -n "$FFMPEG_BIN" ] || { echo "ffmpeg no encontrado (ni ./ffmpeg/ffmpeg ni en PATH)"; exit 1; }

mkdir -p "$OUT_BASE"

shopt -s nullglob
videos=( "$ORIGIN_DIR"/*.{mp4,MP4,m4v,M4V,mov,MOV,webm,WEBM,mkv,MKV,avi,AVI} )
shopt -u nullglob

if [ ${#videos[@]} -eq 0 ]; then
  echo "No encontré videos en '$ORIGIN_DIR'. Coloca tus archivos ahí y vuelve a ejecutar."
  exit 1
fi

echo "📂 Encontré ${#videos[@]} archivo(s) en '$ORIGIN_DIR':"
for i in "${!videos[@]}"; do
  printf "  [%d] %s\n" "$i" "$(basename "${videos[$i]}")"
done
echo

read -rp "Selecciona el índice del video (0..$(( ${#videos[@]} - 1 ))): " choice
[[ "$choice" =~ ^[0-9]+$ ]] || { echo "Entrada inválida."; exit 1; }
(( choice >= 0 && choice < ${#videos[@]} )) || { echo "Índice fuera de rango."; exit 1; }

invid="${videos[$choice]}"
bn="$(basename "$invid")"
base="${bn%.*}"

# Crear la carpeta de salida con el nombre del archivo (sin extensión)
outdir="${OUT_BASE}/${base}"
mkdir -p "$outdir"

echo "→ Procesando: $bn"
echo "   ▸ carpeta de frames: ${outdir}"

# Elegir códec de imagen
if [ "$EXT" = "png" ]; then
  vcodec="png"            # sin pérdida
  pixfmt=()               # preserva alpha si existe
  extra=()
else
  vcodec="mjpeg"          # JPG (con pérdida)
  pixfmt=(-pix_fmt yuvj420p)
  extra=(-q:v "$JPG_QUALITY")
fi

outpat="${outdir}/${PATTERN}.${EXT}"

# Extraer frames originales:
# - SIN -vf ni -r → no re-muestrea ni escala
# - -vsync 0 → respeta todos los frames del stream, sin duplicar/omitir
# - -map 0:v:0 → primer stream de video
"$FFMPEG_BIN" -hide_banner -loglevel error \
  -i "$invid" \
  -map 0:v:0 \
  -vsync 0 \
  -c:v "$vcodec" "${pixfmt[@]}" "${extra[@]}" \
  "$outpat"

echo "✅ Listo. Frames en: $outdir"
