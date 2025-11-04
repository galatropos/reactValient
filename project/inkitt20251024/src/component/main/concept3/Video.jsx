import React from "react";

import VideoToFramesPlayer from "../../../../../../src/component/VideoToFramesPlayer";
import Card from "../../../../../../src/component/Card";
import animatePendule from "../../../../../../src/utils/animate/animatePendule";
import  { useRedirectMIPEvent } from "../../../../../../src/hook/useRedirectMIP";

const Video = ({
  finish,
  logo,
  title,
  srcLandscape,
  srcPortrait,
  cta,
  ctaColor,
  mraid,
}) => {

  const configVideo = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "40px",
    },
    portrait: {
      x: 50,
      y: 45,
      width: 55,
      height: 55,
      anchor: "middle",
    },
    landscape: {
      x: 20,
      y: 50,
      width: 25,
      height: 85,
      anchor: "middle",
    },
  };
  const configCta = {
          onPressStart:()=> useRedirectMIPEvent(mraid),
    style: {
      borderRadius: "20px",
      color: "white",
      backgroundColor: ctaColor,
      fontWeight: "bold",
    },
    portrait: {
      x: 50,
      y: 95,
      width: 40,
      height: 6,
      anchor: "bottom",
      fontSize: 4,
           animate:animatePendule(),
     
      scale: 1,
    },
    landscape: {
      fontSize: 3,
      x: 70,
      y: 92,
      width: 27,
      height: 15,
      anchor: "bottom",
        animate:animatePendule(),
  
    },
    children: cta,
    loop: true,
    controlsAnimate: "play",
  };
  const configLogo = {
    backgroundImage: logo,
    style: {
      backgroundSize: "95%",
    },
    portrait: {
      x: 50,
      y: 3,
      width: 30,
      height: 10,
      anchor: "top",
    },
    landscape: {
      x: 70,
      y: 16.2,
      width: 20,
      height: 20,
      anchor: "middle",
    },
  };
  const configTitle = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
    },
    portrait: {
      x: 50,
      y: 80,
      width: 90,
      height: 5,
      anchor: "middle",
      fontSize: 6,
    },
    landscape: {
      x: 70,
      y: 50,
      width: 300,
      height: 300,
      anchor: "middle",
      fontSize: 5.3,
    },
    children: `‘‘${title}’’`,
  };

  return (
    <span style={{ display: finish ? "block" : "none" }}>
      <VideoToFramesPlayer
        {...configVideo}
        portraitSrc={srcPortrait}
        landscapeSrc={srcLandscape}
        muted={!finish}
        loop={true}
        autoPlay={true}
        reset={finish}
      />
      <Card {...configLogo} />
      <Card {...configTitle} />
      <Card {...configCta} />
    </span>
  );
};

export default Video;
