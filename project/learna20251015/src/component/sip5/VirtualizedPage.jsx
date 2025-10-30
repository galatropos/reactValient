// VirtualizedPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Page } from "./Page";

const range = [-2, -1, 0, 1, 2];
const transition = { type: "spring", bounce: 0 };

export const VirtualizedPage = ({
  children,
  gapPx = 20,            // separación fija
  centerScale = 1.25,    // escala SOLO del centro
  compensateGap = true,  // compensa el gap cuando el centro escala
  sideOuterGapPx = 0,    // gap extra para orillas (|rel| >= 2)

  // Nudge (empujoncito) en bucle
  nudgeOnStart = false,
  nudgePx = 28,
  nudgeDelayMs = 400,
  nudgeDuration = 0.3,
  nudgePauseMs = 1400,
  stopNudgeOnInteract = true,
  // Reanudar nudge por inactividad
  resumeNudgeAfterMs = 30000, // 30s

  // Fallback estricto del tap (propaga a Page)
  strictTapEnabled = false,
  strictTapThresholdPx = 6,
  strictTapMaxMs = 300,
}) => {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Control de nudge
  const nudgeCancelledRef = useRef(false);
  const inactivityTimerRef = useRef(null);
  const [nudgeVersion, setNudgeVersion] = useState(0); // para relanzar el bucle

  const readWidth = () => containerRef.current?.clientWidth || 0;
  const snapW = () => Math.max(1, readWidth() + gapPx);
  const calculateNewX = () => -index * snapW();

  const handleEndDrag = (_e, dragProps) => {
    const w = snapW();
    const { offset, velocity } = dragProps;
    // gesto vertical → resetea
    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition);
      return;
    }
    if (offset.x > w / 4) setIndex((i) => i - 1);
    else if (offset.x < -w / 4) setIndex((i) => i + 1);
    else animate(x, calculateNewX(), transition);
  };

  const stopNudgeAndScheduleResume = () => {
    if (!stopNudgeOnInteract) return;
    nudgeCancelledRef.current = true;
    x.stop();
    x.set(calculateNewX());
    // reprogramar reanudación por inactividad
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      // reanudar nudge si no hubo más interacción
      nudgeCancelledRef.current = false;
      setNudgeVersion((v) => v + 1); // dispara el useEffect del bucle
    }, resumeNudgeAfterMs);
  };

  const handleDragStart = () => stopNudgeAndScheduleResume();
  const handlePointerDown = () => stopNudgeAndScheduleResume();

  // Animar solo cuando cambia el índice
  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [index]);

  // Medición del contenedor
  useEffect(() => {
    const update = () => setContainerWidth(readWidth());
    update();
    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(update);
      if (containerRef.current) ro.observe(containerRef.current);
    }
    window.addEventListener("resize", update);
    return () => {
      if (ro && containerRef.current) ro.unobserve(containerRef.current);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Reposiciona sin animar si cambia el layout
  useEffect(() => {
    x.set(calculateNewX());
  }, [gapPx, containerWidth]);

  // NUDGE en bucle: izq→centro→der→centro; se relanza con nudgeVersion
  useEffect(() => {
    if (!nudgeOnStart) return;
    if (containerWidth <= 0) return;
    // si por alguna razón está cancelado (ej. interacción reciente), no corras
    if (nudgeCancelledRef.current) return;

    let isMounted = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      await sleep(nudgeDelayMs);
      if (!isMounted || nudgeCancelledRef.current) return;

      const easeOut = { type: "tween", duration: nudgeDuration, ease: "easeOut" };
      const springBack = { type: "spring", stiffness: 300, damping: 28 };

      while (isMounted && !nudgeCancelledRef.current) {
        const base = calculateNewX();
        x.set(base);

        // izquierda
        await animate(x, base - nudgePx, easeOut).finished;
        if (!isMounted || nudgeCancelledRef.current) break;

        // volver al centro
        await animate(x, base, springBack).finished;
        if (!isMounted || nudgeCancelledRef.current) break;

        await sleep(nudgePauseMs);
        if (!isMounted || nudgeCancelledRef.current) break;

        // derecha
        await animate(x, base + nudgePx, easeOut).finished;
        if (!isMounted || nudgeCancelledRef.current) break;

        // volver al centro
        await animate(x, base, springBack).finished;
        if (!isMounted || nudgeCancelledRef.current) break;

        await sleep(nudgePauseMs);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [
    nudgeOnStart,
    containerWidth,
    nudgePx,
    nudgeDelayMs,
    nudgeDuration,
    nudgePauseMs,
    index,
    nudgeVersion, // ⬅️ re-lanza el bucle al cambiar
  ]);

  // limpiar timer de inactividad al desmontar
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "visible" }}
    >
      {range.map((r) => (
        <Page
          key={r + index}
          x={x}
          onDragStart={handleDragStart}
          onDragEnd={handleEndDrag}
          index={r + index}
          centerIndex={index}
          renderPage={children}
          containerWidth={containerWidth}
          gapPx={gapPx}
          centerScale={centerScale}
          compensateGap={compensateGap}
          sideOuterGapPx={sideOuterGapPx}
          strictTapEnabled={strictTapEnabled}
          strictTapThresholdPx={strictTapThresholdPx}
          strictTapMaxMs={strictTapMaxMs}
        />
      ))}
    </motion.div>
  );
};

VirtualizedPage.displayName = "VirtualizedPage";
