// src/component/CarouselDefault.jsx
import React, { useRef, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import Card from "../../Card";
import useCarouselIndexes from "../../../hook/useCarouselIndexes";

const DEFAULT_STYLE = { border: "1px solid black" };
const DEFAULT_PORTRAIT_BASE = { width: 10, height: 10, anchor: "middle" };
const DEFAULT_LANDSCAPE_BASE = { width: 10, height: 10, anchor: "middle" };

const functionCreationIndexCarousel = (maxObjectCarrousel, sizeElement) => {
  const result = [];
  for (let i = 0; i < maxObjectCarrousel; i++) result.push(i % sizeElement);
  return result;
};

export default function CarouselDefault({
  elements = [],
  start = 0,
  end = 100,
  // Puedes ajustar estos 3 para ver mejor
  itemsPerView = 3,         // cuántas tarjetas visibles
  minItemWidth = 220,       // ancho mínimo legible
  maxItemWidth = 360,       // ancho máximo (opcional)
  stepDuration = 1200,      // ms para recorrer EXACTAMENTE 1 tarjeta
  gapPx = 16,               // separación entre tarjetas
  y = 50,
  style = DEFAULT_STYLE,
  portraitBase = DEFAULT_PORTRAIT_BASE,
  landscapeBase = DEFAULT_LANDSCAPE_BASE,
}) {
  const maxObjectCarrousel = 18;
  const sizeElement = Math.max(elements.length, 1); // evita % 0

  // índices iniciales (no cambiar nombre)
  const initialRef = useRef(
    functionCreationIndexCarousel(maxObjectCarrousel, sizeElement)
  );

  // hook (no cambiar nombre)
  const { indexArray, left, right, keys, reset } =
    useCarouselIndexes(initialRef.current, sizeElement);

  // --- Refs/State para animación por transform ---
  const containerRef = useRef(null); // Card con overflow hidden (clip)
  const trackRef = useRef(null);     // fila que movemos con translateX
  const xRef = useRef(0);            // desplazamiento acumulado del track
  const rafRef = useRef(0);
  const stepWRef = useRef(0);        // (ancho tarjeta + gap), cuantizado a px físico

  // Ancho visual por tarjeta (lo usamos para estilos)
  const [itemWidthPx, setItemWidthPx] = useState(minItemWidth);

  // cuantiza a píxel físico (evita drift de subpíxeles)
  const quantize = (n) => {
    const px = 1 / (window.devicePixelRatio || 1);
    return Math.round(n / px) * px;
  };

  // Calcular ancho legible por tarjeta en base al contenedor e itemsPerView
  const recalcWidths = () => {
    const el = containerRef.current;
    if (!el) return;

    // ancho disponible (clientWidth ya descuenta scrollbar y padding interno del Card)
    const avail = el.clientWidth;
    const totalGaps = gapPx * Math.max(0, itemsPerView - 1);
    let w = Math.floor((avail - totalGaps) / itemsPerView);

    // acotar entre min y max para legibilidad
    w = Math.max(minItemWidth, Math.min(maxItemWidth, w));

    // si el contenedor es muy chico, al menos respeta minItemWidth
    setItemWidthPx(w);
    stepWRef.current = quantize(w + gapPx);
  };

  // Medir al montar y en resize (ResizeObserver para precisión)
  useEffect(() => {
    recalcWidths();
    let ro;
    try {
      ro = new ResizeObserver(() => {
        const prevStep = stepWRef.current;
        recalcWidths();
        // si cambió mucho el ancho, resetea la posición para evitar saltos
        if (Math.abs(stepWRef.current - prevStep) > 0.5) {
          const track = trackRef.current;
          if (track) {
            cancelAnimationFrame(rafRef.current);
            xRef.current = 0;
            track.style.transition = "none";
            track.style.transform = "translate3d(0px,0,0)";
            // reflow para que la siguiente transición aplique
            // eslint-disable-next-line no-unused-expressions
            track.offsetHeight;
            startLoop(); // retomamos animación
          }
        }
      });
      if (containerRef.current) ro.observe(containerRef.current);
    } catch {
      // ResizeObserver no disponible
      window.addEventListener("resize", recalcWidths);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", recalcWidths);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerView, minItemWidth, maxItemWidth, gapPx]);

  // ===== Animación continua por transform (derecha) =====
  const startLoop = () => {
    const track = trackRef.current;
    if (!track) return;
    let last = 0;

    track.style.willChange = "transform";

    const durSec = Math.max(0.2, stepDuration / 1000); // s por tarjeta

    const loop = (ts) => {
      if (!last) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;

      const W = stepWRef.current || (quantize(itemWidthPx + gapPx), stepWRef.current);
      if (!W) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const speed = W / durSec;  // px/s → recorre 1 tarjeta en stepDuration
      const dx = speed * dt;

      // acumulamos desplazamiento hacia la izquierda (contenido se mueve a la izq.)
      xRef.current = xRef.current - dx;

      // cuando superamos 1 tarjeta, rotamos y compensamos en el MISMO frame
      while (xRef.current <= -W) {
        xRef.current += W;
        flushSync(() => {
          right(); // o left() si quieres al revés
        });
      }

      track.style.transform = `translate3d(${quantize(xRef.current)}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    startLoop();
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [right, stepDuration]);

  // ===== Controles manuales (paso a paso) opcionales =====
  const stepRight = () => {
    const track = trackRef.current;
    const W = stepWRef.current;
    if (!track || !W) return;

    track.style.transition = `transform ${Math.max(120, stepDuration)}ms cubic-bezier(.25,.1,.25,1)`;
    track.style.transform = `translate3d(${quantize(xRef.current - W)}px, 0, 0)`;
    const onEnd = () => {
      track.removeEventListener("transitionend", onEnd);
      flushSync(() => right());
      xRef.current = 0;
      track.style.transition = "none";
      track.style.transform = `translate3d(0px,0,0)`;
      // eslint-disable-next-line no-unused-expressions
      track.offsetHeight;
    };
    track.addEventListener("transitionend", onEnd, { once: true });
  };

  const stepLeft = () => {
    const track = trackRef.current;
    const W = stepWRef.current;
    if (!track || !W) return;

    track.style.transition = `transform ${Math.max(120, stepDuration)}ms cubic-bezier(.25,.1,.25,1)`;
    track.style.transform = `translate3d(${quantize(xRef.current + W)}px, 0, 0)`;
    const onEnd = () => {
      track.removeEventListener("transitionend", onEnd);
      flushSync(() => left());
      xRef.current = 0;
      track.style.transition = "none";
      track.style.transform = `translate3d(0px,0,0)`;
      // eslint-disable-next-line no-unused-expressions
      track.offsetHeight;
    };
    track.addEventListener("transitionend", onEnd, { once: true });
  };

  const hardReset = () => {
    const track = trackRef.current;
    if (!track) return;
    cancelAnimationFrame(rafRef.current);
    track.style.transition = "none";
    xRef.current = 0;
    track.style.transform = `translate3d(0px,0,0)`;
    // eslint-disable-next-line no-unused-expressions
    track.offsetHeight;
    reset();
    startLoop();
  };

  // ===== estilos de contenedor y tarjetas con foco en legibilidad =====
  const baseCarrousel = {
    style: {
      border: "1px solid #ddd",
      overflow: "scroll",
      padding: 8,

      background: "#fafafa",
    },
    portrait: { width: 40, y: 50, x: 10 },
    landscape: {},
  };

  const controlBar = {
    style: {
      border: "1px solid #ddd",
      display: "flex",
      gap: 8,
      padding: 8,
      background: "#fff",
    },
    portrait: { width: 30, y: 30, x: 10 },
    landscape: {},
  };

  return (
    <>
      {/* Barra de controles manuales (opcional) */}
      <Card {...controlBar}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={stepLeft}>⬅️ Left</button>
          <button onClick={stepRight}>Right ➡️</button>
          <button onClick={hardReset}>Reset</button>
        </div>
      </Card>

      {/* Contenedor clip */}
      <Card {...baseCarrousel} ref={containerRef}>
        {/* Track animado por transform (NO usamos scrollLeft) */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: gapPx,
            transform: "translate3d(0px, 0, 0)",
          }}
        >
          {indexArray.map((idx, i) => (
            <div
              key={keys?.[i] ?? i}
              style={{
                width: `${itemWidthPx}px`,
                flex: `0 0 ${itemWidthPx}px`,
                // altura mínima opcional para dar aire
                minHeight: 120,
                // fondo/box para separar tarjetas
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 12,
                boxSizing: "border-box",
                // legibilidad del texto
                color: "#222",
                fontSize: 14,
                lineHeight: 1.35,
                letterSpacing: 0.2,
                textAlign: "left",
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "hidden",
                // rendimiento
                transform: "translateZ(0)",
                contain: "layout paint",
              }}
            >
              {/* Si el elemento interno tiene su propio layout, dale width:100% */}
              <div style={{ width: "100%" }}>{elements[idx]}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
