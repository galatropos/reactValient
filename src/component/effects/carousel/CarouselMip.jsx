// CarouselMip.jsx
import React from "react";
import "./carouselMip/styles.css";
import { VirtualizedPage } from "./carouselMip/VirtualizedPage";

// índice lógico cíclico
const wrap = (i, n) => ((i % n) + n) % n;

/**
 * Carousel por elementos que llena el 100% del contenedor padre.
 *
 * Props principales:
 * - slides: React.ReactNode[]                         (REQUIRED)
 * - initialIndex?: number                             (default 0)
 * - onIndexChange?: (logicalIdx:number)=>void         (0..N-1)
 *
 * Layout / escala:
 * - sizeMode?: "layout" | "visual"                    (default "layout")
 * - slideWidthPct?: number                            (default 1)
 * - gapPx?: number                                    (default 0)
 * - centerScale?: number                              (default 1)
 * - compensateGap?: boolean                           (default false)
 * - sideOuterGapPx?: number                           (default 0)
 * - scaleMode?: "center" | "sides"                    (default "center")
 * - sidesScale?: number                               (default 0.9)
 *
 * Nudge (empujoncito):
 * - nudgeOnStart?: boolean                            (default false)
 * - nudgePx?: number                                  (default 28 en VirtualizedPage)
 * - nudgeDelayMs?: number                             (default 400)
 * - nudgeDuration?: number                            (default 0.3)
 * - nudgePauseMs?: number                             (default 1400)
 * - stopNudgeOnInteract?: boolean                     (default true)
 * - resumeNudgeAfterMs?: number                       (default 30000)
 * - nudgeMode?: "both" | "left" | "right" | "pattern" (default "both")
 * - nudgeLeftPx?: number
 * - nudgeRightPx?: number
 * - nudgePattern?: Array<{ dx:number, duration?:number, pause?:number }>
 *
 * Tap:
 * - tapUrl?: string
 * - onTapSlide?: (rawIndex:number)=>void
 *
 * Otros:
 * - wrapSlide?: (node:ReactNode, logicalIndex:number)=>ReactNode
 * - style?: React.CSSProperties
 */
export default function Carousel({
  slides = [],

  // tracking
  initialIndex = 0,
  onIndexChange,

  // layout / escala
  sizeMode = "layout",
  slideWidthPct = 1,
  gapPx = 0,
  centerScale = 1,
  compensateGap = false,
  sideOuterGapPx = 0,
  scaleMode = "center",
  sidesScale = 0.9,

  // nudge
  nudgeOnStart = false,
  nudgePx,
  nudgeDelayMs,
  nudgeDuration,
  nudgePauseMs,
  stopNudgeOnInteract,
  resumeNudgeAfterMs,
  nudgeMode = "both",
  nudgeLeftPx,
  nudgeRightPx,
  nudgePattern,

  // tap
  tapUrl,
  onTapSlide,

  // otros
  wrapSlide,
  style,
}) {
  const count = Array.isArray(slides) ? slides.length : 0;
  if (!count) return null;

  // puente: VirtualizedPage emite índice RAW (… -2,-1,0,1,2 …),
  // aquí lo convertimos a lógico 0..N-1
  const handleIndexChangeRaw = (raw) => {
    const logical = wrap(raw, count);
    onIndexChange?.(logical);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <VirtualizedPage
        // layout / escala
        sizeMode={sizeMode}
        slideWidthPct={slideWidthPct}
        gapPx={gapPx}
        centerScale={centerScale}
        compensateGap={compensateGap}
        sideOuterGapPx={sideOuterGapPx}
        scaleMode={scaleMode}
        sidesScale={sidesScale}

        // nudge (dirección/patrón incluidos)
        nudgeOnStart={nudgeOnStart}
        nudgePx={nudgePx}
        nudgeDelayMs={nudgeDelayMs}
        nudgeDuration={nudgeDuration}
        nudgePauseMs={nudgePauseMs}
        stopNudgeOnInteract={stopNudgeOnInteract}
        resumeNudgeAfterMs={resumeNudgeAfterMs}
        nudgeMode={nudgeMode}
        nudgeLeftPx={nudgeLeftPx}
        nudgeRightPx={nudgeRightPx}
        nudgePattern={nudgePattern}

        // tap
        tapUrl={tapUrl}
        onTapSlide={onTapSlide}

        // tracking
        initialIndex={initialIndex}
        onIndexChangeRaw={handleIndexChangeRaw}
      >
        {({ index }) => {
          const i = wrap(index, count);
          const node = slides[i];
          const filled = <div style={{ width: "100%", height: "100%" }}>{node}</div>;
          return wrapSlide ? wrapSlide(filled, i) : filled;
        }}
      </VirtualizedPage>
    </div>
  );
}