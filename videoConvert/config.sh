# Rutas a binarios (usa tus locales; ffprobe cae al del sistema si no existe)
FFMPEG="./ffmpeg/ffmpeg"
FFPROBE="./ffmpeg/ffprobe"
[ -x "$FFPROBE" ] || FFPROBE="ffprobe"

# Archivos
INPUT="video.mp4"
CROPPED="cropped.mp4"
FINAL="reduced.mp4"
GIF_OUT="video.gif"

# H.264 (compatibilidad web)
PROFILE="high"
LEVEL="4.0"       # 1080p@30; si usas 60 fps considera 4.2
PIXFMT="yuv420p"

# CRF (modo iterativo)
CRF_START=24
CRF_STEP=1
CRF_MAX=32
