import React, { useEffect, useState, memo } from "react";
import Block1 from "./Block1";
import Block2 from "./Block2";
import audioSountrack from "../../../../assets/audio/sountrack1.mp3";
import useAudio from "../../../../../../src/hook/useAudio";
import Card from "../../../../../../src/component/Card";

function Index({
  imageMain,
  text,
  logo,
  title,
  ctaColor,
  ctaText,
  video,
  mraid,
  backgroundColor,
  titleBook,
}) {
  // Fondo del body con cleanup
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
    return () => (document.body.style.backgroundColor = prev);
  }, [backgroundColor]);

  const [next, setNext] = useState(0);

  const soundtrack = useAudio(audioSountrack, { trackTime: false });
  useEffect(() => {
    soundtrack.automatic();
    soundtrack.setLoop(true);
  }, [soundtrack]);

  useEffect(() => {
    if (!text && next === 1) soundtrack.stop();
  }, [next, text, soundtrack]);

  const configWall = {
    style: { backgroundColor },
    portrait: { x: 50, y: 50, width: 100, height: 100, anchor: "middle" },
    landscape: { x: 50, y: 50, width: 100, height: 100, anchor: "middle" },
  };

  return (
    <>
      <Card {...configWall} />

      {/* Paso 1 */}
      <span style={{ opacity: next === 0 ? 1 : 0, zIndex: next === 0 ? 1000 : 0 }}>
        <Block1
          setNext={setNext}
          imageMain={imageMain}
          logo={logo}
          title={title}
          ctaColor={ctaColor}
          backgroundColor={backgroundColor}
        />
      </span>

      {/* Paso 2 */}
      <span style={{ opacity: next === 1 ? 1 : 0, zIndex: next === 1 ? 10 : 0 }}>
        <Block2
          setNext={setNext}
          ctaColor={ctaColor}
          ctaText={ctaText}
          video={video}
          finish={next === 1}
          logo={logo}
          mraid={mraid}
          backgroundColor={backgroundColor}
          title={titleBook}
        >
          {text}
        </Block2>
      </span>
    </>
  );
}

export default memo(Index);
