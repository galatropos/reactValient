// src/component/effects/stream/StreamMoveVertical.jsx
import React, { useMemo, useState, useCallback } from "react";
import Card from "../../Card";
import useOrientation from "../../../hook/useOrientation";

const StreamMoveVertical = ({
  portrait,
  landscape,
  style,
  elements = [],
  // tiempos base (los usa animateMoveObject y los telones)
  invert=false,
  cycleDelay=5700,  
  durationIn=500, 
  durationOut=500, 
}) => {
  const [index, setIndex] = useState(0);
  const orientation = useOrientation();
  const height = orientation === "portrait" ? portrait.height : landscape.height;

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
    [{ y: 5 }, 0],                // 0 (instantáneo)
    [{ y: -5 }, durationIn],      // 1 ⬅️ aquí avanzamos index
    [{}, cycleDelay],             // 2
    [{ y: 0 }, durationOut / 2],  // 3
    [{ y: 0 }, durationOut / 2],  // 4
  ];
  const animateMoveObject2 = [
    [{ y: -5 }, 0],                // 0 (instantáneo)
    [{ y: 5 }, durationIn],      // 1 ⬅️ aquí avanzamos index
    [{}, cycleDelay],             // 2
    [{ y: 0 }, durationOut / 2],  // 3
    [{ y: 0 }, durationOut / 2],  // 4
  ];

  const animateMoveObject = invert? animateMoveObject2:animateMoveObject1;


  // Telones (opcionales)
  const animateIn1 = [
    [{ y: -height }, durationIn],
    [{ opacity: 0, y: height * 2 }, 0],
    [{ opacity: 1 }, 0],
    [{}, cycleDelay-100],
    [{ y: -height }, durationOut],
    [{}, 100],
  ];
  const animateIn2 = [
    [{ y: height }, durationIn],
    [{ opacity: 0, y: -height * 2 }, 0],
    [{ opacity: 1 }, 0],
    [{}, cycleDelay-100],
    [{ y: height }, durationOut],
    [{}, 100],

  ];
  const animateIn = invert? animateIn2:animateIn1;


  const configBlankIn = {
    style: { background: "white", border: "1px solid #fff" },
    portrait: { opacity: 1, ...portrait, animate: animateIn },
    landscape: { opacity: 1, ...landscape, animate: animateIn },
    loop: true,
    controlsAnimate: "play",
  };


  const configoOuter1 = {
    style: { background: "white", border: "1px solid #fff" },
    portrait: { opacity: 1, ...portrait, y: portrait.y + height },
    landscape: { opacity: 1, ...landscape, y: landscape.y + height },
  };

  const configoOuter2 = {
    style: { background: "white", border: "1px solid #fff" },
    portrait: { opacity: 1, ...portrait, y: portrait.y - height },
    landscape: { opacity: 1, ...landscape, y: landscape.y - height },
  };

  // 🔔 Avanza el índice cuando Card entra al paso 1
  const handleStepChange = useCallback(
    (stepIdx) => {
      if (stepIdx === 4 && elements.length > 0) {
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
        portrait={{ ...portrait, animate: animateMoveObject }}
        landscape={{ ...landscape, animate: animateMoveObject }}
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
      <Card {...configBlankIn} />
      <Card {...configoOuter1} />
      <Card {...configoOuter2} />
      {/* Si también quieres mantener este, puedes dejarlo: */}
      {/* <Card {...configBlankOut} /> */}
    </>
  );
};

export default StreamMoveVertical;
