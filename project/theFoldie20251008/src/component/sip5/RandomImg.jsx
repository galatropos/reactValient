// components/RandomImgEverySecond.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import img1 from "../../../assets/image/1-front.webp";
import img2 from "../../../assets/image/2-front.webp";
import img3 from "../../../assets/image/3-front.webp";
import img4 from "../../../assets/image/4-front.webp";
import img5 from "../../../assets/image/5-front.webp";
import img6 from "../../../assets/image/6-front.webp";
import img7 from "../../../assets/image/7-front.webp";
import img8 from "../../../assets/image/8-front.webp";
import img9 from "../../../assets/image/9-front.webp";
import img10 from "../../../assets/image/10-front.webp";
import img11 from "../../../assets/image/11-front.webp";

const styleImage = {
  boxSizing: "border-box",
  display: "block",
  height: "100%",
  maxHeight: "100%",
  width: "auto",
  objectFit: "contain",
};

const randOther = (len, prev) => {
  if (len <= 1) return 0;
  let r = prev;
  while (r === prev) r = Math.floor(Math.random() * len);
  return r;
};

const RandomImgEverySecond = ({
  intervalMs = 1000,   // cada cuánto cambia
  startAfterMs = 0,    // cuánto esperar antes de empezar a “play”
}) => {
  const imgs = useMemo(() => [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11], []);
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * imgs.length));
  const idxRef = useRef(idx);

  // Pre-carga (evita parpadeo)
  useEffect(() => {
    imgs.forEach((src) => { const im = new Image(); im.src = src; });
  }, [imgs]);

  // Inicio con retardo y reproducción
  useEffect(() => {
    let intervalId = null;
    const start = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        const next = randOther(imgs.length, idxRef.current);
        idxRef.current = next;
        setIdx(next);
      }, Math.max(50, intervalMs));
    };

    const timeoutId = setTimeout(start, Math.max(0, startAfterMs));

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [imgs.length, intervalMs, startAfterMs]);

  return (
    <img
      src={imgs[idx]}
      alt={`random-${idx}`}
      style={styleImage}
      loading="eager"
      decoding="async"
    />
  );
};

export default RandomImgEverySecond;
