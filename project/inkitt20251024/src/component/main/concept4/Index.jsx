import React, { useEffect, useState, useMemo } from "react";

import Card from "../../../../../../src/component/Card";
import TapRippleCursor from "../../../../../../src/component/TapRippleCursor";
import Quiz from "./Quiz";
import Text from "./Text";
import Video from "./Video";
import "../../../../assets/style/concept4.css";
import animateBlurCombo from "../../../../../../src/utils/animate/animateBlurBackdrop";
import useAudio from "../../../../../../src/hook/useAudio";

import audioSountrack from "../../../../assets/audio/sountrack1.mp3";

const BLUR_COMBO = animateBlurCombo(); // calcular una vez

const Index = ({
  imagePort,
  quest,
  logo,
  text,
  textCta,
  colorCta,
  colorQuest,
  colorProgress,
  mraid,
  backgroundColor,
  video
}) => {
  // Fondo del body solo cuando cambia
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  // Audio: inicializa y arranca una sola vez
  const startSountrack = useAudio(audioSountrack);
  useEffect(() => {
    startSountrack.automatic();
    startSountrack.setLoop(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [next, setNext] = useState(0);
  const [controller, setController] = useState("stop");

  // Si terminó el quiz y hay video, detener soundtrack
  useEffect(() => {
    if (next >= quest.length && video) {
      startSountrack.stop();
    }
  }, [next, quest.length, video, startSountrack]);

  // Evitar out-of-bounds: cuando termina, usa un fallback para los hooks/estilos
  const imageMainSafe = quest[next]?.image ?? imagePort;

  // Gradiente + imagen de fondo memorizado
  const bgMixed = useMemo(
    () =>
      `linear-gradient(to top,
        ${backgroundColor}FF 10%,
        ${backgroundColor}EE 60%,
        ${backgroundColor}E6 90%,
        ${backgroundColor} 100%
      ), url(${imageMainSafe})`,
    [backgroundColor, imageMainSafe]
  );

  // Configs
  const configLogo = {
    style: {
      backgroundImage: `url(${logo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: { x: 50, y: 4, width: 40, height: 9, anchor: "top" },
    landscape: {
      x: 84.9, y: 4.9, width: 20, height: 13, anchor: "right-top", rotate: 0, scale: 1,
    },
  };

  const configProgress = {
    style: { color: "white", fontWeight: "bold", flexDirection: "column" },
    portrait: { x: 50, y: 52, width: 80, height: 1.5, anchor: "middle", scale: 1, fontSize: 9 },
    landscape:{ x: 75, y: 22, width: 40, height: 3, anchor: "middle", scale: 1, fontSize: 3.5 },
  };

  const configImage = {
    backgroundImage: imageMainSafe,
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
      borderRadius: "30px",
    },
    portrait: {
      x: 50, y: 16, width: 74, height: 32, anchor: "top", scale: 1, animate: BLUR_COMBO, fontSize: 9,
    },
    landscape: {
      x: 5, y: 49, width: 45, height: 76, anchor: "left", scale: 1, animate: BLUR_COMBO, fontSize: 3.5,
    },
    controlsAnimate: controller,
  };

  const configBackground = {
    style: { mixBlendMode: "saturation", backgroundImage: bgMixed },
    portrait: {
      x: 50, y: -2, width: 100, height: 100, anchor: "top", scale: 1, animate: BLUR_COMBO, fontSize: 9,
    },
    landscape: {
      x: 50, y: 50, width: 100, height: 100, anchor: "middle", scale: 1, animate: BLUR_COMBO, fontSize: 3.5,
    },
    controlsAnimate: controller,
  };

  const onNext = () => {
    setController("play");
    setTimeout(() => setNext((e) => e + 1), 100);
    setTimeout(() => setController("stop"), 200);
  };

  // UI
  const finished = next >= quest.length;

  return (
    <>
      <style>{`
        #prog1{
          width:100%;
          height:100%;
          border:none;
          border-radius:999px;
          background:transparent;
          overflow:hidden;
        }
        #prog1::-webkit-progress-bar { background:#262630; }
        #prog1::-webkit-progress-value { background:${colorProgress}; transition: width .2s ease; }
        #prog1::-moz-progress-bar { background:${colorProgress}; transition: width .2s ease; }
        #prog1:indeterminate::-webkit-progress-bar{ background:#262630; position:relative; }
        #prog1:indeterminate::-webkit-progress-bar::before{
          content:""; position:absolute; inset:0;
          background:linear-gradient(90deg, transparent 0, ${colorProgress} 40%, ${colorProgress} 60%, transparent 100%);
          background-size:200% 100%;
          animation:slide 1s linear infinite;
        }
        @keyframes slide { to { background-position: -200% 0; } }
      `}</style>

      <TapRippleCursor opacity={0.5} fadeDuration={200} size={30} />

      {finished ? (
        video ? (
          <Video
            finish
            mraid={mraid}
            logo={logo}
            cta={textCta}
            ctaColor={colorCta}
            backgroundColor={colorQuest}
            text={text}
            video={video}
          />
        ) : (
          <Text
            backgroundColor={backgroundColor}
            mraid={mraid}
            cta={textCta}
            logo={logo}
            image={imagePort}
            text={text}
            ctaColor={colorCta}
          />
        )
      ) : (
        <>
          <Card {...configBackground} />
          <Card {...configLogo} />
          <Card {...configImage} />
          <Card {...configProgress}>
            <progress id="prog1" value={next} max={quest.length}></progress>
          </Card>
          <Quiz
            {...quest[next]}
            setNext={onNext}
            colorQuest={colorQuest}
            colorActive={colorProgress}
            backgrounColor={backgroundColor}
          />
        </>
      )}
    </>
  );
};

export default Index;
