import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";

/** Hook: "portrait" | "landscape" */
function useOrientationMode() {
  const getIsPortrait = () => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      return window.matchMedia("(orientation: portrait)").matches;
    }
    return typeof window !== "undefined"
      ? window.innerHeight >= window.innerWidth
      : true;
  };
  const [mode, setMode] = useState(getIsPortrait() ? "portrait" : "landscape");

  useEffect(() => {
    const onChange = () => setMode(getIsPortrait() ? "portrait" : "landscape");
    const mq = window.matchMedia("(orientation: portrait)");
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

  return mode;
}

/**
 * VideoToFramesPlayer:
 *  - portrait: src vertical
 *  - landscape: src horizontal
 *  - repeat: Array<[triggerMs, targetMs, count]>
 *  - objectFit: "cover" | "contain" (default "cover")
 *  - autoPlay (true), loop (true), muted (true)
 *  - preloadHidden: "none" | "metadata" | "auto" (default "metadata")
 *  - posterPortrait / posterLandscape (opcional)
 */
export default function VideoToFramesPlayer({
  portrait,
  portraitSrc,
  landscape, 
  landscapeSrc,
  repeat = [],
  posterPortrait,
  posterLandscape,
  objectFit = "cover",
  autoPlay = true,
  loop = true,
  muted = true,
  preloadHidden = "metadata",
  className,
  style,
}) {
  const mode = useOrientationMode();
  const portraitRef = useRef(null);
  const landscapeRef = useRef(null);

  const showPortrait = mode === "portrait";
  const shownRef = showPortrait ? portraitRef : landscapeRef;
  const hiddenRef = showPortrait ? landscapeRef : portraitRef;

  // Estilo de ambos <video>
  const videoStyle = useMemo(
    () => ({
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit,
      display: "block",
      backgroundColor: "black",
    }),
    [objectFit]
  );

  // ---- REPEAT (sobre el <video>) ----
  // Reglas originales y su estado de "remaining"
  const rulesInitialRef = useRef([]); // [{triggerMs, targetMs, count}]
  const rulesStateRef = useRef([]);   // [{triggerMs, targetMs, remaining}]
  const resetRuleCounts = () => {
    rulesStateRef.current = rulesInitialRef.current.map((r) => ({
      triggerMs: r.triggerMs,
      targetMs: r.targetMs,
      remaining: r.count,
    }));
  };

  // Cargar/actualizar reglas repeat
  useEffect(() => {
    const rules = (Array.isArray(repeat) ? repeat : [])
      .map(([tr, tg, c]) => ({
        triggerMs: Math.max(0, Number(tr) || 0),
        targetMs: Math.max(0, Number(tg) || 0),
        count: Math.max(0, Number.isFinite(c) ? Math.floor(c) : 0),
      }))
      .sort((a, b) => a.triggerMs - b.triggerMs);
    rulesInitialRef.current = rules;
    resetRuleCounts();
  }, [repeat]);

  // Sincroniza tiempo entre videos al rotar + play/pause correcto
  const prevTimeRef = useRef(0); // ms
  useEffect(() => {
    const vShow = shownRef.current;
    const vHide = hiddenRef.current;

    // pausa el oculto
    if (vHide) { try { vHide.pause(); } catch {} }

    // traspasa tiempo y reproduce el visible
    const desired = vHide?.currentTime || 0;
    if (vShow) {
      const ensureMeta = () =>
        new Promise((res) => {
          if (vShow.readyState >= 1) return res();
          const on = () => { vShow.removeEventListener("loadedmetadata", on); res(); };
          vShow.addEventListener("loadedmetadata", on, { once: true });
        });

      ensureMeta().then(() => {
        try {
          const dur = isFinite(vShow.duration) ? vShow.duration : desired;
          // -0.001s para evitar quedarnos justo en el último frame
          vShow.currentTime = Math.min(desired, Math.max(0, (dur || 0) - 0.001));
        } catch {}
        if (autoPlay) {
          const p = vShow.play?.();
          p?.catch?.(()=>{});
        }
      });
    }
    prevTimeRef.current = (desired || 0) * 1000;
  }, [mode, autoPlay]);

  // Bucle RAF: detección robusta de TRIGGERS + loop nativo
  useEffect(() => {
    let stopped = false;
    const EPS_MS = 80; // margen para no perder el trigger por saltos de tiempo
    const tick = () => {
      if (stopped) return;
      const v = shownRef.current;
      if (!v) { requestAnimationFrame(tick); return; }

      const tMs = (v.currentTime || 0) * 1000;
      const prev = prevTimeRef.current;
      const durSec = isFinite(v.duration) ? v.duration : NaN;
      const durMs = isFinite(durSec) ? durSec * 1000 : NaN;

      // Detectar LOOP NATIVO (no confundir con saltos de repeat):
      // prev muy cerca del final y tMs muy cerca del inicio.
      if (loop && isFinite(durMs)) {
        const nearStart = tMs < 250;
        const nearEnd = prev > (durMs - 400);
        if (prev > tMs + 100 && nearStart && nearEnd) {
          // Se reinició el video por loop => reiniciar "remaining"
          resetRuleCounts();
        }
      }

      // TRIGGERS con "detección de cruce":
      // Si antes estábamos por DEBAJO del trigger y ahora estamos por ENCIMA (o igual),
      // ejecutamos el salto y descontamos "remaining".
      for (const r of rulesStateRef.current) {
        if (r.remaining <= 0) continue;

        const wasBelow = prev < (r.triggerMs - EPS_MS);
        const isNowAtOrAbove = tMs >= (r.triggerMs - EPS_MS);

        if (wasBelow && isNowAtOrAbove) {
          // Saltar al target
          const targetSec = r.targetMs / 1000;
          const safeTargetSec = isFinite(durSec)
            ? Math.min(Math.max(0, targetSec), Math.max(0, durSec - 0.001))
            : Math.max(0, targetSec);
          try { v.currentTime = safeTargetSec; } catch {}
          r.remaining -= 1;

          // Actualizar prevTime para el siguiente frame (evita re-disparos accidentales)
          prevTimeRef.current = safeTargetSec * 1000;

          requestAnimationFrame(tick);
          return; // salimos para aplicar un salto a la vez
        }
      }

      prevTimeRef.current = tMs;
      requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(id);
    };
  }, [showPortrait, loop]);

  return (
    <Card
      className={className}
      style={style}
      landscape={landscape}
      portrait={portrait}
    >
      {/* PORTRAIT */}
      <video
        ref={portraitRef}
        src={portraitSrc}
        poster={posterPortrait}
        muted={muted}
        playsInline
        loop={loop}
        preload={showPortrait ? "auto" : preloadHidden}
        autoPlay={autoPlay && showPortrait}
        style={{ ...videoStyle, display: showPortrait ? "block" : "none" }}
      />

      {/* LANDSCAPE */}
      <video
        ref={landscapeRef}
        src={landscapeSrc}
        poster={posterLandscape}
        muted={muted}
        playsInline
        loop={loop}
        preload={!showPortrait ? "auto" : preloadHidden}
        autoPlay={autoPlay && !showPortrait}
        style={{ ...videoStyle, display: !showPortrait ? "block" : "none" }}
      />
    </Card>
  );
}
