// src/component/Card.jsx
import React, { useState, useEffect, useRef } from "react";
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
  fontSize: 10, // default
  rotate: 0,
  opacity:1,
  scale:1,
  hidden:false
};

export default function Card({
  portrait = defaultPercent,
  landscape = defaultPercent,
  controlsAnimate = "stop",
  repeat ,
  onClick,
  style,
  children,
  id,
  loop,
  setSecuenceFinish,
  className

}) {

  const { width: containerWidth, height: containerHeight } = useScale();// para conseguir el ancho y alto del container

  const [isPortrait, setIsPortrait] = useState(window.innerWidth <= window.innerHeight); // para saber si es portrait o landscape
  const { sequenceValue } = useProgresses({ // hook de animacion
    default: isPortrait ? portrait : landscape,
    animate: isPortrait ? portrait.animate : landscape.animate,
    portrait,
    landscape,
    action: controlsAnimate, // "play" | "pause" | "stop" control externo
    repeat,
    loop,
    onSequenceFinish:()=>setSecuenceFinish(true),

  });

  const myDiv = useRef();

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
  const current = {
    ...current2,
    ...sequenceValue
  };

  const widthPx = (current.width / 100) * containerWidth;
  const heightPx = (current.height / 100) * containerHeight;

  // Calcular fontSize escalado
  const fontSizePercent =
    typeof current.fontSize === "number"
      ? current.fontSize
      : defaultPercent.fontSize;
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
    transform: `rotate(${current.rotate||0}deg) scale(${current.scale||1})`,
    opacity: current.opacity,

    transformOrigin: "0 50%", // clave para rotar desde inicio
    ...style,
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

    >
      {children}
    </span>
  );
}
