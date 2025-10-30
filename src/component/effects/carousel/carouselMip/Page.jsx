// Page.jsx
import React, { useMemo, useRef } from "react";
import { motion, useTransform } from "framer-motion";

export const Page = ({
  index,
  centerIndex,
  renderPage,
  x,
  onDragStart,
  onDragEnd,
  containerWidth,

  // Layout
  slideWidthPct = 1,
  gapPx = 0,

  // Escala
  centerScale = 1,
  compensateGap = false,
  sideOuterGapPx = 0,

  // 🔹 NUEVO
  scaleMode = "center", // "center" | "sides"
  sidesScale = 0.9,

  // Tap
  strictTapEnabled = false,
  strictTapThresholdPx = 6,
  strictTapMaxMs = 300,
  tapUrl,
  onTapSlide,
}) => {
  const child = useMemo(() => renderPage({ index }), [index, renderPage]);

  const W = Math.max(1, containerWidth);
  const w = Math.max(1, W * slideWidthPct);
  const snapW = w + gapPx;

  // Centrar cada “tarjeta” dentro del carrusel (si hay peeks)
  const leftCenterOffset = (W - w) / 2;
  const baseLeft = index * snapW + leftCenterOffset;

  // Este slide está centrado cuando x == -(index * snapW)
  const centerXForThis = -(index * snapW);

  // 🔸 ESCALA del contenido, según scaleMode
  // - "center": [1, centerScale, 1] (comportamiento actual)
  // - "sides" : [sidesScale, 1, sidesScale] (alrededor escalado, centro 1)
  const contentScale = useTransform(
    x,
    [centerXForThis - snapW, centerXForThis, centerXForThis + snapW],
    scaleMode === "sides" ? [sidesScale, 1, sidesScale] : [1, centerScale, 1]
  );

  // Para compensar gap SOLO tiene sentido cuando el centro crece (>1)
  // (Si los lados se reducen, normalmente no compensamos)
  const centerXForCenter = -(centerIndex * snapW);
  const centerScaleNow = useTransform(
    x,
    [centerXForCenter - snapW, centerXForCenter, centerXForCenter + snapW],
    [1, centerScale, 1]
  );

  const extraGap = useTransform(centerScaleNow, (s) => {
    if (scaleMode === "sides") return 0; // sin compensación cuando escalan lados
    return compensateGap ? Math.max(0, ((s - 1) * w) / 2) : 0;
  });

  const rel = index - centerIndex;

  // Vecinos inmediatos
  const isNeighbor = Math.abs(rel) === 1;
  const neighborShiftSign = rel === -1 ? -1 : rel === 1 ? 1 : 0;
  const neighborShiftX = useTransform(extraGap, (eg) =>
    isNeighbor ? neighborShiftSign * eg : 0
  );

  // Orillas (|rel| >= 2)
  const outerLevels = Math.max(0, Math.abs(rel) - 1);
  const outerShiftConst =
    outerLevels * sideOuterGapPx * (rel < 0 ? -1 : rel > 0 ? 1 : 0);

  // --- Tap / Drag ---
  const dragStartedRef = useRef(false);
  const downRef = useRef({ x: 0, y: 0, t: 0 });

  const handleDragStartLocal = (e, info) => {
    dragStartedRef.current = true;
    onDragStart && onDragStart(e, info);
  };

  const handleDragEndLocal = (e, info) => {
    onDragEnd && onDragEnd(e, info);
    queueMicrotask(() => {
      dragStartedRef.current = false;
    });
  };

  const handleTap = () => {
    if (dragStartedRef.current) return;
    if (onTapSlide) {
      onTapSlide(index);
      return;
    }
    if (tapUrl) {
      window.location.href = tapUrl;
    }
  };

  const handlePointerDown = (e) => {
    if (!strictTapEnabled) return;
    const p = "touches" in e ? e.touches[0] : e;
    downRef.current = { x: p.clientX, y: p.clientY, t: performance.now() };
  };

  const handlePointerUp = (e) => {
    if (!strictTapEnabled) return;
    const p = "changedTouches" in e ? e.changedTouches[0] : e;
    const dx = Math.abs(p.clientX - downRef.current.x);
    const dy = Math.abs(p.clientY - downRef.current.y);
    const dt = performance.now() - downRef.current.t;

    if (
      !dragStartedRef.current &&
      dx < strictTapThresholdPx &&
      dy < strictTapThresholdPx &&
      dt < strictTapMaxMs
    ) {
      handleTap();
    }
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        width: `${w}px`,
        height: "100%",
        left: `${baseLeft}px`,
        x,
        overflow: gapPx === 0 ? "hidden" : "visible",
        boxSizing: "border-box",
        willChange: "transform",
      }}
      drag="x"
      dragElastic={1}
      onDragStart={handleDragStartLocal}
      onDragEnd={handleDragEndLocal}
      onTap={handleTap}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Empuje constante para orillas */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `translateX(${outerShiftConst}px)`,
          willChange: "transform",
        }}
      >
        {/* Vecinos + escala del contenido */}
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            x: neighborShiftX,
          }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              scale: contentScale,     // ← aquí aplicamos el modo de escala
              transformOrigin: "50% 50%",
            }}
          >
            {/* Tu contenido: 100% aquí llena EXACTO el área del slide */}
            <div style={{ width: "100%", height: "100%", display: "flex" }}>
              {child}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

Page.displayName = "Page";
