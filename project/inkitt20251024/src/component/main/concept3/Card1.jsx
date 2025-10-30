import React, { useEffect, useMemo, useRef } from "react";
import Card from "../../../../../../src/component/Card";
import audioClick from "../../../../assets/audio/card.mp3";
import audioSpin from "../../../../assets/audio/flipCard.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

const Card1 = ({ image, title, play = false, animationEnd = false,backgroundColor }) => {
  const clickS = useAudio(audioClick);
  const spinS  = useAudio(audioSpin);

  // Secuencia título (fade breve)
  const animateTitle = useMemo(() => (
    [[{ opacity: -1, blur: 10 }, 200]]
  ), []);

  // Secuencia “flip/fin”
  const animateEnd = useMemo(() => ([
    [{ rotateY: +90,  scaleX: -0.08, scaleY: +0.08, scale: +1.04, blur:  2 }, 250],
    [{ rotateY: +180, scaleX: +0.08, scaleY: -0.08, scale:  1.06, blur:  4 }, 250],
    [{ rotateY: +360, scaleX: -0.02, scaleY: +0.02, scale: +1.02, blur:  8 }, 250],
    [{ rotateY:   0,  scaleX:  0.00, scaleY:  0.00, scale:  1.00, blur:  0 }, 250],
  ]), []);

  // Secuencia de salida “slide/rotate”
  const animateCard = useMemo(() => ([
    [{ rotate: -45, x: -20, y: -3,  scale: +0.05, scaleX: +0.04, scaleY: +0.54 }, 120],
    [{ rotate: -45, x: -20, y: -5,  scale: -0.02,                  scaleY:  0.52 }, 100],
    [{ rotate: -45, x: -15, y: -7,  scale: -0.03, blur: +2 }, 160],
    [{ rotate: -45, x: -25, y: -9,  scale: -0.04, opacity: -0.5, blur: +2 }, 200],
    [{ rotate: -180, x: -100, y: -2, opacity: -0.5 }, 160],
  ]), []);

  // Elegir secuencia de imagen
  const imageSeq = useMemo(
    () => (animationEnd ? animateEnd : animateCard),
    [animationEnd, animateEnd, animateCard]
  );

  // 🔊 Sonidos: cada uno suena una sola vez por ciclo de `play`
  const playedClickRef = useRef(false);
  const playedSpinRef  = useRef(false);
  useEffect(() => {
    // Si play se apaga, reinicia flags para el próximo ciclo
    if (!play) {
      playedClickRef.current = false;
      playedSpinRef.current = false;
      return;
    }
    // En play: si aún no terminó, dispara click una vez
    if (!animationEnd && !playedClickRef.current) {
      clickS.play();
      playedClickRef.current = true;
    }
    // En play: si ya terminó, dispara spin una vez (cubre el caso donde inicia ya terminado)
    if (animationEnd && !playedSpinRef.current) {
      spinS.play();
      playedSpinRef.current = true;
    }
  }, [play, animationEnd, clickS, spinS]);

  const controlsAnimate = play ? "play" : "stop";

  const configTitle = useMemo(() => ({
    style: { background: backgroundColor, zIndex: -1 },
    portrait: {
      x: 50, y: 10, width: 100, height: 10, anchor: "middle",
      blur: 0, opacity: 1, animate: animateTitle,
    },
    landscape: {
      x: 80, y: 10, width: 100, height: 10, anchor: "middle",
      scale: 1, blur: 0, opacity: 1, animate: animateTitle, fontSize: 3.5,
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
      borderRadius: "6%",
    },
    portrait: {
      animate: imageSeq,
      x: 46, y: 41, width: 45, height: 40, anchor: "middle",
      blur: 0, opacity: 1, rotateY: 0, rotateX: 0,
      backdropBlur: 0, scale: 1, scaleX: 1, scaleY: 1, rotate: -10,
    },
    landscape: {
      animate: imageSeq,
      x: 20, y: 40, width: 25, height: 60, anchor: "middle",
      blur: 0, opacity: 1, rotateY: 0, rotateX: 0,
      backdropBlur: 0, scale: 1, scaleX: 1, scaleY: 1, rotate: -10,
    },
    loop: false,
    controlsAnimate,
  }), [image, imageSeq, controlsAnimate]);

  return (
    <>
      <Card {...configTitle} />
      {/* key asegura reinicio limpio al cambiar de secuencia */}
      <Card key={animationEnd ? "img-end" : "img-card"} {...configImage} />
    </>
  );
};

export default Card1;
