// src/component/effects/carousel/CarouselDefault.jsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import Card from "../../Card";

const DEFAULT_PORTRAIT_BASE = { width: 10, height: 10, anchor: "middle" };
const DEFAULT_LANDSCAPE_BASE = { width: 10, height: 10, anchor: "middle" };

// Helpers
const quantize = (n) => {
  const px = 1 / ((typeof window !== "undefined" && window.devicePixelRatio) || 1);
  return Math.round(n / px) * px;
};
const getInnerHeightPx = (el) => {
  if (!el) return 0;
  const cs = getComputedStyle(el);
  const pt = parseFloat(cs.paddingTop) || 0;
  const pb = parseFloat(cs.paddingBottom) || 0;
  return Math.max(0, Math.floor(el.clientHeight - pt - pb));
};
const getInnerWidthPx = (el) => {
  if (!el) return 0;
  const cs = getComputedStyle(el);
  const pl = parseFloat(cs.paddingLeft) || 0;
  const pr = parseFloat(cs.paddingRight) || 0;
  return Math.max(0, Math.floor(el.clientWidth - pl - pr));
};

// Dirección → eje + signo
function resolveAxisAndDir(dirStr) {
  const d = (dirStr || "").toLowerCase();
  if (d === "left")   return { axis: "h", sign: -1 };
  if (d === "right")  return { axis: "h", sign: +1 };
  if (d === "top")    return { axis: "v", sign: -1 };
  if (d === "bottom") return { axis: "v", sign: +1 };
  return { axis: "h", sign: d === "left" ? -1 : +1 };
}

/** Fuerza el ajuste de cualquier <img> descendiente del slot */
function forceFitDescendantImg(slotEl, axis, safeW, safeH) {
  if (!slotEl) return;
  const img = slotEl.querySelector("img");
  if (!img) return;

  // Asegurar carga “rápida”
  try { img.loading = "eager"; } catch {}
  try { img.decoding = "async"; } catch {}

  // Ajuste de tamaño por eje
  if (axis === "h") {
    // Alto fijo, ancho auto (contain)
    img.style.height = `${safeH}px`;
    img.style.maxHeight = `${safeH}px`;
    img.style.width = "auto";
    img.style.maxWidth = "none";
  } else {
    // Ancho fijo, alto auto (contain)
    img.style.width = `${safeW}px`;
    img.style.maxWidth = `${safeW}px`;
    img.style.height = "auto";
    img.style.maxHeight = "none";
  }

  // Otras seguridades
  img.style.objectFit = "contain";
  img.style.display = "block";
  img.style.boxSizing = "border-box";
}

/**
 * Carrusel infinito que acepta <img> directos y componentes que renderizan <img>
 * (por ejemplo, <RandomImg />)
 */
export default function CarouselDefault(props) {
  const {
    elements = [],
    gapPx = 16,
    stepDuration = 1200, // ms
    portrait = DEFAULT_PORTRAIT_BASE,
    landscape = DEFAULT_LANDSCAPE_BASE,
    initialDirection = "right",
    direction, // "left" | "right" | "top" | "bottom"
  } = props;

  // compat por si vino con typo "sptepDuration"
  const effectiveStepDuration = props.sptepDuration ?? stepDuration;

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(null);
  const isPausedRef = useRef(false);

  // Medidas visibles
  const [cardInnerH, setCardInnerH] = useState(0); // alto para horizontal
  const [cardInnerW, setCardInnerW] = useState(0); // ancho para vertical
  const [halfLenPx, setHalfLenPx] = useState(0);   // longitud de UNA copia del track
  const [ratios, setRatios] = useState([]);        // aspect ratio por item (w/h)

  // Eje y signo según dirección
  const { axis, sign } = resolveAxisAndDir(direction || initialDirection);

  // Lista duplicada para marquee infinito
  const doubled = useMemo(() => {
    if (!elements.length) return [];
    return [...elements, ...elements];
  }, [elements]);

  // Medir contenedor
  const measureCard = () => {
    const el = containerRef.current;
    if (!el) return;
    setCardInnerH(getInnerHeightPx(el));
    setCardInnerW(getInnerWidthPx(el));
  };

  // Medir media pista (la mitad del duplicado)
  const measureHalfLen = () => {
    const track = trackRef.current;
    if (!track) return;
    const half = axis === "h"
      ? Math.floor(track.scrollWidth / 2)
      : Math.floor(track.scrollHeight / 2);
    setHalfLenPx(half);
  };

  // Montaje + resize (debounced)
  useEffect(() => {
    const reflow = () => {
      measureCard();
      setTimeout(measureHalfLen, 0);
    };

    reflow();
    let ro, t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(reflow, 120);
    };
    try {
      ro = new ResizeObserver(onResize);
      if (containerRef.current) ro.observe(containerRef.current);
    } catch {
      window.addEventListener("resize", onResize);
    }
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener?.("resize", onResize);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axis]);

  /** Medir ratios desde el DOM (sirve para componentes que internamente tienen <img>) */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !elements.length) { setRatios([]); return; }

    // Solo la primera mitad (sin duplicado)
    const imgs = Array.from(track.querySelectorAll("img")).slice(0, elements.length);
    if (imgs.length === 0) { setRatios(new Array(elements.length).fill(1)); return; }

    const next = new Array(elements.length).fill(1);
    let pending = imgs.length;

    imgs.forEach((img, i) => {
      const done = () => {
        const w = img.naturalWidth || 0;
        const h = img.naturalHeight || 0;
        next[i] = w > 0 && h > 0 ? w / h : 1;
        if (--pending === 0) setRatios(next);
      };
      if (img.complete) {
        done();
      } else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });
  }, [elements, axis]);

  // Re-medición de halfLen cuando cambien ratios o medidas
  useEffect(() => {
    const id = setTimeout(measureHalfLen, 0);
    return () => clearTimeout(id);
  }, [ratios, cardInnerH, cardInnerW, gapPx, elements, axis]);

  // Animación (horizontal/vertical) con pre-wrap
  useEffect(() => {
    let last = 0;
    let pos = 0; // desplazamiento x o y según eje
    const track = trackRef.current;
    if (!track) return;

    const durSec = Math.max(0.2, effectiveStepDuration / 1000);
    const baseSize = axis === "h" ? (cardInnerH || 200) : (cardInnerW || 200);
    const pxPerSec = Math.max(60, baseSize / durSec);

    const loop = (ts) => {
      if (isPausedRef.current) return;
      if (!last) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;

      pos += (pxPerSec * sign) * dt;

      const limit = halfLenPx;
      if (limit > 0) {
        const viewport = axis === "h"
          ? (containerRef.current ? containerRef.current.clientWidth : 0)
          : (containerRef.current ? containerRef.current.clientHeight : 0);
        const preWrap = Math.max(0, limit - viewport - gapPx);

        if (sign < 0) {
          if (pos <= -preWrap) pos += limit;
        } else {
          if (pos >= preWrap) pos -= limit;
        }
      }

      if (axis === "h") {
        track.style.transform = `translate3d(${quantize(pos)}px,0,0)`;
      } else {
        track.style.transform = `translate3d(0,${quantize(pos)}px,0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    startRef.current = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      last = 0;
      isPausedRef.current = false;
      rafRef.current = requestAnimationFrame(loop);
    };

    startRef.current();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [effectiveStepDuration, cardInnerH, cardInnerW, halfLenPx, gapPx, axis, sign]);

  // Hover
  const handleEnter = () => {
    isPausedRef.current = true;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };
  const handleLeave = () => {
    if (isPausedRef.current) {
      isPausedRef.current = false;
      startRef.current?.();
    }
  };

  // Render
  const safeH = cardInnerH || 200;
  const safeW = cardInnerW || 200;

  return (
    <Card
      style={{
        overflow: "hidden",
        padding: 8,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      portrait={portrait}
      landscape={landscape}
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexDirection: axis === "h" ? "row" : "column",
          alignItems: "stretch",
          gap: gapPx,
          transform: "translate3d(0,0,0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          height: axis === "h" ? `${safeH}px` : "auto",
          width: axis === "v" ? `${safeW}px` : "auto",
          whiteSpace: axis === "h" ? "nowrap" : "normal",
        }}
      >
        {doubled.map((el, i) => {
          const baseIdx = elements.length ? (i % elements.length) : 0;
          const ratio = ratios[baseIdx] || 1;
          const isImg = React.isValidElement(el) && el.type === "img";

          // Tamaños por eje:
          const itemW = axis === "h" ? Math.max(1, Math.round(safeH * ratio)) : safeW;
          const itemH = axis === "h" ? safeH : Math.max(1, Math.round(safeW / ratio));

          // ref de slot para forzar el ajuste del <img> descendiente
          const slotRef = (node) => {
            if (node) {
              // Post-layout: ajustar cualquier <img> hijo
              requestAnimationFrame(() => forceFitDescendantImg(node, axis, safeW, safeH));
            }
          };

          return (
            <div
              key={`slot-${i}`}
              data-slot-idx={baseIdx}
              ref={slotRef}
              style={{
                width: `${itemW}px`,
                height: `${itemH}px`,
                borderRadius: 10,
                padding: isImg ? 0 : 12,
                boxSizing: "border-box",
                overflow: "hidden",
                display: "grid",
                placeItems: "center",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                willChange: "transform",
                contain: "layout paint",
              }}
            >
              {/* Contenedor 100% para cualquier contenido */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  overflow: "hidden",
                }}
              >
                {isImg
                  ? React.cloneElement(el, {
                      style: {
                        ...(el.props.style || {}),
                        ...(axis === "h"
                          ? { height: `${safeH}px`, width: "auto", maxHeight: `${safeH}px` }
                          : { width: `${safeW}px`, height: "auto", maxWidth: `${safeW}px` }),
                        display: "block",
                        boxSizing: "border-box",
                        objectFit: "contain",
                      },
                      loading: "eager",
                      decoding: "async",
                    })
                  : el}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
