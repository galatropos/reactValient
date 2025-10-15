// src/component/effects/stream/StreamOpacityX.jsx
import React, { useMemo, useState, useCallback } from "react";
import Card from "../../Card";
import useOrientation from "../../../hook/useOrientation";


const StreamOpacityX = ({
  portrait,
  landscape,
  style,
  elements = [],
  invert=false,
    cycleDelay=300 , 
    durationIn=500,
    durationOut=400,               
    hold=5500,    
}) => {
  const [index, setIndex] = useState(0);
const orientation = useOrientation();
 const  x=orientation === "portrait" ? 5 : 2.5;

  const styleDefault = useMemo(
    () => ({
      ...style,
      overflow: "hidden",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    }),
    [style]
  );

  // ▶️ Secuencia “sensor”
  // Cambiamos el elemento al entrar al paso 1
  const animateMoveObject1 = [
    [{x: -x*2 }, 0],                // 0 (instantáneo)
    [{ x: x }, durationIn/2],                // 0 (instantáneo)
    [{ x: x, opacity:1 }, durationIn/2],                // 0 (instantáneo)
    [{}, hold],             // 2
    [{ x: x }, durationOut/2],                // 0 (instantáneo)
    [{ x: x, opacity:-1 }, durationOut/2],                // 0 (instantáneo)
    [{}, cycleDelay],             // 2
      
  ];
  const animateMoveObject2 = [
    [{x: x*2 }, 0],                // 0 (instantáneo)
    [{ x: -x }, durationIn/2],                // 0 (instantáneo)
    [{ x: -x, opacity:1 }, durationIn/2],                // 0 (instantáneo)
    [{}, hold],             // 2
    [{ x: -x }, durationOut/2],                // 0 (instantáneo)
    [{ x: -x, opacity:-1 }, durationOut/2],                // 0 (instantáneo)
    [{}, cycleDelay],           // 2
      
  ];

  const animateMoveObject = invert? animateMoveObject2:animateMoveObject1;







  // 🔔 Avanza el índice cuando Card entra al paso 1
  const handleStepChange = useCallback(
    (stepIdx) => {
      if (stepIdx === 6 && elements.length > 0) {
        setIndex((i) => (i + 1) % elements.length);
      }
    },
    [elements.length]
  );

  // Pila de todos los elementos montados (sin desmontar)
  const renderStack = (items, active) =>
    items.map((el, i) => {
      const isActive = i === active;
      const child = React.isValidElement(el) ? el : <span>{el}</span>;

      return (
        <div
          key={`stack-${i}`}
          style={{
            position: "absolute",
            inset: 0,
            opacity: isActive ? 1 : 0,
            transition: "opacity 150ms linear",
            pointerEvents: isActive ? "auto" : "none",
            willChange: "opacity",
            backfaceVisibility: "hidden",
          }}
          data-stack-index={i}
          data-active={isActive ? "1" : "0"}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child, { "data-active": isActive ? "1" : "0" })
            : child}
        </div>
      );
    });

  return (
    <>
      <Card
        style={styleDefault}
        portrait={{ ...portrait, animate: animateMoveObject,opacity:0 }}
        landscape={{ ...landscape, animate: animateMoveObject,opacity:0}}
        loop={true}
        controlsAnimate="play"
        onStepChange={handleStepChange}
      >
        {/* Wrapper relativo para contener la pila absoluta */}
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {renderStack(elements, index)}
        </div>
      </Card>

      {/* Opcionales: referencias visuales / elementos externos */}
      {/* Si también quieres mantener este, puedes dejarlo: */}
      {/* <Card {...configBlankOut} /> */}
    </>
  );
};

export default StreamOpacityX;
