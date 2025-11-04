// src/component/Card.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useScale } from "../context/contextScale";
import getPositionWithAnchor from "../utils/getPositionsWithAnchor";
import { useElement } from "../context/ContextElement";
import { useProgresses } from "../hook/useProgresses";

const defaultPercent = {
  width: 10,
  height: 10,
  x: 0,
  y: 0,
  anchor: "left-top",
  fontSize: 10,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  opacity: 1,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  perspective: 800,
  hidden: false,
  blur: 0,
  backdropBlur: 0,
  // ⬇️ Default transform origin (puedes override en portrait/landscape)
  transformOrigin: "center center",
};

const Card = forwardRef(function Card(
  {
    backgroundImage = "none",
    portrait = defaultPercent,
    landscape = defaultPercent,
    controlsAnimate = "stop",
    repeat,
    onClick,
    onPointerDown,
    style,
    children,
    id,
    loop,
    setSecuenceFinish,
    className,
    onPointerUp,
    onPointerLeave,
    onPointerCancel,

    // Press básicos
    onPressStart,
    onPressEndInside,
    onPressEndOutside,
    onPressStartLeave,

    // Press global
    onPressMoveEnter,
    onPressMoveLeave,

    onStepChange,

    // Drag para mover carta
    draggable = false,
    dragAxis = "both",            // "both" | "x" | "y"
    onPressDragStart,             // ({..., status:"start"})
    onPressDrag,                  // ({..., status:"start"|"move"|"leave"})
    onPressDragEnd,               // ({..., status:"leave"})
    dragDirThresholdPct = 1.5,    // % para decidir direcciones
  },
  ref
) {
  const { width: containerWidth, height: containerHeight } = useScale();

  const [isPortrait, setIsPortrait] = useState(
    typeof window !== "undefined"
      ? window.innerWidth <= window.innerHeight
      : true
  );

  const mode = isPortrait ? portrait : landscape;

  const baseForHook = useMemo(
    () => ({ ...defaultPercent, ...(isPortrait ? portrait : landscape) }),
    [isPortrait, portrait, landscape]
  );

  const portraitWithDefaults = useMemo(
    () => ({ ...defaultPercent, ...portrait }),
    [portrait]
  );
  const landscapeWithDefaults = useMemo(
    () => ({ ...defaultPercent, ...landscape }),
    [landscape]
  );

  const { sequenceValue, stepIndex, stepCount } = useProgresses({
    default: baseForHook,
    animate: mode?.animate,
    portrait: portraitWithDefaults,
    landscape: landscapeWithDefaults,
    action: controlsAnimate,
    repeat,
    loop,
    onSequenceFinish: () => setSecuenceFinish?.(true),
    onStepChange,
  });

  const myDiv = useRef(null);

  // Refs gesto
  const activePointerIdRef = useRef(null);
  const isPressingRef = useRef(false);
  const leftFiredRef = useRef(false);
  const downRectRef = useRef(null);
  const enteredDuringPressRef = useRef(false);
  const endFiredRef = useRef(false);

  // Drag
  const [isDragging, setIsDragging] = useState(false);
  const [dragDeltaPct, setDragDeltaPct] = useState({ x: 0, y: 0 });
  const [dragBasePct, setDragBasePct] = useState({ x: 0, y: 0 });
  const startXYRef = useRef({ x: 0, y: 0 });
  const startCardXYPercentRef = useRef({ x: 0, y: 0 });

  useImperativeHandle(ref, () => myDiv.current, []);
  const element = useElement();

  // Registro en contexto
  useEffect(() => {
    if (myDiv.current && id) {
      element.setElement((prev) => ({
        ...prev,
        [`div_${id}`]: {
          ref: myDiv.current,
          portrait,
          landscape,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Orientación
  useEffect(() => {
    const onResize = () => setIsPortrait(window.innerWidth <= window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Helpers de dirección
  const dirFromDelta = (dxPct, dyPct, thr) => {
    const horiz = Math.abs(dxPct) >= thr ? (dxPct > 0 ? "right" : "left") : null;
    const vert  = Math.abs(dyPct) >= thr ? (dyPct > 0 ? "down"  : "up")   : null;
    const labels = [];
    if (horiz) labels.push(horiz);
    if (vert)  labels.push(vert);
    const labelsEs = labels.map((d) =>
      d === "right" ? "derecha" : d === "left" ? "izquierda" : d === "up" ? "arriba" : "abajo"
    );
    return { horizontal: horiz, vertical: vert, labels, labelsEs };
  };

  const dirFromCenter = (xPct, yPct, thr) => {
    const dxC = xPct - 50;
    const dyC = yPct - 50;
    return dirFromDelta(dxC, dyC, thr);
  };

  const dominantFromCenter = (xPct, yPct, thr) => {
    const dxC = xPct - 50;
    const dyC = yPct - 50;
    const ax = Math.abs(dxC);
    const ay = Math.abs(dyC);
    if (ax < thr && ay < thr) return null;
    if (ax >= ay) return dxC > 0 ? "right" : "left";
    return dyC > 0 ? "down" : "up";
  };

  // Global listeners
  useEffect(() => {
    const handleGlobalPointerDown = (e) => {
      if (activePointerIdRef.current != null) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      activePointerIdRef.current = e.pointerId;
      isPressingRef.current = true;
      leftFiredRef.current = false;
      enteredDuringPressRef.current = false;
      downRectRef.current = null;
      endFiredRef.current = false;
    };

    const handleGlobalPointerMove = (e) => {
      if (!isPressingRef.current || activePointerIdRef.current !== e.pointerId) return;
      const rect = myDiv.current?.getBoundingClientRect();
      if (!rect) return;
      const TOL = 0;
      const inside =
        e.clientX >= rect.left - TOL &&
        e.clientX <= rect.right + TOL &&
        e.clientY >= rect.top - TOL &&
        e.clientY <= rect.bottom + TOL;

      if (inside && !enteredDuringPressRef.current) {
        enteredDuringPressRef.current = true;
        onPressMoveEnter?.(e);
      } else if (!inside && enteredDuringPressRef.current) {
        enteredDuringPressRef.current = false;
        onPressMoveLeave?.(e);
      }
    };

    const handleGlobalPointerUp = (e) => {
      if (activePointerIdRef.current !== e.pointerId) return;

      // end inside/outside
      const rect = myDiv.current?.getBoundingClientRect();
      if (rect) {
        const TOL = 0;
        const inside =
          e.clientX >= rect.left - TOL &&
          e.clientX <= rect.right + TOL &&
          e.clientY >= rect.top - TOL &&
          e.clientY <= rect.bottom + TOL;

        if (inside && !endFiredRef.current) {
          endFiredRef.current = true;
          onPressEndInside?.(e);
        } else if (!inside && enteredDuringPressRef.current && !endFiredRef.current) {
          endFiredRef.current = true;
          onPressEndOutside?.(e);
        }
      }

      // Drag end (commit) + status: "leave"
      if (draggable && isDragging) {
        const newBase = {
          x: dragBasePct.x + dragDeltaPct.x,
          y: dragBasePct.y + dragDeltaPct.y,
        };
        setDragBasePct(newBase);
        setDragDeltaPct({ x: 0, y: 0 });
        setIsDragging(false);

        const endX = currentXPercent(newBase);
        const endY = currentYPercent(newBase);
        const vFromStart = dirFromDelta(
          endX - startCardXYPercentRef.current.x,
          endY - startCardXYPercentRef.current.y,
          dragDirThresholdPct
        );
        const vFromCenter = dirFromCenter(endX, endY, dragDirThresholdPct);
        const domFromCenter = dominantFromCenter(endX, endY, dragDirThresholdPct);

        // ➕ Notifica también por onPressDrag con status:"leave"
        onPressDrag?.({
          status: "leave",
          xPercent: endX,
          yPercent: endY,
          deltaPercent: { ...dragDeltaPct },
          directionFromStart: vFromStart,
          directionFromCenter: vFromCenter,
          dominantFromCenter: domFromCenter,
          container: { width: containerWidth || 0, height: containerHeight || 0 },
          nativeEvent: e,
        });

        onPressDragEnd?.({
          status: "leave",
          xPercent: endX,
          yPercent: endY,
          deltaPercent: { ...dragDeltaPct },
          directionFromStart: vFromStart,
          directionFromCenter: vFromCenter,
          dominantFromCenter: domFromCenter,
          container: { width: containerWidth || 0, height: containerHeight || 0 },
          nativeEvent: e,
        });
      }

      // cleanup
      activePointerIdRef.current = null;
      isPressingRef.current = false;
      leftFiredRef.current = false;
      enteredDuringPressRef.current = false;
      downRectRef.current = null;
      endFiredRef.current = false;
    };

    window.addEventListener("pointerdown", handleGlobalPointerDown);
    window.addEventListener("pointermove", handleGlobalPointerMove);
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointerdown", handleGlobalPointerDown);
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, [
    onPressMoveEnter,
    onPressMoveLeave,
    onPressEndInside,
    onPressEndOutside,
    draggable,
    isDragging,
    dragBasePct.x,
    dragBasePct.y,
    dragDeltaPct.x,
    dragDeltaPct.y,
    containerWidth,
    containerHeight,
    dragDirThresholdPct,
  ]);

  // Anim base
  const sv = sequenceValue || {};
  const base = baseForHook;

  const baseScale  = base.scale  ?? defaultPercent.scale;
  const baseScaleX = base.scaleX ?? defaultPercent.scaleX;
  const baseScaleY = base.scaleY ?? defaultPercent.scaleY;

  const asDeltaOrAbsolute = (val, baseVal) => {
    if (val == null) return baseVal;
    return Math.abs(val) < 0.5 ? baseVal + val : val; // delta si |val| < .5
  };

  const normScale  = asDeltaOrAbsolute(sv.scale,  baseScale);
  const normScaleX = asDeltaOrAbsolute(sv.scaleX, baseScaleX);
  const normScaleY = asDeltaOrAbsolute(sv.scaleY, baseScaleY);

  const currentBase = {
    ...base,
    ...sv,
    scale:  normScale,
    scaleX: normScaleX,
    scaleY: normScaleY,
  };

  // Drag aplicado
  const dragOffset = {
    x: dragBasePct.x + dragDeltaPct.x,
    y: dragBasePct.y + dragDeltaPct.y,
  };

  const currentXPercent = (overrideBase = dragBasePct) =>
    currentBase.x + overrideBase.x + (isDragging ? dragDeltaPct.x : 0);
  const currentYPercent = (overrideBase = dragBasePct) =>
    currentBase.y + overrideBase.y + (isDragging ? dragDeltaPct.y : 0);

  // Layout
  const hasMeasures = Boolean(containerWidth && containerHeight);
  const safeW = containerWidth || 1;
  const safeH = containerHeight || 1;

  const widthPx = (currentBase.width / 100) * safeW;
  const heightPx = (currentBase.height / 100) * safeH;

  const fontSizePercent =
    typeof currentBase.fontSize === "number" ? currentBase.fontSize : defaultPercent.fontSize;
  const fontSizePx = (fontSizePercent / 100) * safeW;

  const effectiveX = currentBase.x + dragOffset.x;
  const effectiveY = currentBase.y + dragOffset.y;

  const { left, top } = getPositionWithAnchor(
    effectiveX,
    effectiveY,
    widthPx,
    heightPx,
    safeW,
    safeH,
    currentBase.anchor || "left-top"
  );

  const p  = currentBase.perspective ?? null;
  const rX = currentBase.rotateX ?? 0;
  const rY = currentBase.rotateY ?? 0;
  const rZ = currentBase.rotate  ?? 0;

  const transforms = [];
  if (p) transforms.push(`perspective(${p}px)`);
  transforms.push(`scale(${currentBase.scale})`);
  transforms.push(`scaleX(${currentBase.scaleX})`);
  transforms.push(`scaleY(${currentBase.scaleY})`);
  transforms.push(`rotateX(${rX}deg)`);
  transforms.push(`rotateY(${rY}deg)`);
  transforms.push(`rotate(${rZ}deg)`);

  const { filter: styleFilter, backdropFilter: styleBackdropFilter, ...restStyle } = style || {};
  const blurPxRaw = Number.isFinite(currentBase.blur) ? currentBase.blur : 0;
  const backdropBlurPxRaw = Number.isFinite(currentBase.backdropBlur) ? currentBase.backdropBlur : 0;
  const blurPx = Math.max(0, blurPxRaw);
  const backdropBlurPx = Math.max(0, backdropBlurPxRaw);

  const filterParts = [];
  if (blurPx) filterParts.push(`blur(${blurPx}px)`);
  if (styleFilter) filterParts.push(styleFilter);
  const mergedFilter = filterParts.length ? filterParts.join(" ") : undefined;

  const mergedBackdropFilter =
    backdropBlurPx
      ? `blur(${backdropBlurPx}px)${styleBackdropFilter ? ` ${styleBackdropFilter}` : ""}`
      : styleBackdropFilter;

  const hasBg = backgroundImage && backgroundImage !== "none";

  const cardStyle = {
    backgroundImage: hasBg ? `url(${backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    width: `${widthPx}px`,
    height: `${heightPx}px`,
    left: `${left}px`,
    top: `${top}px`,
    fontSize: `${fontSizePx}px`,
    display: currentBase.hidden ? "none" : "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transform: transforms.join(" "),
    opacity: currentBase.opacity,

    // ⬇️ Usa transformOrigin del modo activo (portrait/landscape) > style > default
    transformOrigin:
      currentBase.transformOrigin ??
      restStyle?.transformOrigin ??
      "center center",

    transformStyle: "preserve-3d",
    perspective: 800,
    backfaceVisibility: "visible",
    willChange: "transform, opacity, filter, backdrop-filter",
    filter: mergedFilter,
    backdropFilter: mergedBackdropFilter,

    touchAction: "none",
    WebkitUserSelect: "none",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",

    visibility: hasMeasures ? undefined : "hidden",

    ...restStyle,
  };

  const isPointInsideRect = (x, y, rect) =>
    x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

  // Handlers locales
  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    activePointerIdRef.current = e.pointerId;
    isPressingRef.current = true;
    leftFiredRef.current = false;
    enteredDuringPressRef.current = true;
    downRectRef.current = myDiv.current?.getBoundingClientRect() ?? null;
    endFiredRef.current = false;

    if (draggable) {
      setIsDragging(true);
      startXYRef.current = { x: e.clientX, y: e.clientY };
      startCardXYPercentRef.current = {
        x: currentBase.x + dragBasePct.x,
        y: currentBase.y + dragBasePct.y,
      };
      setDragDeltaPct({ x: 0, y: 0 });

      const startX = startCardXYPercentRef.current.x;
      const startY = startCardXYPercentRef.current.y;
      const vFromCenter = dirFromCenter(startX, startY, dragDirThresholdPct);
      const domFromCenter = dominantFromCenter(startX, startY, dragDirThresholdPct);

      // onPressDrag: status "start"
      onPressDrag?.({
        status: "start",
        xPercent: startX,
        yPercent: startY,
        deltaPercent: { x: 0, y: 0 },
        directionFromStart: { horizontal: null, vertical: null, labels: [], labelsEs: [] },
        directionFromCenter: vFromCenter,
        dominantFromCenter: domFromCenter,
        container: { width: containerWidth || 0, height: containerHeight || 0 },
        nativeEvent: e,
      });

      onPressDragStart?.({
        status: "start",
        xPercent: startX,
        yPercent: startY,
        directionFromStart: { horizontal: null, vertical: null, labels: [], labelsEs: [] },
        directionFromCenter: vFromCenter,
        dominantFromCenter: domFromCenter,
        container: { width: containerWidth || 0, height: containerHeight || 0 },
        nativeEvent: e,
      });
    }

    try { myDiv.current?.setPointerCapture?.(e.pointerId); } catch (_) {}

    onPressStart?.(e);
    onPointerDown?.(e);
  };

  const handlePointerMoveLocal = (e) => {
    if (!isPressingRef.current || activePointerIdRef.current !== e.pointerId) return;

    const rect = downRectRef.current || myDiv.current?.getBoundingClientRect();
    if (!rect) return;

    const TOL = 0;
    const inside =
      e.clientX >= rect.left - TOL &&
      e.clientX <= rect.right + TOL &&
      e.clientY >= rect.top - TOL &&
      e.clientY <= rect.bottom + TOL;

    if (!inside && !leftFiredRef.current) {
      leftFiredRef.current = true;
      onPressStartLeave?.(e);
      if (enteredDuringPressRef.current) {
        enteredDuringPressRef.current = false;
        onPressMoveLeave?.(e);
      }
    }

    if (draggable && isDragging) {
      const dxPx = e.clientX - startXYRef.current.x;
      const dyPx = e.clientY - startXYRef.current.y;

      let dxPct = (dxPx / (containerWidth || 1)) * 100;
      let dyPct = (dyPx / (containerHeight || 1)) * 100;

      if (dragAxis === "x") dyPct = 0;
      if (dragAxis === "y") dxPct = 0;

      setDragDeltaPct({ x: dxPct, y: dyPct });

      const curX = startCardXYPercentRef.current.x + dxPct;
      const curY = startCardXYPercentRef.current.y + dyPct;

      const vFromStart  = dirFromDelta(dxPct, dyPct, dragDirThresholdPct);
      const vFromCenter = dirFromCenter(curX, curY, dragDirThresholdPct);
      const domFromCenter = dominantFromCenter(curX, curY, dragDirThresholdPct);

      onPressDrag?.({
        status: "move",
        xPercent: curX,
        yPercent: curY,
        deltaPercent: { x: dxPct, y: dyPct },
        directionFromStart: vFromStart,
        directionFromCenter: vFromCenter,
        dominantFromCenter: domFromCenter,
        container: { width: containerWidth || 0, height: containerHeight || 0 },
        nativeEvent: e,
      });
    }
  };

  const handlePointerUp = (e) => {
    const samePointer = activePointerIdRef.current === e.pointerId;

    onPointerUp?.(e);

    if (!endFiredRef.current && samePointer && isPressingRef.current && myDiv.current) {
      const rect = myDiv.current.getBoundingClientRect();
      const inside = isPointInsideRect(e.clientX, e.clientY, rect);
      if (inside) {
        endFiredRef.current = true;
        onPressEndInside?.(e);
      } else {
        endFiredRef.current = true;
        onPressEndOutside?.(e);
      }
    }

    if (draggable && isDragging) {
      const newBase = {
        x: dragBasePct.x + dragDeltaPct.x,
        y: dragBasePct.y + dragDeltaPct.y,
      };
      setDragBasePct(newBase);
      setDragDeltaPct({ x: 0, y: 0 });
      setIsDragging(false);

      const endX = currentXPercent(newBase);
      const endY = currentYPercent(newBase);
      const vFromStart  = dirFromDelta(
        endX - startCardXYPercentRef.current.x,
        endY - startCardXYPercentRef.current.y,
        dragDirThresholdPct
      );
      const vFromCenter = dirFromCenter(endX, endY, dragDirThresholdPct);
      const domFromCenter = dominantFromCenter(endX, endY, dragDirThresholdPct);

      // onPressDrag: status "leave"
      onPressDrag?.({
        status: "leave",
        xPercent: endX,
        yPercent: endY,
        deltaPercent: { ...dragDeltaPct },
        directionFromStart: vFromStart,
        directionFromCenter: vFromCenter,
        dominantFromCenter: domFromCenter,
        container: { width: containerWidth || 0, height: containerHeight || 0 },
        nativeEvent: e,
      });

      onPressDragEnd?.({
        status: "leave",
        xPercent: endX,
        yPercent: endY,
        deltaPercent: { ...dragDeltaPct },
        directionFromStart: vFromStart,
        directionFromCenter: vFromCenter,
        dominantFromCenter: domFromCenter,
        container: { width: containerWidth || 0, height: containerHeight || 0 },
        nativeEvent: e,
      });
    }

    try { myDiv.current?.releasePointerCapture?.(e.pointerId); } catch (_) {}
    activePointerIdRef.current = null;
    isPressingRef.current = false;
    leftFiredRef.current = false;
    enteredDuringPressRef.current = false;
    downRectRef.current = null;
    endFiredRef.current = false;
  };

  const handlePointerCancel = (e) => {
    onPointerCancel?.(e);

    if (draggable && isDragging) {
      const newBase = {
        x: dragBasePct.x + dragDeltaPct.x,
        y: dragBasePct.y + dragDeltaPct.y,
      };
      setDragBasePct(newBase);
      setDragDeltaPct({ x: 0, y: 0 });
      setIsDragging(false);

      const endX = currentXPercent(newBase);
      const endY = currentYPercent(newBase);
      const vFromStart  = dirFromDelta(
        endX - startCardXYPercentRef.current.x,
        endY - startCardXYPercentRef.current.y,
        dragDirThresholdPct
      );
      const vFromCenter = dirFromCenter(endX, endY, dragDirThresholdPct);
      const domFromCenter = dominantFromCenter(endX, endY, dragDirThresholdPct);

      // onPressDrag: status "leave"
      onPressDrag?.({
        status: "leave",
        xPercent: endX,
        yPercent: endY,
        deltaPercent: { ...dragDeltaPct },
        directionFromStart: vFromStart,
        directionFromCenter: vFromCenter,
        dominantFromCenter: domFromCenter,
        container: { width: containerWidth || 0, height: containerHeight || 0 },
        nativeEvent: e,
      });

      onPressDragEnd?.({
        status: "leave",
        xPercent: endX,
        yPercent: endY,
        deltaPercent: { ...dragDeltaPct },
        directionFromStart: vFromStart,
        directionFromCenter: vFromCenter,
        dominantFromCenter: domFromCenter,
        container: { width: containerWidth || 0, height: containerHeight || 0 },
        nativeEvent: e,
      });
    }

    if (!endFiredRef.current && isPressingRef.current && activePointerIdRef.current === e.pointerId) {
      endFiredRef.current = true;
      onPressEndOutside?.(e);
    }

    try { myDiv.current?.releasePointerCapture?.(e.pointerId); } catch (_) {}
    activePointerIdRef.current = null;
    isPressingRef.current = false;
    leftFiredRef.current = false;
    enteredDuringPressRef.current = false;
    downRectRef.current = null;
    endFiredRef.current = false;
  };

  return (
    <span
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMoveLocal}
      onPointerUp={handlePointerUp}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      onPointerCancel={handlePointerCancel}
      id={id}
      ref={myDiv}
      style={cardStyle}
      className={className}
      data-anim-step={stepIndex}
      data-anim-steps={stepCount}
    >
      {children}
    </span>
  );
});

export default Card;
