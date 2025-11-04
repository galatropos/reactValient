import React, { useEffect, useState } from "react";
import "../../../../assets/style/concept5.css";
import Found from "./found";
import Circle from "./Circle";
import useAudio from "../../../../../../src/hook/useAudio";
import audioSountrack from "../../../../assets/audio/sountrack1.mp3";
import Select from "./Select";
import Chat from "./Chat";
import Video from "./Video";
import Image from "./Image";
import Hand from "./Hand";

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
  const [acceptDenied, setAcceptDenied] = React.useState("");
  const [next, setNext] = useState(0);
  const [direction, setDirection] = React.useState(null);
  const [contNext, setContNext] = React.useState(0);

  const [controllerHand, setControllerHand] = React.useState("play");
  useEffect(() => {
    startSountrack.automatic();
    startSountrack.setLoop(true);
  }, []);
  let startSountrack = useAudio(audioSountrack);

  useEffect(() => {
    if (next === 2 && video) {
      document.body.style.backgroundColor = footerColor;
      startSountrack.stop();
    } else {
      document.body.style.backgroundColor = backgroundColor;
    }
  }, [next]);

  useEffect(() => {
    if (contNext >= images.length) {
      setTimeout(() => {
        setNext(2);
      }, 0);
    }
  }, [contNext]);

  const rev = images.toReversed?.() ?? [...images].reverse();
  return (
    <>
      <span style={{ display: next === 0 ? "block" : "none" }}>
        <Found
          footerColor={footerColor}
          ico={ico}
          ctaText={ctaText}
          logo={logo}
          footerText={footerText}
          ctaColor={ctaColor}
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
            key={index}
            length={images.length}
            setNext={setNext}
            setContNext={setContNext}
          />
        ))}

        <Circle
          direction={direction}
          next={next}
          length={images.length}
          acceptDenied={acceptDenied}
        />

        <Hand controller={controllerHand} />
      </span>

      <span style={{ display: next === 1 ? "block" : "none" }}>
        <Chat
          ctaColor={footerColor}
          finish={next === 1 ? "play" : "stop"}
          imageAvatar={imageAvatar}
          setNext={setNext}
        />

        <Found
          footerColor={footerColor}
          ico={ico}
          ctaText={ctaText}
          logo={logo}
          footerText={footerText}
          ctaColor={ctaColor}
        />
      </span>
      <span style={{ display: next >= 2 ? "block" : "none" }}>
        {video ? (
          <Video
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
