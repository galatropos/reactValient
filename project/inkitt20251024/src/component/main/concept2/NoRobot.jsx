import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Card from "../../../../../../src/component/Card";
import imageAccept from "../../../../assets/image/concept2/accept.png";
import audioNoRobot from "../../../../assets/audio/noRobot.mp3";
import audioError from "../../../../assets/audio/error.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

function NoRobot({ setNext, ctaColor, activeReady = [], title }) {
  const all = activeReady.every(Boolean);
  const startClickNoRobot = useAudio(audioNoRobot);
  const startError = useAudio(audioError);

  const tStopLateRef = useRef(null);
  const clearTimers = useCallback(() => {
    if (tStopLateRef.current) {
      clearTimeout(tStopLateRef.current);
      tStopLateRef.current = null;
    }
  }, []);
  useEffect(() => () => clearTimers(), [clearTimers]);

  const animateAll = [
    [{ opacity: 0.85, blur: 1, scale: 0.04 }, 90],
    [{ rotate: -2 }, 90],
    [{ rotate: 4 }, 90],
    [{ rotate: -2 }, 90],
    [{ rotate: 0 }, 70],
    [{ rotate: -2 }, 90],
    [{ rotate: 4 }, 90],
    [{ rotate: -2 }, 90],
    [{ rotate: 0 }, 70],
    [{}, 4000],
    [{ opacity: 1, blur: 0, scale: 0 }, 140],
    [{}, 120],
    [{}, 120],
  ];

  const [controller, setController] = useState("stop");
  const [controllerAll, setControllerAll] = useState("stop");

  const animate = [
    [{ opacity: 1, blur: -10 }, 200],
    [{}, 2200],
  ];

  const onPressEndInsideOk = () => {
    startClickNoRobot.play?.();
    setController("play");
    setTimeout(() => setNext(1), 500);
  };

  const handleOn = () => {
    clearTimers();
    if (all) {
      onPressEndInsideOk();
    } else {
      setControllerAll("play");
      tStopLateRef.current = setTimeout(() => {
        setControllerAll("stop");
        tStopLateRef.current = null;
      }, 4000);
      startError.play?.();
    }
  };

  const configCta = {
    style: { background: ctaColor, color: "white", fontWeight: 300, borderRadius: "15px" },
    portrait: { x: 95, y: 96, anchor: "right-bottom", width: 43, height: 6, fontSize: 5 },
    landscape: { x: 75, y: 88.5, width: 25, height: 10, anchor: "middle", fontSize: 2.5 },
  };

  const configAccept = {
    backgroundImage: imageAccept,
    style: { backgroundSize: "contain" },
    portrait: { x: 58.5, y: 92.5, width: 5, height: 7, anchor: "middle", opacity: 0, blur: 10, animate },
    landscape: { x: 67.5, y: 88, width: 10, height: 3, anchor: "middle", opacity: 0, blur: 10, animate },
    loop: true,
    controlsAnimate: controller,
  };

  const configSelectAll = {
    style: { color: "red", fontWeight: 400, flexDirection: "column", zIndex: 50, pointerEvents: "none" },
    portrait: { x: 50, y: 86, width: 100, height: 15.9, anchor: "middle", fontSize: 4.5, animate: animateAll, opacity: 0 },
    landscape: { x: 26, y: 92, width: 45, height: 23, anchor: "middle", fontSize: 3, animate: animateAll, opacity: 0 },
    loop: true,
    controlsAnimate: controllerAll,
  };

  return (
    <>
      <Card {...configCta} onPressEndInside={handleOn}>☐ I&apos;m not a robot</Card>
      <Card {...configAccept} />
      <Card {...configSelectAll}>Select all squares with {title}</Card>
    </>
  );
}

export default memo(NoRobot);
