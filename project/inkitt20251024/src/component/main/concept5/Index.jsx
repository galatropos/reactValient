import React, { useState, useEffect } from "react";
import "../../../../assets/style/concept5.css";
import Card from "../../../../../../src/component/Card";
import image1 from "../../../../assets/image/concepto5/1.webp";
import image2 from "../../../../assets/image/concepto5/2.webp";
import image3 from "../../../../assets/image/concepto5/3.webp";
import Video from "./Video";
import Image from "./Image";
import animateBlurCombo from "../../../../../../src/utils/animate/animateBlurBackdrop";
import audioClick from "../../../../assets/audio/click.mp3";
import useAudio from "../../../../../../src/hook/useAudio";
import audioSountrack from "../../../../assets/audio/sountrack1.mp3";
import Found from "./found";
import WaveSpan from "../../../../../../src/component/WaveSpan";

const steps = [
  {
    background: image1,
    title: "Run the bath",
    xpc: 64,
    ypc: 27,
    xlc: 58,
    ylc: 20,
    xpt: 66,
    ypt: 27,
    xlt: 60,
    ylt: 36,
  },
  {
    background: image2,
    title: "Light the candle",
    xpc: 44,
    ypc: 30,
    xlc: 48,
    ylc: 20,
    xpt: 49,
    ypt: 10,
    xlt: 30,
    ylt: 10,
  },
  {
    background: image3,
    title: "Pour th wine",
    xpc: 68,
    ypc: 30,
    xlc: 60,
    ylc: 25,
    xpt: 30,
    ypt: 5,
    xlt: 20,
    ylt: 16,
  },
];

const Index = ({
  ico,
  video = null,
  logo,
  footerColor,
  ctaText,
  footerText,
  ctaColor,
  image = null,
  mraid,
  backgroundColor,
  text,
}) => {
  const [next, setNext] = useState(0);
  document.body.style.backgroundColor = backgroundColor;

  const finish = steps.length <= next;

  useEffect(() => {
    startSountrack.automatic();
    startSountrack.setLoop(true);
  }, []);
  let startSountrack = useAudio(audioSountrack);

  useEffect(() => {
    if (video && finish) {
      startSountrack.stop();
    }
  }, [finish]);

  const [controller, setController] = React.useState("stop");
  const startClick = useAudio(audioClick);

  const opacity = finish ? 0 : 1;

  const { background, title, xpc, ypc, xlc, ylc, xpt, ypt, xlt, ylt } =
    steps[next] || {};
  const onPressEndInside = () => {
    startClick.play();
    setController("play");
    setTimeout(() => {
      setNext((e) => e + 1);
    }, 100);
    setTimeout(() => {
      setController("stop");
    }, 200);
  };
  const configImage = {
    style: {
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "30px",
    },
    portrait: {
      x: 50,
      y: 1,
      width: 95,
      height: 88.1,
      anchor: "top",

      animate: animateBlurCombo(),
    },
    landscape: {
      x: 1,
      y: 2,
      width: 97,
      height: 76,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
      animate: animateBlurCombo(),
    },
    loop: true,
    controlsAnimate: controller,
  };

  const configCircle = {
    style: {
      opacity: 0,
    },
    portrait: {
      x: xpc,
      y: ypc,
      width: 19,
      height: 10.5,
      anchor: "top",
    },
    landscape: {
      x: xlc,
      y: ylc,
      width: 8,
      height: 14,
      anchor: "middle",
      scale: 1,
      fontSize: 3.5,
    },
  };
  const configTitle = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
    },
    portrait: {
      x: xpt,
      y: ypt,
      width: 50,
      height: 30,
      anchor: "top",
      fontSize: 6.5,
    },
    landscape: {
      x: xlt,
      y: ylt,
      width: 30,
      height: 20,
      anchor: "middle",
      scale: 1,
      fontSize: 3.5,
    },
    children: title,
  };
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

  return (
    <>
      <span style={{ display: finish ? "none" : "block" }}>
        <Card {...configImage} />
        <Card {...configCircle}>
          <WaveSpan
            controller={finish ? "stop" : "play"}
            size={35}
            mode="outline"
          />
        </Card>
        <Card {...configTitle} />
        <Found
          ctaText={ctaText}
          logo={logo}
          footerText={footerText}
          opacity={opacity}
          finish={finish}
          ico={ico}
          ctaColor={ctaColor}
          footerColor={footerColor}
        />
      </span>

      <Card {...configEvent} />
      {video ? (
        <Video
          finish={finish}
          logo={logo}
          {...video}
          cta={ctaText}
          ctaColor={ctaColor}
          mraid={mraid}
        />
      ) : (
        <Image
          backgroundColor={backgroundColor}
          text={text}
          finish={finish}
          logo={logo}
          {...image}
          cta={ctaText}
          ctaColor={ctaColor}
          mraid={mraid}
        />
      )}
    </>
  );
};

export default Index;
