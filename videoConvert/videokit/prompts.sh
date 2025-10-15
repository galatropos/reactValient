# Carga dimensiones/duración para mostrar en el resumen
read IN_W IN_H < <(dims "$INPUT")
DUR="$(duration_sec "$INPUT")"
[ -n "$IN_W" ] || die "No pude leer dimensiones de $INPUT"
[ -n "$DUR" ]  || die "No pude leer duración de $INPUT"

# 1) Recorte → DEFAULT = Sí
read -r -p "¿Recortar primero (cover+crop a 1920x1080/1080x1920)? [Y/n] " WANT_CROP_IN
WANT_CROP="${WANT_CROP_IN:-Y}"

# 2) Método (si CRF, pedimos CRF inicial aquí mismo)
echo "Método de compresión:"
echo "  1) CRF iterativo (aprox. tamaño)"
echo "  2) 2-pass con bitrate calculado (tamaño preciso)"
read -r -p "Elige 1 o 2 [1]: " MODE
MODE="${MODE:-1}"

# 2.1) Parámetros CRF SOLO si se eligió modo 1 (salto fijo=1; no se pregunta)
if [[ "$MODE" == "1" ]]; then
  while true; do
    read -r -p "CRF inicial (más alto = más compresión) [32]: " CRF_START_IN
    CRF_START="${CRF_START_IN:-32}"
    [[ "$CRF_START" =~ ^[0-9]+$ ]] && [ "$CRF_START" -ge 0 ] && [ "$CRF_START" -le 51 ] && break || echo "Ingresa un entero (0–51)."
  done
  export CRF_START
fi

# 3) Target MB (por defecto 2.4 MB)
while true; do
  read -r -p "¿Tamaño objetivo en MB? (ej. 2.4) [2.4]: " TARGET_MB_IN
  TARGET_MB="${TARGET_MB_IN:-2.4}"
  [[ "$TARGET_MB" =~ ^[0-9]+([.][0-9]+)?$ ]] && break || echo "Ingresa un número válido (usa punto decimal)."
done

# 4) Preset menú
echo "Preset x264:"
echo "  1) slow      (recomendado)"
echo "  2) veryslow  (máxima compresión, más lento)"
read -r -p "Elige 1 o 2 [1]: " PRESET_OPT
PRESET_OPT="${PRESET_OPT:-1}"
case "$PRESET_OPT" in
  1) PRESET="slow" ;;
  2) PRESET="veryslow" ;;
  *) echo "Opción inválida, usando 'slow'."; PRESET="slow" ;;
esac

# 5) FPS cap opcional (MP4) → por defecto 30
read -r -p "¿Limitar FPS del MP4? (ej. 30; vacío = 30) [30]: " FPS_CAP_IN
FPS_CAP="${FPS_CAP_IN:-30}"
FPS_FILTER=""
[[ -n "${FPS_CAP:-}" ]] && FPS_FILTER="fps=${FPS_CAP}"

# 6) Denoise+Deband (MP4) → por defecto Sí
read -r -p "¿Aplicar denoise+deband suave al MP4? [Y/n] " WANT_DENOISE_IN
WANT_DENOISE="${WANT_DENOISE_IN:-Y}"
DENOISE_FILTER=""
[[ "$WANT_DENOISE" =~ ^[Yy]$ ]] && DENOISE_FILTER="atadenoise=0a=0.02:0b=0.02:1a=0.02:1b=0.02,gradfun=20"

# 7) GIF (por defecto: Sí; mismo tamaño que el MP4)
read -r -p "¿También generar GIF (mismo tamaño que el MP4 final)? [Y/n] " WANT_GIF_IN
WANT_GIF="${WANT_GIF_IN:-Y}"

GIF_FPS=8
GIF_MAX_COLORS=128
GIF_LOSSY=""   # vacío = solo -O3; si se define, run_gif intentará --lossy
if [[ "$WANT_GIF" =~ ^[Yy]$ ]]; then
  read -r -p "FPS para GIF (10–15 recomendado; 8 = más ligero) [8]: " IN_GIF_FPS
  GIF_FPS="${IN_GIF_FPS:-8}"
  # Paleta (2–256); default 128
  while true; do
    read -r -p "Colores de la paleta para el GIF (2–256) [128]: " IN_GIF_COLS
    IN_GIF_COLS="${IN_GIF_COLS:-128}"
    if [[ "$IN_GIF_COLS" =~ ^[0-9]+$ ]]; then
      if [ "$IN_GIF_COLS" -lt 2 ];   then IN_GIF_COLS=2;   fi
      if [ "$IN_GIF_COLS" -gt 256 ]; then IN_GIF_COLS=256; fi
      GIF_MAX_COLORS="$IN_GIF_COLS"
      break
    else
      echo "Ingresa un número entero entre 2 y 256."
    fi
  done

  # Compresión adicional con pérdida suave (gifsicle --lossy), default = Sí (20)
  read -r -p "¿Aplicar compresión adicional con pérdida suave en GIF (gifsicle --lossy)? [Y/n] " WANT_LOSSY_IN
  WANT_LOSSY="${WANT_LOSSY_IN:-Y}"
  if [[ "$WANT_LOSSY" =~ ^[Yy]$ ]]; then
    read -r -p "Nivel --lossy (10–25 recomendado) [20]: " GIF_LOSSY_IN
    GIF_LOSSY="${GIF_LOSSY_IN:-20}"
  fi
fi

# Resumen
printf "\n== Resumen ==\n"
echo "Entrada:     $INPUT (${IN_W}x${IN_H}, duración ≈ ${DUR}s)"
echo "Recorte:     $([[ "$WANT_CROP" =~ ^[Yy]$ ]] && echo "Sí -> ${CROPPED}" || echo 'No')"
if [[ "$MODE" == "2" ]]; then
  echo "Método:      2-pass (tamaño preciso)"
else
  echo "Método:      CRF iterativo (aprox) — inicio=${CRF_START}, salto fijo=1"
fi
echo "Objetivo:    ${TARGET_MB} MB"
echo "Preset:      ${PRESET}"
echo "FPS MP4:     ${FPS_CAP:-(sin cambio)}"
echo "Denoise MP4: $([[ "$WANT_DENOISE" =~ ^[Yy]$ ]] && echo 'Sí' || echo 'No')"
if [[ "$WANT_GIF" =~ ^[Yy]$ ]]; then
  echo "Generar GIF: Sí (FPS=${GIF_FPS}, paleta=${GIF_MAX_COLORS} colores, MISMO tamaño que MP4)"
  if [[ -n "${GIF_LOSSY:-}" ]]; then
    echo "GIF lossy:   Sí (gifsicle --lossy=${GIF_LOSSY} + -O3)"
  else
    echo "GIF lossy:   No (solo gifsicle -O3 lossless)"
  fi
else
  echo "Generar GIF: No"
fi

# Confirmación (default = Sí)
read -r -p "¿Confirmar y ejecutar? [Y/n] " OK
OK="${OK:-Y}"
[[ "$OK" =~ ^[Yy]$ ]] || { echo "Cancelado."; exit 0; }

# Exportar variables que usan los otros scripts
export WANT_CROP MODE TARGET_MB PRESET FPS_FILTER DENOISE_FILTER GIF_FPS GIF_MAX_COLORS GIF_LOSSY
# (Si es CRF, ya exportamos CRF_START arriba)
