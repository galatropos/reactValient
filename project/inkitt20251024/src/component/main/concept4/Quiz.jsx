import React, { useCallback, useMemo, useRef, useState } from "react";
import Card from "../../../../../../src/component/Card";
import audioClick from "../../../../assets/audio/click.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

/** ---------- Response (opción) ---------- */
const Response = ({ xp, yp, xl, yl, text, setNext, colorActive }) => {
  const startClick = useAudio(audioClick);
  const [active, setActive] = useState(false);

  // Pequeño gate para no spamear el play en cada micro-movimiento
  const gateRef = useRef(false);
  const playClick = useCallback(() => {
    if (gateRef.current) return;
    gateRef.current = true;
    startClick.play();
    setTimeout(() => (gateRef.current = false), 80);
  }, [startClick]);

  const border = useMemo(
    () => (active ? `5px solid ${colorActive}` : "2px solid #36363D"),
    [active, colorActive]
  );

  const setActiveSafe = useCallback((v) => {
    // evita setState si ya está en ese valor
    setActive((prev) => (prev === v ? prev : v));
  }, []);

  const configQuiz = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      background: "#191A22",
      border,
    },
    portrait: {
      x: xp,
      y: yp,
      width: 90,
      height: 6,
      anchor: "top",
      fontSize: 5,
    },
    landscape: {
      x: xl,
      y: yl,
      fontSize: 2.3,
      width: 40,
      height: 8,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
    },

    // Handlers consolidados (un solo play por transición)
    onPressStart: () => {
      playClick();
      setActiveSafe(true);
    },
    onPressMoveEnter: () => {
      playClick();
      setActiveSafe(true);
    },
    onPressMoveLeave: () => {
      playClick();
      setActiveSafe(false);
    },
    onPressEndInside: () => {
      playClick();
      setActiveSafe(false);
      setNext();
    },
    onPressEndOutside: () => {
      playClick();
      setActiveSafe(false);
    },
  };

  return <Card {...configQuiz}>{text}</Card>;
};

/** ---------- Quiz (principal) ---------- */
const Quiz = ({ quest, text, title, setNext, colorQuest, colorActive, backgrounColor }) => {
  const configQuestion = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      background: colorQuest,
      border: "1px solid #36363D",
      flexDirection: "column",
      fontWeight: 900,
    },
    portrait: {
      x: 50,
      y: 55,
      width: 90,
      height: 9,
      anchor: "top",
      fontSize: 5,
    },
    landscape: {
      x: 55,
      y: 29,
      width: 40,
      height: 13,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
      fontSize: 2.3,
    },
  };

  const configBlur = {
    style: {
      background: backgrounColor,
      pointerEvents: "none",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      backdropBlur: 0,
      blur: 0,
      opacity: 0,
    },
    landscape: {
      x: 55,
      y: 29,
      width: 40,
      height: 13,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
      fontSize: 2.3,
      opacity: 0,
    },
    loop: true,
  };

  // Posiciones idénticas a tu layout original (solo mapeadas)
  const portraitYs = [66, 74, 82, 90];
  const landscapeYs = [50, 62, 74, 86];

  return (
    <>
      <Card {...configQuestion}>
        <span>{title}</span>
        <span style={{ fontSize: 30, fontWeight: 500 }}>{text}</span>
      </Card>

      {quest.slice(0, 4).map((q, i) => (
        <Response
          key={i}
          xp={50}
          yp={portraitYs[i]}
          xl={55}
          yl={landscapeYs[i]}
          text={q}
          setNext={setNext}
          colorActive={colorActive}
        />
      ))}

      <Card {...configBlur} />
    </>
  );
};

export default Quiz;
