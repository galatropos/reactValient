// src/component/Card.jsx
import React, {
  useState,
  useEffect,
  useRef,
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
  blur: 0,          // px (filter)
  backdropBlur: 0,  // px (backdrop-filter)
  transformOrigin: "center center",
};

const Card = forwardRef(function Card(
  {
    portrait = defaultPercent,
    landscape = defaultPercent,
    controlsAnimate = "stop", // "play" | "pause" | "stop"
    repeat,
    onClick,
    style,
    children,
    id,
    loop,
    setSecuenceFinish,
    className,

    // ✅ NUEVO: saber en qué paso del animate estamos
    onStepChange, // (i) => void
  },
  ref
) {
  const { width: containerWidth, height: containerHeight } = useScale();

  const [isPortrait, setIsPortrait] = useState(
    typeof window !== "undefined"
      ? window.innerWidth <= window.innerHeight
      : true
  );

  const { sequenceValue, stepIndex, stepCount } = useProgresses({
    default: isPortrait ? portrait : landscape,
    animate: isPortrait ? portrait.animate : landscape.animate,
    portrait,
    landscape,
    action: controlsAnimate,
    repeat,
    loop,
    onSequenceFinish: () => setSecuenceFinish?.(true),

    // Pasar callback: sabrás exactamente el índice del array animate
    onStepChange, // ✅
  });

  const myDiv = useRef(null);

  // Exponer el nodo DOM raíz al padre (y API mínima)
  useImperativeHandle(ref, () => myDiv.current, []);

  const element = useElement();
  useEffect(() => {
    if (myDiv.current && id) {
      element.setElement((element) => ({
        ...element,
        [`div_${id}`]: {
          ref: myDiv.current,
          portrait,
          landscape,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myDiv.current]);

  useEffect(() => {
    const onResize = () => {
      setIsPortrait(window.innerWidth <= window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const current2 = isPortrait ? portrait : landscape;
  const current = { ...current2, ...sequenceValue };

  const widthPx = (current.width / 100) * containerWidth;
  const heightPx = (current.height / 100) * containerHeight;

  // fontSize basado en % del ancho del contenedor
  const fontSizePercent =
    typeof current.fontSize === "number" ? current.fontSize : defaultPercent.fontSize;
  const fontSizePx = (fontSizePercent / 100) * containerWidth;

  const { left, top } = getPositionWithAnchor(
    current.x,
    current.y,
    widthPx,
    heightPx,
    containerWidth,
    containerHeight,
    current.anchor || "left-top"
  );

  // Transform correcto
  const p    = current.perspective ?? null; // px
  const sAll = current.scale ?? 1;
  const sX   = current.scaleX ?? 1;
  const sY   = current.scaleY ?? 1;
  const rX   = current.rotateX ?? 0;
  const rY   = current.rotateY ?? 0;
  const rZ   = current.rotate  ?? 0;

  const transforms = [];
  if (p) transforms.push(`perspective(${p}px)`);
  transforms.push(`scale(${sAll})`);
  transforms.push(`scaleX(${sX})`);
  transforms.push(`scaleY(${sY})`);
  transforms.push(`rotateX(${rX}deg)`);
  transforms.push(`rotateY(${rY}deg)`);
  transforms.push(`rotate(${rZ}deg)`);

  /** Fusión segura de filters */
  const { filter: styleFilter, backdropFilter: styleBackdropFilter, ...restStyle } = style || {};
  const blurPx = Number.isFinite(current.blur) ? current.blur : 0;
  const backdropBlurPx = Number.isFinite(current.backdropBlur) ? current.backdropBlur : 0;

  const filterParts = [];
  if (blurPx) filterParts.push(`blur(${blurPx}px)`);
  if (styleFilter) filterParts.push(styleFilter);
  const mergedFilter = filterParts.length ? filterParts.join(" ") : undefined;

  const mergedBackdropFilter =
    backdropBlurPx
      ? `blur(${backdropBlurPx}px)${styleBackdropFilter ? ` ${styleBackdropFilter}` : ""}`
      : styleBackdropFilter;

  const cardStyle = {
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
    transformOrigin: restStyle?.transformOrigin || "50% 50%",
    transformStyle: "preserve-3d",
    perspective: 800,
    backfaceVisibility: "visible",
    willChange: "transform, opacity, filter, backdrop-filter",
    filter: mergedFilter,
    backdropFilter: mergedBackdropFilter,
    ...restStyle,
  };

  return (
    <span
      onClick={onClick}
      id={id}
      ref={myDiv}
      style={cardStyle}
      portrait={portrait}
      landscape={landscape}
      className={className}
      // ✅ para depurar rápidamente en el DOM:
      data-anim-step={stepIndex}
      data-anim-steps={stepCount}
    >
      {children}
    </span>
  );
});

export default Card;
