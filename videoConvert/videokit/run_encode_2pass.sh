set -u

# Espera: INPUT, (opcional) CROPPED, (opcional) WORK_INPUT
# También: OUTPUT_DIR, FINAL, FFPROBE, FFMPEG, TARGET_MB, PRESET, PROFILE, LEVEL, PIXFMT, FILTERS

# --- Selección robusta de fuente ---
SRC="${WORK_INPUT:-}"
if [ -z "$SRC" ]; then
  if [ -n "${CROPPED:-}" ] && [ -f "${CROPPED}" ]; then
    SRC="${CROPPED}"
  else
    SRC="${INPUT}"
  fi
fi
[ -f "$SRC" ] || { echo "No existe archivo fuente para 2-pass: $SRC"; exit 1; }

mkdir -p "$OUTPUT_DIR" || { echo "No pude crear $OUTPUT_DIR"; exit 1; }
PASSLOG="${OUTPUT_DIR}/x264_2pass"

# Duración (segundos)
DUR="$("$FFPROBE" -v error -select_streams v:0 -show_entries format=duration -of default=nw=1:nk=1 "$SRC")"
[ -n "$DUR" ] || { echo "No pude leer duración del video"; exit 1; }

# Bitrate objetivo (Kbps) para clavar TARGET_MB
# bytes = MB*1024*1024 ; bits = bytes*8 ; kbps ≈ (bits/1000)/dur ; restamos ~1.5% contenedor
BYTES=$(awk -v mb="$TARGET_MB" 'BEGIN{printf "%.0f", mb*1024*1024}')
BITS=$((BYTES*8))
KBIT_PER_S=$(awk -v bits="$BITS" -v dur="$DUR" 'BEGIN{printf "%.0f", (bits/1000.0)/dur}')
KBIT_PER_S=$(( KBIT_PER_S - (KBIT_PER_S*15/1000) ))
[ "$KBIT_PER_S" -lt 10 ] && KBIT_PER_S=10

echo "→ 2-pass H.264: ~${KBIT_PER_S} kbps (target ${TARGET_MB} MB; dur≈${DUR}s)"

VF_CHAIN=""
[ -n "${FILTERS:-}" ] && VF_CHAIN="-vf ${FILTERS}"

# PASS 1
"$FFMPEG" -y -v error -i "$SRC" \
  ${VF_CHAIN:+$VF_CHAIN} \
  -an -c:v libx264 -preset "$PRESET" -profile:v "$PROFILE" -level "$LEVEL" -pix_fmt "$PIXFMT" \
  -b:v "${KBIT_PER_S}k" -maxrate "${KBIT_PER_S}k" -bufsize "$((KBIT_PER_S*2))k" \
  -pass 1 -passlogfile "$PASSLOG" -f mp4 /dev/null || { echo "Falló pass 1"; exit 1; }

# PASS 2
"$FFMPEG" -y -v error -i "$SRC" \
  ${VF_CHAIN:+$VF_CHAIN} \
  -an -c:v libx264 -preset "$PRESET" -profile:v "$PROFILE" -level "$LEVEL" -pix_fmt "$PIXFMT" \
  -b:v "${KBIT_PER_S}k" -maxrate "${KBIT_PER_S}k" -bufsize "$((KBIT_PER_S*2))k" \
  -movflags +faststart -pass 2 -passlogfile "$PASSLOG" "$FINAL" || { echo "Falló pass 2"; exit 1; }

rm -f "${PASSLOG}"*.log 2>/dev/null || true
