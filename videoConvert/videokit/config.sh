# Carpeta de salida
OUTPUT_DIR="./ready"

# Rutas a binarios (usa tus locales; ffprobe cae al del sistema si no existe)
FFMPEG="./ffmpeg/ffmpeg"
FFPROBE="./ffmpeg/ffprobe"
[ -x "$FFPROBE" ] || FFPROBE="ffprobe"

# Archivos
INPUT="video.mp4"
CROPPED="${OUTPUT_DIR}/cropped.mp4"
FINAL="${OUTPUT_DIR}/reduced.mp4"
GIF_OUT="${OUTPUT_DIR}/video.gif"
PASS_LOG="${OUTPUT_DIR}/ffmpeg2pass"   # logs de 2-pass

# H.264 (compatibilidad web)
PROFILE="high"
LEVEL="4.0"       # 1080p@30; si usas 60 fps considera 4.2
PIXFMT="yuv420p"

# CRF (modo iterativo)
CRF_START=24
CRF_STEP=1
CRF_MAX=32
