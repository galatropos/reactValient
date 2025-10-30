import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../assets/style/sip6.css";
import VideoToFramesPlayer from "../../../../../src/component/VideoToFramesPlayer";
import video from "../../../assets/video/video.mp4";
import fondo from "../../../assets/audio/sip6/fondo.m4a";
import audioClick from "../../../assets/audio/sip6/click.mp3";
import useAudio from "../../../../../src/hook/useAudio";
import { useRedirectMIPEvent } from "../../../../../src/hook/useRedirectMIP";
import { registerOpenOnClick } from "../../../../../src/utils/registerOpenOnClick";
import Hand from "./Hand";
import Fail from "./Fail";

/* ================== CONFIGURABLES (solo toca esto) ================== */
// Boost en portrait (si lo quisieras usar). Aquí no lo usamos.
const PORTRAIT_BOOST = 1.0;

// Boost en landscape cuando sea 4:3 (y/o 1024x768 exacto).
// 🔥 Pusimos 10 para que se note inmediatamente.
const LANDSCAPE_43_BOOST = 10;

// Tolerancia para detectar 4:3 (a propósito la hago grande para que entre seguro)
const AR_TOLERANCE = 1.15; // ±15%

// Tamaño objetivo a forzar (exacto). Cambia si deseas otro.
const FORCE_LANDSCAPE_SIZE = { w: 1024, h: 768 };
/* ==================================================================== */

/* ===== Hook: orientación landscape ===== */
function useIsLandscape() {
  const get = () => {
    if (typeof window === "undefined") return false;
    if ("matchMedia" in window) {
      return window.matchMedia("(orientation: landscape)").matches;
    }
    return window.innerWidth > window.innerHeight;
  };
  const [isLandscape, setIsLandscape] = useState(get);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: landscape)");
    const onChange = () => setIsLandscape(get());
    mq.addEventListener?.("change", onChange);
    mq.addListener?.(onChange);
    window.addEventListener("resize", onChange);
    window.addEventListener("orientationchange", onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      mq.removeListener?.(onChange);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("orientationchange", onChange);
    };
  }, []);

  return isLandscape;
}

/* ===== Util: medición del contenedor + helpers ===== */
function getScale(boxW, boxH, baseW, baseH, mode) {
  const rw = boxW / baseW;
  const rh = boxH / baseH;
  if (mode === "contain") return Math.min(rw, rh);
  if (mode === "cover")   return Math.max(rw, rh);
  if (mode === "width")   return rw;
  if (mode === "height")  return rh;
  const arBox = boxW / boxH;
  const arBase = baseW / baseH;
  return arBox > arBase ? rw : rh;
}

function useMeasureBox() {
  const containerRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setBox({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    // primera medición
    setBox({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  return { containerRef, box };
}

/* =============================== Componente =============================== */
const Start = ({ setActive }) => {
  const [index, setIndex] = useState(0);
  const audio = useAudio(fondo);
  const click = useAudio(audioClick);
  const isLandscape = useIsLandscape();

  // Lienzo lógico
  const BASE_W = 1080;
  const BASE_H = 1920;

  // Medimos el contenedor
  const { containerRef, box } = useMeasureBox();

  // Helpers de detección
  const arBox = useMemo(() => (box.w && box.h ? box.w / box.h : 1), [box.w, box.h]);
  const isFourThree = useMemo(
    () => Math.abs(arBox - 4 / 3) <= AR_TOLERANCE,
    [arBox]
  );
  const isForceSize = useMemo(() => {
    if (!box.w || !box.h) return false;
    // tolerancia de 2px por dudas de bordes / barras
    return Math.abs(box.w - FORCE_LANDSCAPE_SIZE.w) <= 2 &&
           Math.abs(box.h - FORCE_LANDSCAPE_SIZE.h) <= 2;
  }, [box.w, box.h]);

  // Escalas base
  const coverScale = useMemo(() => {
    if (!box.w || !box.h) return 1;
    return getScale(box.w, box.h, BASE_W, BASE_H, "cover");
  }, [box.w, box.h]);

  // Decide escala según orientación / AR / tamaño exacto
  const scaleValue = useMemo(() => {
    if (!box.w || !box.h) return undefined;

    if (!isLandscape) {
      // Portrait: (aquí no aplicamos boost, pero puedes usar PORTRAIT_BOOST si quieres)
      const s = coverScale * PORTRAIT_BOOST;
      if (PORTRAIT_BOOST !== 1) {
        console.log("[scale] portrait", { w: box.w, h: box.h, s });
      }
      return PORTRAIT_BOOST !== 1 ? s : undefined;
    }

    // Landscape: si es 4:3 o 1024x768 exacto → BOOST x10
    if (isFourThree || isForceSize) {
      const s = coverScale * LANDSCAPE_43_BOOST;
      console.log("[scale] landscape 4:3/forced", {
        w: box.w, h: box.h, arBox, isFourThree, isForceSize, coverScale, boost: LANDSCAPE_43_BOOST, s
      });
      return s;
    }

    // Otros landscape: sin boost
    return undefined;
  }, [box.w, box.h, isLandscape, isFourThree, isForceSize, coverScale]);

  useEffect(() => {
    click.automatic();
    audio.setLoop(true);
    audio.automatic();
  }, [audio, click]);

  const redirectFuncion = () => {
    useRedirectMIPEvent({
      appstore:
        "https://apps.apple.com/ve/app/learna-ai-aprender-ingl%C3%A9s/id6478287397",
      playStore:
        "https://play.google.com/store/apps/details?id=com.codeway.aitutor",
      windows: "https://ailearna.com/es",
    });
    registerOpenOnClick();
  };

  const changeIndex = (i) => setIndex(i);

  const repeat = [
    [1330, 0, "next", () => changeIndex(1)],
    [2700, "pauseEvent", () => changeIndex(2)],
    [3600, "pauseEvent", () => changeIndex(3)],
    [4500, "pauseEvent", () => changeIndex(4)],
    [4700, "pauseEvent", () => changeIndex(5)],
    [5900, "pauseEvent", () => changeIndex(6)],
    [7400, "pauseEvent"],
    [8500, "pauseEvent", () => changeIndex(7)],
    [9400, "pauseEvent", () => changeIndex(8)],
    [11400, 10100, "end", () =>redirectFuncion()],
  ];

  const configBackground = {
    portrait: { x: 50, y: 50, width: 101, height: 101, anchor: "middle" },
    landscape: { x: 50, y: 50, width: 100, height: 100, anchor: "middle" },
    portraitSrc: video,
    landscapeSrc: video,
    repeat,
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* 👇 TU BLOQUE intacto; solo cambia la línea transform */}
      <span
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: scaleValue ? `scale(${scaleValue})` : undefined,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <VideoToFramesPlayer {...configBackground} objectFit="contain" />

        {/* Mostrar Fail al paso 7 */}
        {index !== 7 || <Fail />}

        {/* Hand no bloquea toques del video */}
        <div style={{ pointerEvents: "none" }}>
          <Hand index={index} />
        </div>
      </span>
    </div>
  );
};

export default Start;
