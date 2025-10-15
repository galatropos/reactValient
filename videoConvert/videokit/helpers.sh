die(){ echo "❌ $*" >&2; exit 1; }
kb(){ echo $(( $1 / 1024 )); }

dims(){ # imprime "W H"
  "$FFPROBE" -v error -select_streams v:0 -show_entries stream=width,height \
    -of csv=p=0 "$1" | tr ',' ' '
}

duration_sec(){ # imprime segundos (float)
  "$FFPROBE" -v error -show_entries format=duration -of default=nw=1:nk=1 "$1"
}

build_cover_filter(){ # cover + crop centrado según orientación
  local w="$1" h="$2"
  if [ "$w" -ge "$h" ]; then
    echo "scale='if(gte(a,16/9),-2,1920)':'if(gte(a,16/9),1080,-2)',crop=1920:1080"
  else
    echo "scale='if(gte(a,9/16),-2,1080)':'if(gte(a,9/16),1920,-2)',crop=1080:1920"
  fi
}

compose_vf(){ # compone cadena -vf a partir de variables DENOISE_FILTER y FPS_FILTER
  local chain=""
  if [[ -n "${DENOISE_FILTER:-}" && -n "${FPS_FILTER:-}" ]]; then
    chain="${DENOISE_FILTER},${FPS_FILTER}"
  elif [[ -n "${DENOISE_FILTER:-}" ]]; then
    chain="${DENOISE_FILTER}"
  elif [[ -n "${FPS_FILTER:-}" ]]; then
    chain="${FPS_FILTER}"
  fi
  echo "$chain"
}
