// components/RandomImgEverySecond.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import img1 from "../../../assets/image/image3/1-front.webp";
import img2 from "../../../assets/image/image3/2-front.webp";
import img3 from "../../../assets/image/image3/3-front.webp";
import img4 from "../../../assets/image/image3/4-front.webp";
import img5 from "../../../assets/image/image3/5-front.webp";
import img6 from "../../../assets/image/image3/6-front.webp";
import img7 from "../../../assets/image/image3/7-front.webp";
import img8 from "../../../assets/image/image3/8-front.webp";
import img9 from "../../../assets/image/image3/9-front.webp";
import img10 from "../../../assets/image/image3/10-front.webp";
import img11 from "../../../assets/image/image3/11-front.webp";

const WRAPPER_STYLE = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  willChange: "opacity",          // sin transform hints
  contain: "paint",               // aisla el pintado
};

const LAYER_BASE = {
  position: "absolute",
  inset: 0,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",      // mantiene proporción sin “zoom”
  // Nada de transform ni translateZ para evitar re-muestreos
  backfaceVisibility: "hidden",
};

const randOther = (len, prev) => {
  if (len <= 1) return 0;
  let r = prev;
  while (r === prev) r = Math.floor(Math.random() * len);
  return r;
};

// Caché de decodificación
const decodedCache = new Map();
function preloadAndDecode(src) {
  if (decodedCache.has(src)) return decodedCache.get(src);
  const im = new Image();
  im.src = src;
  const p = (im.decode ? im.decode() : Promise.resolve()).catch(() => {});
  decodedCache.set(src, p);
  return p;
}

const RandomImgEverySecond = ({
  intervalMs = 1000,
  startAfterMs = 0,
  fadeMs = 120,         // prueba 0 si quieres cambio instantáneo
  style,
  // opcional: bloquear proporción del frame para que todo mida EXACTO
  aspectRatio,          // ej: 1, 16/9, 9/16; si no lo pasas, usa el alto del contenedor padre
}) => {
  const imgs = useMemo(
    () => [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11],
    []
  );

  const [frontIsA, setFrontIsA] = useState(true);
  const [idxA, setIdxA] = useState(() => Math.floor(Math.random() * imgs.length));
  const [idxB, setIdxB] = useState(() => randOther(imgs.length, idxA));
  const idxRef = useRef(frontIsA ? idxA : idxB);
  const runningRef = useRef(false);

  // Precarga
  useEffect(() => {
    imgs.forEach((src) => { const im = new Image(); im.src = src; });
  }, [imgs]);

  useEffect(() => {
    let intervalId = null;
    let timeoutId = null;
    runningRef.current = true;

    const tick = async () => {
      const current = idxRef.current;
      const next = randOther(imgs.length, current);
      await preloadAndDecode(imgs[next]);

      if (frontIsA) setIdxB(next);
      else setIdxA(next);

      requestAnimationFrame(() => {
        if (!runningRef.current) return;
        setFrontIsA((v) => !v);
        idxRef.current = next;
      });
    };

    const start = () => {
      if (intervalId) return;
      intervalId = setInterval(tick, Math.max(80, intervalMs));
    };

    timeoutId = setTimeout(start, Math.max(0, startAfterMs));

    return () => {
      runningRef.current = false;
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [imgs, intervalMs, startAfterMs, frontIsA]);

  const layerAStyle = {
    ...LAYER_BASE,
    backgroundImage: `url(${imgs[idxA]})`,
    opacity: frontIsA ? 1 : 0,
    transition: fadeMs ? `opacity ${fadeMs}ms linear` : "none",
  };
  const layerBStyle = {
    ...LAYER_BASE,
    backgroundImage: `url(${imgs[idxB]})`,
    opacity: frontIsA ? 0 : 1,
    transition: fadeMs ? `opacity ${fadeMs}ms linear` : "none",
  };

  // Si pasas aspectRatio, el wrapper bloquea el marco y evita cualquier ajuste visual
  const wrapperStyle = aspectRatio
    ? { ...WRAPPER_STYLE, ...style, aspectRatio }
    : { ...WRAPPER_STYLE, ...style };

  return (
    <div style={wrapperStyle}>
      <div style={layerAStyle} />
      <div style={layerBStyle} />
    </div>
  );
};

export default RandomImgEverySecond;
