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
  rotate: 0,    // Z
  rotateX: 0,   // 3D X
  rotateY: 0,   // 3D Y
  opacity: 1,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  perspective: 800, // px
  hidden: false,
  blur: 0,
  backdropBlur: 0,
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

    // Eventos de “press”
    onPressStart,
    onPressEndInside,
    onPressEndOutside,
    onPressStartLeave, // sale del card mientras sigue presionando (si inició dentro)

    // Detección global durante un press iniciado en cualquier parte
    onPressMoveEnter, // entra al rect del card sin soltar
    onPressMoveLeave, // sale del rect del card sin soltar

    onStepChange,
  },
  ref
) {
  const { width: containerWidth, height: containerHeight } = useScale();

  const [isPortrait, setIsPortrait] = useState(
    typeof window !== "undefined"
      ? window.innerWidth <= window.innerHeight
      : true
  );

  // 🔑 Memo: evita crear objetos nuevos en cada render
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

  // Refs de gesto
  const activePointerIdRef = useRef(null);
  const isPressingRef = useRef(false);
  const leftFiredRef = useRef(false);           // evita múltiples onPressStartLeave
  const downRectRef = useRef(null);             // rect al iniciar press (si inicia dentro)
  const enteredDuringPressRef = useRef(false);  // estado "estoy dentro" durante press global
  const endFiredRef = useRef(false);            // evita doble onPressEnd* (local + global)

  useImperativeHandle(ref, () => myDiv.current, []);

  const element = useElement();

  // Registro en contexto por id
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

  // Cambios de orientación
  useEffect(() => {
    const onResize = () => {
      setIsPortrait(window.innerWidth <= window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // --- Listeners GLOBALes (detectan entrar/salir y suelta aunque el press comience fuera) ---
  useEffect(() => {
    const handleGlobalPointerDown = (e) => {
      // Si ya seguimos un puntero, ignora otros
      if (activePointerIdRef.current != null) return;
      // Solo el botón primario en mouse
      if (e.pointerType === "mouse" && e.button !== 0) return;

      activePointerIdRef.current = e.pointerId;
      isPressingRef.current = true;
      leftFiredRef.current = false;
      enteredDuringPressRef.current = false; // iniciamos "fuera" por defecto
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

      // transición fuera -> dentro (primera vez)
      if (inside && !enteredDuringPressRef.current) {
        enteredDuringPressRef.current = true;
        onPressMoveEnter?.(e);
      }
      // transición dentro -> fuera
      else if (!inside && enteredDuringPressRef.current) {
        enteredDuringPressRef.current = false;
        onPressMoveLeave?.(e);
      }
    };

    const handleGlobalPointerUp = (e) => {
      if (activePointerIdRef.current !== e.pointerId) return;

      // Antes de limpiar refs, decide si terminó dentro o fuera
      const rect = myDiv.current?.getBoundingClientRect();
      if (rect) {
        const TOL = 0;
        const inside =
          e.clientX >= rect.left - TOL &&
          e.clientX <= rect.right + TOL &&
          e.clientY >= rect.top - TOL &&
          e.clientY <= rect.bottom + TOL;

        // ✅ Si el press comenzó fuera pero suelta DENTRO de este Card => onPressEndInside
        if (inside && !endFiredRef.current) {
          endFiredRef.current = true;
          onPressEndInside?.(e);
        }
        // Si en algún momento estuvo dentro y suelta FUERA => onPressEndOutside
        else if (!inside && enteredDuringPressRef.current && !endFiredRef.current) {
          endFiredRef.current = true;
          onPressEndOutside?.(e);
        }
      }

      // Limpieza global
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
  }, [onPressMoveEnter, onPressMoveLeave, onPressEndInside, onPressEndOutside]);

  // --- Normalización de escalas (delta vs absoluto) ---
  const sv = sequenceValue || {};
  const base = baseForHook;

  const baseScale  = base.scale  ?? defaultPercent.scale;
  const baseScaleX = base.scaleX ?? defaultPercent.scaleX;
  const baseScaleY = base.scaleY ?? defaultPercent.scaleY;

  const asDeltaOrAbsolute = (val, baseVal) => {
    if (val == null) return baseVal;
    return Math.abs(val) < 0.5 ? baseVal + val : val;
  };

  const normScale  = asDeltaOrAbsolute(sv.scale,  baseScale);
  const normScaleX = asDeltaOrAbsolute(sv.scaleX, baseScaleX);
  const normScaleY = asDeltaOrAbsolute(sv.scaleY, baseScaleY);

  // Mezcla final
  const current = {
    ...base,
    ...sv,
    scale:  normScale,
    scaleX: normScaleX,
    scaleY: normScaleY,
  };

  // No cortamos hooks: ocultamos hasta tener medidas
  const hasMeasures = Boolean(containerWidth && containerHeight);
  const safeW = containerWidth || 1;
  const safeH = containerHeight || 1;

  const widthPx = (current.width / 100) * safeW;
  const heightPx = (current.height / 100) * safeH;

  const fontSizePercent =
    typeof current.fontSize === "number" ? current.fontSize : defaultPercent.fontSize;
  const fontSizePx = (fontSizePercent / 100) * safeW;

  const { left, top } = getPositionWithAnchor(
    current.x,
    current.y,
    widthPx,
    heightPx,
    safeW,
    safeH,
    current.anchor || "left-top"
  );

  const p    = current.perspective ?? null;
  const rX   = current.rotateX ?? 0;
  const rY   = current.rotateY ?? 0;
  const rZ   = current.rotate  ?? 0;

  const transforms = [];
  if (p) transforms.push(`perspective(${p}px)`);
  transforms.push(`scale(${current.scale})`);
  transforms.push(`scaleX(${current.scaleX})`);
  transforms.push(`scaleY(${current.scaleY})`);
  transforms.push(`rotateX(${rX}deg)`);
  transforms.push(`rotateY(${rY}deg)`);
  transforms.push(`rotate(${rZ}deg)`);

  const { filter: styleFilter, backdropFilter: styleBackdropFilter, ...restStyle } = style || {};
  const blurPxRaw = Number.isFinite(current.blur) ? current.blur : 0;
  const backdropBlurPxRaw = Number.isFinite(current.backdropBlur) ? current.backdropBlur : 0;
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
    display: current.hidden ? "none" : "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transform: transforms.join(" "),
    opacity: current.opacity,
    transformOrigin: restStyle?.transformOrigin || "center center",
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

  // --- Handlers locales (cuando el press inicia dentro del card) ---
  const handlePointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    activePointerIdRef.current = e.pointerId;
    isPressingRef.current = true;
    leftFiredRef.current = false;
    enteredDuringPressRef.current = true; // si inició dentro, ya estamos "dentro"
    downRectRef.current = myDiv.current?.getBoundingClientRect() ?? null;
    endFiredRef.current = false;

    try {
      myDiv.current?.setPointerCapture?.(e.pointerId);
    } catch (_) {}

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

    // Si inició dentro y sale por primera vez
    if (!inside && !leftFiredRef.current) {
      leftFiredRef.current = true;
      onPressStartLeave?.(e);
      // coherencia con callbacks globales
      if (enteredDuringPressRef.current) {
        enteredDuringPressRef.current = false;
        onPressMoveLeave?.(e);
      }
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

    try {
      myDiv.current?.releasePointerCapture?.(e.pointerId);
    } catch (_) {}
    activePointerIdRef.current = null;
    isPressingRef.current = false;
    leftFiredRef.current = false;
    enteredDuringPressRef.current = false;
    downRectRef.current = null;
    endFiredRef.current = false;
  };

  const handlePointerCancel = (e) => {
    onPointerCancel?.(e);

    if (!endFiredRef.current && isPressingRef.current && activePointerIdRef.current === e.pointerId) {
      endFiredRef.current = true;
      onPressEndOutside?.(e);
    }

    try {
      myDiv.current?.releasePointerCapture?.(e.pointerId);
    } catch (_) {}
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
