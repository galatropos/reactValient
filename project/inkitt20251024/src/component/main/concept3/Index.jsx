import React, { useEffect, useState } from "react";
import "../../../../assets/style/concept5.css";
import Card from "../../../../../../src/component/Card";
import Block2 from "./Block2";
import Found from "./found";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Circle from "./Circle";
import useAudio from "../../../../../../src/hook/useAudio";
import useOrientation from "../../../../../../src/hook/useOrientation";
import audioSountrack from "../../../../assets/audio/sountrack1.mp3";


const Index = ({
  ico,
  video = null,
  logo,
  footerColor,
  ctaText,
  footerText,
  ctaColor,
  image = null,
  images,
  backgroundLast,
  mraid,
  backgroundColor,
  text
  
}) => {
  document.body.style.backgroundColor = backgroundColor;
const orientation = useOrientation();
  const [next, setNext] = useState(0);
  const finish = images.length < next;
  const opacity = finish ? 0 : 1;
  const onPressEndInside = () => {
    setNext((e) => e + 1);
  };
  useEffect(()=>{startSountrack.automatic();startSountrack.setLoop(true);},[])
  let startSountrack=useAudio(audioSountrack);

  useEffect(() => {
    if (next === images.length) {
      setTimeout(() => {
        setNext((e) => e + 1);
      }, 1000);
    }
  }, [next]);


  const configEvent = {
    style: {},
    portrait: {
      x: 50,
      y: 50,
      width: 300,
      height: 300,
      anchor: "middle",
    },
    landscape: {
      x: 50,
      y: 50,
      width: 300,
      height: 300,
      anchor: "middle",
    },
    onPressEndInside: () => onPressEndInside(),
  };
  const rev = images.toReversed?.() ?? [...images].reverse();

  return (
    <>
      <span style={{ display: finish ? "none" : "block" }}>
        <Found
          footerColor={footerColor}
          opacity={opacity}
          finish={finish}
          ico={ico}
          ctaText={ctaText}
          logo={logo}
          footerText={footerText}
          ctaColor={ctaColor}
        />
        <Circle next={next} length={images.length} />

        {rev.map((image, index) => {
          return (index + 1) % 2 ? (
            <Card1
              key={index}
              image={image.image}
              title={image.title}
              play={next + 1 > images.length - index}
              animationEnd={index == 0}
              backgroundColor={backgroundColor}
            />
          ) : (
            <Card2
              key={index}
              image={image.image}
              title={image.title}
              play={next + 1 > images.length - index}
              animationEnd={index == 0}
              backgroundColor={backgroundColor}
            />
          );
        })}
      </span>
      <Card {...configEvent} />

      <span style={{ display: !finish ? "none" : "block" }}>
        {
          <Block2
            key={"block2"}
            ctaColor={ctaColor}
            ctaText={ctaText}
            image={image}
            logo={logo}
            video={video}
            footerColor={footerColor}
            opacity={opacity}
            ico={ico}
            footerText={footerText}
            backgroundLast={backgroundLast}
            mraid={mraid}
            sountrack={startSountrack}
            text={text}
            backgroundColor={backgroundColor}
          />
        }
      </span>
    </>
  );
};

export default Index;
