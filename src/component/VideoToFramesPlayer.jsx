"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";

/** Hook de orientación: "portrait" | "landscape" */
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
 * - Le pasas portraitSrc / landscapeSrc (videos)
 * - Pinta frames en <canvas> (videos ocultos como fuente)
 * - repeat: [triggerMs, targetMs, count]
 * - pause : [triggerMs, durationMs]   (1 disparo por loop por regla)
 */
export default function VideoToFramesPlayer({
  portrait,
  portraitSrc,
  landscape,
  landscapeSrc,
  repeat = [],
  pause = [],
  posterPortrait,
  posterLandscape,
  objectFit = "cover",            // "cover" | "contain"
  autoPlay = true,
  loop = true,
  muted = true,
  preloadHidden = "metadata",
  className,
  style,
  noCard = false,
}) {
  const mode = useOrientationMode();
  const showPortrait = mode === "portrait";

  // videos ocultos (fuente)
  const vPortraitRef = useRef(null);
  const vLandscapeRef = useRef(null);

  // canvas visibles
  const cPortraitRef = useRef(null);
  const cLandscapeRef = useRef(null);

  const shownVideoRef  = showPortrait ? vPortraitRef  : vLandscapeRef;
  const hiddenVideoRef = showPortrait ? vLandscapeRef : vPortraitRef;
  const shownCanvasRef = showPortrait ? cPortraitRef  : cLandscapeRef;

  // contenedor para observar tamaño (re-draw inmediato)
  const containerRef = useRef(null);

  // =======================
  // repeat en ms
  // =======================
  const rulesInitialRef = useRef([]);
  const rulesStateRef   = useRef([]);
  const resetRuleCounts = () => {
    rulesStateRef.current = rulesInitialRef.current.map((r) => ({ ...r }));
  };
  useEffect(() => {
    const rules = (Array.isArray(repeat) ? repeat : [])
      .map(([tr, tg, c]) => ({
        triggerMs: Math.max(0, Number(tr) || 0),
        targetMs : Math.max(0, Number(tg) || 0),
        remaining: Math.max(0, Number.isFinite(c) ? Math.floor(c) : 0),
      }))
      .sort((a, b) => a.triggerMs - b.triggerMs);
    rulesInitialRef.current = rules;
    resetRuleCounts();
  }, [repeat]);

  // =======================
  // pause en ms
  // =======================
  const pausesInitialRef = useRef([]);
  const pausesStateRef   = useRef([]);
  const resetPauseCounts = () => {
    pausesStateRef.current = pausesInitialRef.current.map((p) => ({
      ...p,
      holdEndAt: 0,  // performance.now() cuando termina la pausa
      holdAtMs : 0,  // tiempo de video congelado
    }));
  };
  useEffect(() => {
    const pauses = (Array.isArray(pause) ? pause : [])
     .map(([tr, dur, cnt]) => ({
        triggerMs : Math.max(0, Number(tr)  || 0),
        durationMs: Math.max(0, Number(dur) || 0),
       remaining : Number.isFinite(cnt) ? Math.max(0, Math.floor(cnt)) : Number.POSITIVE_INFINITY,
        holdEndAt : 0,
        holdAtMs  : 0,
      }))
      .sort((a, b) => a.triggerMs - b.triggerMs);
    pausesInitialRef.current = pauses;
    resetPauseCounts();
  }, [pause]);

  // estilos
  const canvasStyle = useMemo(
    () => ({
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      display: "block",
      ...style,
    }),
    [style]
  );

  const containerStyle = useMemo(
    () => ({
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "100%",
      background: "black",
    }),
    [style]
  );

  // sincronizar tiempo al rotar + preparar autoplay
  const prevMsRef = useRef(0); // para detección de wrap por tiempo
  useEffect(() => {
    const vShow = shownVideoRef.current;
    const vHide = hiddenVideoRef.current;
    if (!vShow || !vHide) return;

    const desired = vHide.currentTime || 0;
    const ensureMeta = (vv) =>
      new Promise((res) => {
        if (vv.readyState >= 1) return res();
        const on = () => { vv.removeEventListener("loadedmetadata", on); res(); };
        vv.addEventListener("loadedmetadata", on, { once: true });
      });

    ensureMeta(vShow).then(() => {
      try {
        const dur = isFinite(vShow.duration) ? vShow.duration : desired;
        // -0.001s para evitar quedar en el último frame exacto
        vShow.currentTime = Math.min(desired, Math.max(0, (dur || 0) - 0.001));
      } catch {}
      if (autoPlay) {
        const p = vShow.play?.();
        p?.catch?.(() => {});
      }
      // al rotar, sincroniza "prev" para evitar falsos wraps
      prevMsRef.current = (desired || 0) * 1000;
    });
  }, [mode, autoPlay]);

  // dibujar frame al canvas con objectFit + HiDPI + ResizeObserver
  const drawToCanvas = (video, canvas) => {
    if (!video || !canvas) return;

    // tamaños CSS actuales
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (!cw || !ch) return;

    // HiDPI
    const dpr = window.devicePixelRatio || 1;
    const needResize =
      canvas.width !== Math.floor(cw * dpr) || canvas.height !== Math.floor(ch * dpr);
    if (needResize) {
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mantener coords en px CSS
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const vw = video.videoWidth || 1;
    const vh = video.videoHeight || 1;

    const scale =
      objectFit === "contain"
        ? Math.min(cw / vw, ch / vh)
        : Math.max(cw / vw, ch / vh);

    const dw = Math.max(1, Math.floor(vw * scale));
    const dh = Math.max(1, Math.floor(vh * scale));
    const dx = Math.floor((cw - dw) / 2);
    const dy = Math.floor((ch - dh) / 2);

    ctx.clearRect(0, 0, cw, ch);
    try {
      ctx.drawImage(video, dx, dy, dw, dh);
    } catch {}
  };

  // Redibujar si cambia tamaño del contenedor
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      const v = shownVideoRef.current;
      const c = shownCanvasRef.current;
      if (v && c) drawToCanvas(v, c);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [showPortrait, objectFit]);

  // Redibujar si cambias objectFit / orientación
  useEffect(() => {
    const v = shownVideoRef.current;
    const c = shownCanvasRef.current;
    if (v && c) drawToCanvas(v, c);
  }, [objectFit, showPortrait]);

  // loop de frames (requestVideoFrameCallback si existe; fallback a RAF)
  const rafRef = useRef(null);

  useEffect(() => {
    const v = shownVideoRef.current;
    const canvas = shownCanvasRef.current;
    if (!v || !canvas) return;

    let stopped = false;
    const hasRVFC = typeof v.requestVideoFrameCallback === "function";

    // intentar autoplay silencioso
    const tryPlay = async () => {
      try {
        v.muted = muted;
        v.playsInline = true;
        if (autoPlay) await v.play();
      } catch {
        // si no deja, avanzaremos manualmente el currentTime en el fallback
      }
    };
    tryPlay();

    // Detección de LOOP NATIVO por tiempo: near end → near start
    const detectAndResetOnWrap = (tMs) => {
      if (!loop) return;
      const durSec = isFinite(v.duration) ? v.duration : NaN;
      const durMs = isFinite(durSec) ? durSec * 1000 : NaN;
      if (!isFinite(durMs)) return;

      const prev = prevMsRef.current;
      const nearStart = tMs < 250; // ~0.25s
      const nearEnd = prev > durMs - 400; // últimas ~0.4s
      const wrapped = prev > tMs + 100 && nearStart && nearEnd;
      if (wrapped) {
        resetRuleCounts();  // reinicia repeat
        resetPauseCounts(); // reinicia pause
      }
    };

    const handleProgressAndDraw = () => {
      const tMs = (v.currentTime || 0) * 1000;

      // Detecta wrap y resetea reglas
      detectAndResetOnWrap(tMs);

      // ---- PAUSE (con RVFC) ----
      const now = performance.now();
      const activeHold = pausesStateRef.current.find((p) => p.holdEndAt > now);
      if (activeHold) {
        const holdSec = (activeHold.holdAtMs || 0) / 1000;
        try {
          v.currentTime = holdSec;
        } catch {}
        prevMsRef.current = activeHold.holdAtMs || tMs;
        drawToCanvas(v, canvas);
        return;
      }
      // ¿cruce del trigger?
      const prev = prevMsRef.current;
      for (const p of pausesStateRef.current) {
        if (p.remaining <= 0 || p.durationMs <= 0) continue;
        if (prev < p.triggerMs && tMs >= p.triggerMs) {
          p.holdAtMs = p.triggerMs;
          p.holdEndAt = now + p.durationMs;
          p.remaining -= 1;
          try {
            v.currentTime = p.triggerMs / 1000;
          } catch {}
          prevMsRef.current = p.triggerMs;
          drawToCanvas(v, canvas);
          return;
        }
      }

      // ---- REPEAT (con RVFC) ----
      for (const r of rulesStateRef.current) {
        if (r.remaining <= 0) continue;
        if (prev < r.triggerMs && tMs >= r.triggerMs) {
          try {
            v.currentTime = r.targetMs / 1000;
          } catch {}
          r.remaining -= 1;
          prevMsRef.current = r.targetMs;
          drawToCanvas(v, canvas);
          return;
        }
      }

      prevMsRef.current = tMs;
      drawToCanvas(v, canvas);
    };

    if (hasRVFC) {
      // Camino con requestVideoFrameCallback
      const cb = () => {
        if (stopped) return;
        handleProgressAndDraw();
        v.requestVideoFrameCallback(cb);
      };
      v.requestVideoFrameCallback(cb);
      return () => {
        stopped = true;
      };
    }

    // Fallback RAF: si autoplay falla, avanzamos currentTime manualmente
    let lastTs = null;
    const tick = (ts) => {
      if (stopped) return;

      if (autoPlay && !v.paused && !v.ended) {
        // Reproduciendo normal
        handleProgressAndDraw();
      } else {
        // Autoplay bloqueado: "seeking-driven"
        if (lastTs == null) lastTs = ts;
        const delta = ts - lastTs;
        lastTs = ts;

        const dur = isFinite(v.duration) ? v.duration : 0;
        if (dur > 0) {
          const inc = delta / 1000; // seg
          let next = (v.currentTime || 0) + inc;

          // ---- PAUSE en RAF ----
          const now = performance.now();
          const activeHold = pausesStateRef.current.find((p) => p.holdEndAt > now);
          if (activeHold) {
            next = (activeHold.holdAtMs || 0) / 1000;
          } else {
            const nextMs = next * 1000;
            const prev = prevMsRef.current;
            let startedHold = false;
            for (const p of pausesStateRef.current) {
              if (p.remaining <= 0 || p.durationMs <= 0) continue;
              if (prev < p.triggerMs && nextMs >= p.triggerMs) {
                p.holdAtMs = p.triggerMs;
                p.holdEndAt = now + p.durationMs;
                p.remaining -= 1;
                next = p.triggerMs / 1000;
                prevMsRef.current = p.triggerMs;
                startedHold = true;
                break;
              }
            }
            if (!startedHold) {
              // ---- REPEAT en RAF (solo si no inició hold) ----
              const prev2 = prevMsRef.current;
              let jumped = false;
              for (const r of rulesStateRef.current) {
                if (r.remaining <= 0) continue;
                if (prev2 < r.triggerMs && nextMs >= r.triggerMs) {
                  next = r.targetMs / 1000;
                  r.remaining -= 1;
                  prevMsRef.current = r.targetMs;
                  jumped = true;
                  break;
                }
              }
              if (!jumped) prevMsRef.current = nextMs;
            }
          }

          // envolver / límites
          if (loop) {
            if (next >= dur) {
              next = 0;
              resetRuleCounts();
              resetPauseCounts();
            }
          } else {
            if (next >= dur) next = Math.max(0, dur - 0.001);
          }

          try {
            v.currentTime = next;
          } catch {}
        }
        drawToCanvas(v, canvas);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [showPortrait, autoPlay, loop, muted, objectFit]);

  // redibujo extra al resize de ventana (por si el editor no usa ResizeObserver)
  useEffect(() => {
    const onResize = () => {
      const v = shownVideoRef.current;
      const c = shownCanvasRef.current;
      if (v && c) drawToCanvas(v, c);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showPortrait, objectFit]);

  const content = (
    <>
      {/* videos fuente (ocultos) */}
      <video
        ref={vPortraitRef}
        src={portraitSrc}
        poster={posterPortrait}
        muted={muted}
        playsInline
        loop={loop}
        preload={showPortrait ? "auto" : preloadHidden}
        style={{ display: "none" }}
      />
      <video
        ref={vLandscapeRef}
        src={landscapeSrc}
        poster={posterLandscape}
        muted={muted}
        playsInline
        loop={loop}
        preload={!showPortrait ? "auto" : preloadHidden}
        style={{ display: "none" }}
      />

      {/* canvas visibles */}
      <canvas
        ref={cPortraitRef}
        style={{ ...canvasStyle, display: showPortrait ? "block" : "none" }}
      />
      <canvas
        ref={cLandscapeRef}
        style={{ ...canvasStyle, display: !showPortrait ? "block" : "none" }}
      />
    </>
  );

  if (noCard) {
    return (
      <div ref={containerRef} className={className} style={containerStyle}>
        {content}
      </div>
    );
  }

  // En modo Card, el Card controla tamaño; usamos un wrapper interno para observar redimensionados
  return (
    <Card className={className} style={style} landscape={landscape} portrait={portrait}>
      <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
        {content}
      </div>
    </Card>
  );
}
