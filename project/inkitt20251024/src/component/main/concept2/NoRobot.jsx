import React from "react";
import Card from "../../../../../../src/component/Card";
import imageAccept from "../../../../assets/image/concept2/accept.png";
import audioNoRobot from "../../../../assets/audio/noRobot.mp3";
import audioError from "../../../../assets/audio/error.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

const NoRobot = ({ setNext, ctaColor, activeReady = [], title }) => {
  const all = activeReady.every((e) => e);
  const startClickNoRobot = useAudio(audioNoRobot);
  const startError = useAudio(audioError);

  // ---- NUEVO: refs para controlar/limpiar timeouts
  const tStopSoonRef = React.useRef(null); // (opcional) stop de 10ms
  const tStopLateRef = React.useRef(null); // stop de 5000ms

  const clearAllTimers = React.useCallback(() => {
    if (tStopSoonRef.current) {
      clearTimeout(tStopSoonRef.current);
      tStopSoonRef.current = null;
    }
    if (tStopLateRef.current) {
      clearTimeout(tStopLateRef.current);
      tStopLateRef.current = null;
    }
  }, []);

  // ---- Limpieza al desmontar
  React.useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const animateAll = [
    // enfatiza con opacidad y blur, leve rotación
    [{ opacity: -0.15 + 1, blur: +1, scale: +0.04 }, 90],
    [{ rotate: -2 }, 90],
    [{ rotate: 4 }, 90],
    [{ rotate: -2 }, 90],
    [{ rotate: 0 }, 70],
    [{ rotate: -2 }, 90],
    [{ rotate: 4 }, 90],
    [{ rotate: -2 }, 90],
    [{ rotate: 0 }, 70],
    [{}, 5000],

    // regresa a base
    [{ opacity: +0.15 - 1, blur: -1, scale: -0.04 }, 140],
    [[], 120],
    // pequeño “rest” para que no se encadene de inmediato
    [[], 120],
  ];

  const [controller, setController] = React.useState("stop");
  const [controllerAll, setControllerAll] = React.useState("stop");

  const animate = [
    [{ opacity: 1, blur: -10 }, 200],
    [{}, 2200],
  ];

  const onPressEndInsideOk = () => {
    startClickNoRobot.play?.();
    setController("play");
    setTimeout(() => {
      setNext(1);
    }, 500);
  };

  // ---- SOLO MODIFICADO: handler con limpieza de timers
  const handleOn = () => {
    // A) limpia timers anteriores para evitar encadenados
    clearAllTimers();

    // (Opcional) Si necesitas un "apagón" brevísimo antes de volver a animar:
    // tStopSoonRef.current = setTimeout(() => {
    //   setControllerAll("stop");
    //   tStopSoonRef.current = null;
    // }, 10);

    if (all) {
      onPressEndInsideOk();
    } else {
      // Enciende la animación del hint
      setControllerAll("play");

      // B) programa el apagado a los 5s; si hay otro click, se limpiará arriba
      tStopLateRef.current = setTimeout(() => {
        setControllerAll("stop");
        tStopLateRef.current = null;
      }, 4000);

      // Sonido de error (no hace falta apagarlo manualmente si tu hook ya lo maneja)
      startError.play?.();
    }
  };

  const configCta = {
    style: {
      background: ctaColor,
      color: "white",
      fontWeight: "300",
      borderRadius: "15px",
    },
    portrait: {
      x: 95,
      y: 96,
      anchor: "right-bottom",
      scale: 1,
      width: 43,
      height: 6,
      fontSize: 5,
    },
    landscape: {
      x: 75,
      y: 88.5,
      width: 25,
      height: 10,
      anchor: "middle",
      fontSize: 2.5,
      scale: 1,
    },
  };

  const configAccept = {
    backgroundImage: imageAccept,
    style: { backgroundSize: "contain" },
    portrait: {
      x: 58.5,
      y: 92.5,
      width: 5,
      height: 7,
      anchor: "middle",
      scale: 1,
      animate,
      opacity: 0,
      blur: 10,
    },
    landscape: {
      x: 67.5,
      y: 88,
      width: 10,
      height: 3,
      anchor: "middle",
      opacity: 0,
      blur: 10,
      animate,
    },
    loop: true,
    controlsAnimate: controller,
  };

  const configSelectAll = {
    style: {
      color: "red",
      fontWeight: "400",
      flexDirection: "column",
      zIndex: 50,
      pointerEvents: "none",
    },
    portrait: {
      x: 50,
      y: 86,
      width: 100,
      height: 15.9,
      anchor: "middle",
      fontSize: 4.5,
      animate: animateAll,
      opacity: 0,
    },
    landscape: {
      x: 26,
      y: 92,
      width: 45,
      height: 23,
      anchor: "middle",
      scale: 1,
      fontSize: 3,
      animate: animateAll,
      opacity: 0,
    },
    loop: true,
    controlsAnimate: controllerAll,
  };

  return (
    <>
      <Card {...configCta} onPressEndInside={handleOn}>
        ☐ I&apos;m not a robot{" "}
      </Card>
      <Card {...configAccept} />
      <Card {...configSelectAll}>Select all squares with {title}</Card>
    </>
  );
};

export default NoRobot;
