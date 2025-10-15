set -u

echo "🎨 Generando GIF (FPS=${GIF_FPS}, paleta=${GIF_MAX_COLORS} colores, mismo tamaño que el MP4, quitando frames casi repetidos)…"

# 1) Validaciones
[ -f "$FINAL" ] || die "No existe archivo de entrada para GIF: $FINAL"
[ -s "$FINAL" ] || die "El archivo $FINAL está vacío."
mkdir -p "$OUTPUT_DIR" || die "No pude crear $OUTPUT_DIR"

# 2) Normaliza extensión y evita sobrescritura
case "$GIF_OUT" in
  *.gif) : ;;
  *) GIF_OUT="${GIF_OUT}.gif" ;;
esac
GIF_DIR="$(dirname -- "$GIF_OUT")"
GIF_BN="$(basename -- "$GIF_OUT" .gif)"
CAND="$GIF_DIR/$GIF_BN.gif"
if [ -e "$CAND" ]; then
  i=1
  while : ; do
    CAND="$GIF_DIR/${GIF_BN}_$i.gif"
    [ -e "$CAND" ] || break
    i=$((i+1))
  done
fi
GIF_OUT="$CAND"
echo "📝 Archivo de salida: $GIF_OUT"

LOG_GIF="${OUTPUT_DIR}/gif_build.log"
: > "$LOG_GIF"

# 3) Parámetros de compresión
# bayer_scale por defecto 3; limita al rango soportado (0–5 en muchas builds)
BAYER_SCALE_RAW="${GIF_BAYER_SCALE:-3}"
BAYER_SCALE="$(awk -v v="$BAYER_SCALE_RAW" 'BEGIN{if(v<0)v=0; if(v>5)v=5; printf "%d", v}')"

# Asegurar valores sanos de paleta
if [ -z "${GIF_MAX_COLORS:-}" ]; then GIF_MAX_COLORS=128; fi
if [ "$GIF_MAX_COLORS" -lt 2 ]; then GIF_MAX_COLORS=2; fi
if [ "$GIF_MAX_COLORS" -gt 256 ]; then GIF_MAX_COLORS=256; fi

# 4) mpdecimate: eliminar cuadros duplicados y "casi" duplicados
#    Niveles (más "abierto" = elimina MÁS frames):
#      normal     = hi=768  : lo=320  : frac=0.33
#      aggressive = hi=1024 : lo=480  : frac=0.50
#      very       = hi=1536 : lo=640  : frac=0.66
#      ultra      = hi=2048 : lo=1024 : frac=0.80   (DEFAULT)
#      extreme    = hi=3072 : lo=1536 : frac=0.90   (máxima reducción; puede notarse “saltón”)
LEVEL="${GIF_DECIMATE:-ultra}"
case "$LEVEL" in
  normal)     DECIM="mpdecimate=hi=768:lo=320:frac=0.33" ;;
  aggressive) DECIM="mpdecimate=hi=1024:lo=480:frac=0.50" ;;
  very)       DECIM="mpdecimate=hi=1536:lo=640:frac=0.66" ;;
  extreme)    DECIM="mpdecimate=hi=3072:lo=1536:frac=0.90" ;;
  ultra|*)    DECIM="mpdecimate=hi=2048:lo=1024:frac=0.80" ;;
esac
echo "🧹 mpdecimate nivel: $LEVEL ($DECIM)"

# 5) Filtros en una pasada (sin PNG intermedio)
FC="[0:v]${DECIM},setpts=N/FRAME_RATE/TB,fps=${GIF_FPS},split[a][b];\
[a]palettegen=stats_mode=single:max_colors=${GIF_MAX_COLORS}:reserve_transparent=0[p];\
[b][p]paletteuse=dither=bayer:bayer_scale=${BAYER_SCALE}:diff_mode=rectangle:alpha_threshold=0"

echo "🔧 FFmpeg… (fps=${GIF_FPS}, colors=${GIF_MAX_COLORS}, bayer_scale=${BAYER_SCALE})"
if "$FFMPEG" -hide_banner -y -v error -i "$FINAL" \
  -filter_complex "$FC" \
  -an -loop 0 -f gif -c:v gif "$GIF_OUT" 2>>"$LOG_GIF"
then
  echo "✅ GIF creado: $GIF_OUT"
else
  echo "⛔ Falló la creación del GIF. Revisa el log: $LOG_GIF"
  echo "Pistas:"
  echo "  - Ver filtros: $FFMPEG -hide_banner -filters | grep -E 'palette(gen|use)|mpdecimate'"
  echo "  - Baja FPS (en prompts) o paleta (128/96/64)."
  echo "  - Ver versión: $FFMPEG -hide_banner -version"
  exit 1
fi

# 6) Optimización con gifsicle (-O3) automática (lossless)
if command -v gifsicle >/dev/null 2>&1; then
  echo "🧪 gifsicle encontrado: optimizando (-O3)…"
  if gifsicle -O3 -o "${GIF_OUT}.tmp" "$GIF_OUT" 2>>"$LOG_GIF"; then
    mv -f "${GIF_OUT}.tmp" "$GIF_OUT"
    echo "✅ GIF optimizado con gifsicle: $GIF_OUT"
  else
    echo "⚠️  gifsicle falló; conservo el GIF sin optimizar extra."
    rm -f "${GIF_OUT}.tmp" 2>/dev/null || true
  fi

  # 6b) Compresión adicional con pérdida suave (opcional)
  if [ -n "${GIF_LOSSY:-}" ] && gifsicle --help 2>/dev/null | grep -q -- '--lossy'; then
    echo "🧪 gifsicle lossy: --lossy=${GIF_LOSSY} (compresión adicional)…"
    if gifsicle -O3 --lossy="${GIF_LOSSY}" -o "${GIF_OUT}.tmp" "$GIF_OUT" 2>>"$LOG_GIF"; then
      mv -f "${GIF_OUT}.tmp" "$GIF_OUT"
      echo "✅ GIF comprimido con pérdida suave (--lossy=${GIF_LOSSY})."
    else
      echo "⚠️  gifsicle --lossy falló; conservo el GIF anterior."
      rm -f "${GIF_OUT}.tmp" 2>/dev/null || true
    fi
  fi
else
  echo "ℹ️  gifsicle no está instalado; saltando optimización extra."
fi
