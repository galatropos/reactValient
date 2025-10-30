// VirtualizedPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Page } from "./Page";

const range = [-2, -1, 0, 1, 2];
const transition = { type: "spring", bounce: 0 };

export const VirtualizedPage = ({
  children,

  // Tamaño del contenedor
  sizeMode = "layout", // "layout" | "visual"

  // Layout
  slideWidthPct = 1,
  gapPx = 0,
  centerScale = 1,
  compensateGap = false,
  sideOuterGapPx = 0,

  // 🔹 Escala “alrededor”
  scaleMode = "center", // "center" | "sides"
  sidesScale = 0.9,

  // Nudge (empujoncito)
  nudgeOnStart = false,
  nudgePx = 28,
  nudgeDelayMs = 400,
  nudgeDuration = 0.3,
  nudgePauseMs = 1400,
  stopNudgeOnInteract = true,
  resumeNudgeAfterMs = 30000,

  // 🔹 NUEVO: control de direcciones / patrón
  nudgeMode = "both",                 // "both" | "left" | "right" | "pattern"
  nudgeLeftPx,                        // si no se pasa, toma nudgePx
  nudgeRightPx,                       // si no se pasa, toma nudgePx
  nudgePattern = [],                  // solo si nudgeMode="pattern"; [{dx, duration, pause}]

  // Tap
  tapUrl,
  onTapSlide,

  // Tracking
  initialIndex = 0,
  onIndexChangeRaw,

  // Tap estricto (opcional)
  strictTapEnabled = false,
  strictTapThresholdPx = 6,
  strictTapMaxMs = 300,
}) => {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(initialIndex || 0);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  const nudgeCancelledRef = useRef(false);
  const inactivityTimerRef = useRef(null);
  const [nudgeVersion, setNudgeVersion] = useState(0);

  // notifica cambios de índice raw
  useEffect(() => {
    onIndexChangeRaw?.(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // lectura tamaño
  const readSize = () => {
    if (!containerRef.current) return { w: 0, h: 0 };
    if (sizeMode === "visual") {
      const r = containerRef.current.getBoundingClientRect();
      return { w: Math.max(1, r.width), h: Math.max(1, r.height) };
    }
    return {
      w: Math.max(1, containerRef.current.clientWidth || 0),
      h: Math.max(1, containerRef.current.clientHeight || 0),
    };
  };

  const snapW = () => {
    const W = containerSize.w;
    const slideW = Math.max(1, W * slideWidthPct);
    return Math.max(1, slideW + gapPx);
  };

  const calculateNewX = () => -index * snapW();
  const swipeThresholdPx = () => Math.max(24, containerSize.w * 0.2);

  const handleEndDrag = (_e, dragProps) => {
    const { offset, velocity } = dragProps;
    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition);
      return;
    }
    const th = swipeThresholdPx();
    if (offset.x > th) setIndex((i) => i - 1);
    else if (offset.x < -th) setIndex((i) => i + 1);
    else animate(x, calculateNewX(), transition);
  };

  const stopNudgeAndScheduleResume = () => {
    if (!stopNudgeOnInteract) return;
    nudgeCancelledRef.current = true;
    x.stop();
    x.set(calculateNewX());
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      nudgeCancelledRef.current = false;
      setNudgeVersion((v) => v + 1);
    }, resumeNudgeAfterMs);
  };

  // animación al snap
  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [index, containerSize.w, gapPx, slideWidthPct]);

  // medición + observers
  useEffect(() => {
    const update = () => setContainerSize(readSize());
    update();

    let ro = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      ro = new ResizeObserver(update);
      if (containerRef.current) ro.observe(containerRef.current);
    }
    window.addEventListener("resize", update);
    return () => {
      if (ro && containerRef.current) ro.unobserve(containerRef.current);
      window.removeEventListener("resize", update);
    };
  }, [sizeMode]);

  // reposiciona sin animación cuando cambian layout/medidas
  useEffect(() => {
    x.set(calculateNewX());
  }, [gapPx, slideWidthPct, containerSize.w]);

  // NUDGE loop configurable
  useEffect(() => {
    if (!nudgeOnStart) return;
    if (containerSize.w <= 0) return;
    if (nudgeCancelledRef.current) return;

    let isMounted = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // valores efectivos
    const L = (typeof nudgeLeftPx === "number" ? nudgeLeftPx : nudgePx);
    const R = (typeof nudgeRightPx === "number" ? nudgeRightPx : nudgePx);

    // Transiciones base
    const easeOut = { type: "tween", duration: nudgeDuration, ease: "easeOut" };
    const springBack = { type: "spring", stiffness: 300, damping: 28 };

    // Construye los pasos según modo
    const buildSteps = () => {
      if (nudgeMode === "pattern" && Array.isArray(nudgePattern) && nudgePattern.length) {
        // Normaliza pattern a objetos { dx, duration, pause }
        return nudgePattern.map((p) => ({
          dx: Number(p?.dx || 0),
          duration: Number.isFinite(p?.duration) ? p.duration : nudgeDuration,
          pause: Number.isFinite(p?.pause) ? p.pause : nudgePauseMs,
        }));
      }

      if (nudgeMode === "left") {
        // Solo izquierda -> centro -> pausa -> repetir
        return [
          { dx: -Math.abs(L), duration: nudgeDuration, pause: nudgePauseMs },
        ];
      }

      if (nudgeMode === "right") {
        // Solo derecha -> centro -> pausa -> repetir
        return [
          { dx: +Math.abs(R), duration: nudgeDuration, pause: nudgePauseMs },
        ];
      }

      // "both" (default): izquierda -> centro -> pausa -> derecha -> centro -> pausa
      return [
        { dx: -Math.abs(L), duration: nudgeDuration, pause: nudgePauseMs },
        { dx: +Math.abs(R), duration: nudgeDuration, pause: nudgePauseMs },
      ];
    };

    const steps = buildSteps();

    const run = async () => {
      await sleep(nudgeDelayMs);
      if (!isMounted || nudgeCancelledRef.current) return;

      while (isMounted && !nudgeCancelledRef.current) {
        const base = calculateNewX();
        x.set(base);

        // recorre los pasos
        for (const step of steps) {
          if (!isMounted || nudgeCancelledRef.current) break;

          // empuja
          const stepEase = { type: "tween", duration: step.duration, ease: "easeOut" };
          await animate(x, base + step.dx, stepEase).finished;
          if (!isMounted || nudgeCancelledRef.current) break;

          // vuelve al centro con “spring”
          await animate(x, base, springBack).finished;
          if (!isMounted || nudgeCancelledRef.current) break;

          // pausa
          await sleep(step.pause);
        }
      }
    };

    run();
    return () => { isMounted = false; };
  }, [
    nudgeOnStart,
    containerSize.w,
    nudgePx,
    nudgeLeftPx,
    nudgeRightPx,
    nudgeMode,
    nudgePattern,
    nudgeDelayMs,
    nudgeDuration,
    nudgePauseMs,
    index,
    nudgeVersion,
  ]);

  // limpieza
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: gapPx === 0 ? "hidden" : "visible",
        boxSizing: "border-box",
        minWidth: 0,
        minHeight: 0,
      }}
      onPointerDown={stopNudgeAndScheduleResume}
    >
      {range.map((r) => (
        <Page
          key={r + index}
          x={x}
          onDragStart={stopNudgeAndScheduleResume}
          onDragEnd={handleEndDrag}
          index={r + index}
          centerIndex={index}
          renderPage={children}
          containerWidth={containerSize.w}
          slideWidthPct={slideWidthPct}
          gapPx={gapPx}
          centerScale={centerScale}
          compensateGap={compensateGap}
          sideOuterGapPx={sideOuterGapPx}
          // escala “alrededor”
          scaleMode={scaleMode}
          sidesScale={sidesScale}
          // tap
          strictTapEnabled={strictTapEnabled}
          strictTapThresholdPx={strictTapThresholdPx}
          strictTapMaxMs={strictTapMaxMs}
          tapUrl={tapUrl}
          onTapSlide={onTapSlide}
        />
      ))}
    </motion.div>
  );
};

VirtualizedPage.displayName = "VirtualizedPage";
