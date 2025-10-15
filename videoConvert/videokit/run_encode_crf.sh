set -u

# Detectar si es sourceado
if (return 0 2>/dev/null); then
  __SOURCED=1
else
  __SOURCED=0
fi

finish_ok()  { return 0; }
finish_err() { return 1; }

main() {
  SRC_ORIG="${WORK_INPUT:?WORK_INPUT no definido}"
  [ -f "$SRC_ORIG" ] || { echo "No existe fuente: $SRC_ORIG"; return 1; }

  mkdir -p "$OUTPUT_DIR" || { echo "No pude crear $OUTPUT_DIR"; return 1; }

  # Objetivo en bytes
  bytes_target=$(awk -v mb="${TARGET_MB:?TARGET_MB no definido}" 'BEGIN{printf "%.0f", mb*1024*1024}')

  BEST_TMP=""
  BEST_SIZE=0

  try_crf () {
    local crf="$1"
    local tmp="${OUTPUT_DIR}/tmp_crf_${crf}.mp4"
    local vf=""
    [ -n "${FILTERS:-}" ] && vf="-vf ${FILTERS}"

    echo "➡  Probando CRF=${crf} …"
    "$FFMPEG" -y -v error -i "$SRC_ORIG" \
      ${vf:+$vf} \
      -an -c:v libx264 -preset "$PRESET" -profile:v "$PROFILE" -level "$LEVEL" -pix_fmt "$PIXFMT" \
      -crf "$crf" -movflags +faststart "$tmp" || return 2

    local sz; sz=$(stat -c%s "$tmp")
    local kb=$(( (sz + 1023) / 1024 ))
    echo "   Tamaño actual: ${kb} KB"

    if [ "$sz" -le "$bytes_target" ]; then
      mv -f "$tmp" "$FINAL"
      echo "✅ Alcanzado ≤ ${TARGET_MB} MB con CRF=${crf}"
      echo "   → Archivo final: $FINAL (${kb} KB)"
      # éxito
      return 0
    else
      # Mantener SOLO el último intento (CRF más alto)
      [ -n "$BEST_TMP" ] && rm -f "$BEST_TMP" 2>/dev/null || true
      BEST_TMP="$tmp"
      BEST_SIZE="$sz"
      return 1
    fi
  }

  MAX_CRF=51
  crf="${CRF_START:-32}"
  if [ "$crf" -gt "$MAX_CRF" ]; then
    echo "ℹ️  CRF inicial (${crf}) > ${MAX_CRF}; se usará ${MAX_CRF}."
    crf="$MAX_CRF"
  fi

  achieved=0
  while [ "$crf" -le "$MAX_CRF" ]; do
    if try_crf "$crf"; then
      achieved=1
      break
    fi
    crf=$((crf + 1))
  done

  if [ "$achieved" -eq 1 ]; then
    return 0
  fi

  # Si no se alcanzó el objetivo ni con 51 → usar el mejor intento
  if [ -n "$BEST_TMP" ] && [ -f "$BEST_TMP" ]; then
    mv -f "$BEST_TMP" "$FINAL"
    kb=$(( (BEST_SIZE + 1023) / 1024 ))
    echo "❌ No se alcanzó el tamaño objetivo ni con CRF=${MAX_CRF}."
    echo "ℹ️  Continúo con el mejor intento disponible → $FINAL (${kb} KB)."
    echo "    (CRF no puede subir más; si necesitas clavar tamaño exacto, usa 2-pass.)"
    return 0
  else
    echo "❌ No se generó ningún intento válido."
    return 1
  fi
}

# Ejecutar main y salir/retornar acorde
if main; then
  if [ "$__SOURCED" -eq 1 ]; then return 0; else exit 0; fi
else
  if [ "$__SOURCED" -eq 1 ]; then return 1; else exit 1; fi
fi
