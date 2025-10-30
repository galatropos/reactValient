import React, { useEffect, useMemo, useRef } from "react";
import Card from "../../../../../../src/component/Card";
import audioClick from "../../../../assets/audio/card.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

const Card2 = ({ image, title, play = false,backgroundColor }) => {
  const clickS = useAudio(audioClick);

  // ✅ Secuencia del título (memo)
  const animateTitle = useMemo(() => (
    [[{ opacity: -1, blur: 10 }, 200]]
  ), []);

  // ✅ animateCard CORREGIDO y memoizado
  const animateCard = useMemo(() => ([
    [{ rotate: +45, x: +20, y:  -3, scale: +0.05, scaleX: +0.04, scaleY: +0.54 }, 120],
    [{ rotate: +45, x: +20, y:  -5, scale: -0.02,                  scaleY:  0.52 }, 100],
    [{ rotate: +45, x: +15, y:  -7, scale: -0.03, blur: +2                          }, 160],
    [{ rotate: +45, x: +25, y:  -9, scale: -0.04, opacity: -0.5, blur: +2          }, 200],
    [{ rotate:+180, x:+100, y:  -2, opacity: -0.5                                   }, 160],
  ]), []);

  // 🔊 Audio solo en transición false→true
  const prev = useRef(false);
  useEffect(() => {
    if (!prev.current && play) clickS.play();
    prev.current = play;
  }, [play, clickS]);

  const controlsAnimate = play ? "play" : "stop";

  const configTitle = useMemo(() => ({
    style: { background:backgroundColor, zIndex: -1, },
    portrait: {
      x: 50, y: 10, width: 100, height: 10, opacity: 1, anchor: "middle",
      animate: animateTitle,
      scale: 1, scaleX: 1, scaleY: 1, rotateY: 0, rotateX: 0, blur: 0, backdropBlur: 0,
    },
    landscape: {
      x: 80, y: 10, width: 100, height: 10, anchor: "middle", fontSize: 3.5,
      animate: animateTitle, scale: 1, blur: 0, opacity: 1,
    },
    children: title,
    loop: false,
    controlsAnimate,
  }), [title, animateTitle, controlsAnimate]);

  const configImage = useMemo(() => ({
    style: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius:"6%"
    },
    portrait: {
      x: 55, y: 45, width: 45, height: 40, anchor: "middle",
      opacity: 1, rotate: 0, scale: 1, scaleX: 1, scaleY: 1, rotateY: 0, rotateX: 0,
      blur: 0, backdropBlur: 0,
      animate: animateCard,
    },
    landscape: {
      x: 25, y: 45, width: 25, height: 60, anchor: "middle",
      opacity: 1, rotate: 0, scale: 1, scaleX: 1, scaleY: 1, rotateY: 0, rotateX: 0,
      blur: 0, backdropBlur: 0,
      animate: animateCard,
    },
    loop: false,
    controlsAnimate,
  }), [image, animateCard, controlsAnimate]);

  return (
    <>
      <Card key="title" {...configTitle} />
      <Card key="image" {...configImage} />
    </>
  );
};

export default Card2;
