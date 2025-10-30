// Page.jsx
import React, { useMemo, useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { registerOpenOnClick } from "../../../../../src/utils/registerOpenOnClick";
import useRedirectMIP from "../../../../../src/hook/useRedirectMIP";

export const Page = ({
  index,
  centerIndex,          // slide centrado (snap)
  renderPage,
  x,
  onDragStart,
  onDragEnd,
  containerWidth,
  gapPx = 20,
  centerScale = 1.25,   // escala del contenido del centro
  compensateGap = true, // compensa gap a los lados del centro
  sideOuterGapPx = 0,   // gap extra solo para |rel| >= 2

  // Fallback estricto (opcional, por defecto apagado)
  strictTapEnabled = false,
  strictTapThresholdPx = 6,
  strictTapMaxMs = 300,
}) => {
  const child = useMemo(() => renderPage({ index }), [index, renderPage]);

  const w = Math.max(1, containerWidth); // ancho del slide
  const snapW = w + gapPx;               // distancia entre slides
  const baseLeft = index * snapW;        // layout fijo

  // Este slide está centrado cuando x == -(index * snapW)
  const centerXForThis = -(index * snapW);

  // Escala del CONTENIDO: lados = 1, centro = centerScale
  const contentScale = useTransform(
    x,
    [centerXForThis - snapW, centerXForThis, centerXForThis + snapW],
    [1, centerScale, 1]
  );

  // Escala actual del slide CENTRO (index = centerIndex)
  const centerXForCenter = -(centerIndex * snapW);
  const centerScaleNow = useTransform(
    x,
    [centerXForCenter - snapW, centerXForCenter, centerXForCenter + snapW],
    [1, centerScale, 1]
  );

  // Δ/2 por lado = (scaleCentro - 1) * w / 2  (si compensateGap = true)
  const extraGap = useTransform(centerScaleNow, (s) =>
    compensateGap ? Math.max(0, ((s - 1) * w) / 2) : 0
  );

  // Relativo al centro (… -2,-1,0,1,2 …)
  const rel = index - centerIndex;

  // 1) Compensación SOLO a vecinos inmediatos (|rel| === 1)
  const isNeighbor = Math.abs(rel) === 1;
  const neighborShiftSign = rel === -1 ? -1 : rel === 1 ? 1 : 0;
  const neighborShiftX = useTransform(extraGap, (eg) =>
    isNeighbor ? neighborShiftSign * eg : 0
  );

  // 2) Gap extra SOLO para orillas (|rel| >= 2), constante (no depende de x)
  const outerLevels = Math.max(0, Math.abs(rel) - 1); // 0 para |rel|<=1; 1 para |rel|=2; etc.
  const outerShiftConst =
    outerLevels * sideOuterGapPx * (rel < 0 ? -1 : rel > 0 ? 1 : 0);

  // --- Tap: console.log solo si NO hubo drag ---
  const dragStartedRef = useRef(false);
  const downRef = useRef({ x: 0, y: 0, t: 0 });

  const handleDragStartLocal = (e, info) => {
    dragStartedRef.current = true;
    onDragStart && onDragStart(e, info);
  };

  const handleDragEndLocal = (e, info) => {
    onDragEnd && onDragEnd(e, info);
    // liberar la marca después del ciclo actual para no interferir con onTap
    queueMicrotask(() => {
      dragStartedRef.current = false;
    });
  };

  const handleTap = () => {
    if (!dragStartedRef.current) { 
        window.location.href =
        "https://apps.apple.com/us/app/speak-learn-english-learna/id6478287397";
 
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

    if (!dragStartedRef.current && dx < strictTapThresholdPx && dy < strictTapThresholdPx && dt < strictTapMaxMs) {
      console.log("Tap (estricto) sin deslizar:", { index, dx, dy, dt: Math.round(dt) });
    }
  };
  

  return (
    <motion.div
      style={{
        position: "absolute",
        width: `${w}px`,
        height: "100%",
        left: `${baseLeft}px`, // layout base intacto
        x,                     // drag global
        overflow: "visible",
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
      {/* Capa 1: empuje constante para orillas */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `translateX(${outerShiftConst}px)`,
          willChange: "transform",
        }}
      >
        {/* Capa 2: vecinos + escala del contenido */}
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            x: neighborShiftX, // vecinos se empujan cuando el centro escala
          }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              scale: contentScale,     // centro grande; lados = 1
              transformOrigin: "50% 50%",
            }}
          >
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
