import React, { useEffect, useState, useRef } from "react";
import "../../../../assets/style/concept5.css";
import Found from "./Found";
import Circle from "./Circle";
import useAudio from "../../../../../../src/hook/useAudio";
import audioSountrack from "../../../../assets/audio/sountrack1.mp3";
import Select from "./Select";
import Chat from "./Chat";
import Video from "./Video";
import Image from "./Image";
import Hand from "./Hand";
import audioCard from "../../../../assets/audio/click.mp3";

const Index = ({
  ico,
  video = null,
  logo,
  footerColor,
  ctaText,
  footerText,
  ctaColor,
  imageAvatar,
  image = null,
  images,
  mraid,
  backgroundColor,
  text,
}) => {
  // 1) STATE (unificado)
  const [acceptDenied, setAcceptDenied] = useState("");
  const [next, setNext] = useState(0);
  const [direction, setDirection] = useState(null);
  const [contNext, setContNext] = useState(0);
  const [controllerHand, setControllerHand] = useState("play");

  // 2) CUSTOM HOOKS (antes de los effects)
  const cardSfx = useAudio(audioCard);
  const soundtrack = useAudio(audioSountrack);

  // 3) EFFECTS (con fixes anti-bucle)
  // Inicializa soundtrack una sola vez (sin dependencias a `soundtrack` para evitar re-ejecuciones)
  useEffect(() => {
    soundtrack.automatic();
    soundtrack.setLoop(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cambia fondo y detiene soundtrack al entrar a video
  useEffect(() => {
    if (next === 2 && video) {
      document.body.style.backgroundColor = footerColor;
      soundtrack.stop();
    } else {
      document.body.style.backgroundColor = backgroundColor;
    }
  }, [next, video, footerColor, backgroundColor /* no agregar `soundtrack` aquí */]);

  // Avanza a etapa 2 cuando se terminan las tarjetas
  useEffect(() => {
    if (contNext >= images.length) {
      setTimeout(() => setNext(2), 0);
    }
  }, [contNext, images.length]);

  // Sonido de swipe: gate para evitar repeticiones y sin dependencia a `cardSfx`
  const lastDirRef = useRef(null);
  useEffect(() => {
    if (direction === "right" || direction === "left") {
      if (lastDirRef.current !== direction) {
        lastDirRef.current = direction;
        cardSfx.play();
      }
    }
  }, [direction]); // no incluir cardSfx

  // 4) DERIVED
  const rev = images.toReversed?.() ?? [...images].reverse();

  // 5) RENDER (sin cambios estructurales)
  return (
    <>
      <span key={"span0"} style={{ display: next === 0 ? "block" : "none" }}>
        <Found
          footerColor={footerColor}
          ico={ico}
          ctaText={ctaText}
          logo={logo}
          footerText={footerText}
          ctaColor={ctaColor}
          key="found"
        />
        {rev.map(({ image, title }, index) => (
          <Select
            setDirection={setDirection}
            setControllerHand={setControllerHand}
            setAcceptDenied={setAcceptDenied}
            backgroundColor={backgroundColor}
            image={image}
            title={title}
            index={index}
            key={"key" + index}
            length={images.length}
            setNext={setNext}
            setContNext={setContNext}
          />
        ))}

        <Circle
          direction={direction}
          next={next}
          key="circle"
          length={images.length}
          acceptDenied={acceptDenied}
        />

        <Hand key={"hand"} controller={controllerHand} />
      </span>

      <span key={"span1"} style={{ display: next === 1 ? "block" : "none" }}>
        <Chat
          key="chat"
          ctaColor={footerColor}
          finish={next === 1 ? "play" : "stop"}
          imageAvatar={imageAvatar}
          setNext={setNext}
        />
        <Found
          key="found2"
          footerColor={footerColor}
          ico={ico}
          ctaText={ctaText}
          logo={logo}
          footerText={footerText}
          ctaColor={ctaColor}
        />
      </span>

      <span key={"span2"} style={{ display: next >= 2 ? "block" : "none" }}>
        {video ? (
          <Video
            key="video"
            mraid={mraid}
            finish={next === 2}
            logo={logo}
            {...video}
            cta={ctaText}
            ctaColor={ctaColor}
            backgroundColor={footerColor}
          />
        ) : (
          <Image
            key="image"
            mraid={mraid}
            logo={logo}
            {...image}
            cta={ctaText}
            ctaColor={ctaColor}
            backgroundColor={backgroundColor}
            text={text}
          />
        )}
      </span>
    </>
  );
};

export default Index;
