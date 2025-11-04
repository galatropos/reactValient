import React from 'react'

import VideoToFramesPlayer from '../../../../../../src/component/VideoToFramesPlayer';
import Card from '../../../../../../src/component/Card';
import animatePendule from '../../../../../../src/utils/animate/animatePendule';
import  { useRedirectMIPEvent } from "../../../../../../src/hook/useRedirectMIP";


const Video = ({finish,logo,title,srcLandscape,srcPortrait,cta,ctaColor,mraid}) => {

  const configVideo = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "30px",
    },
    portrait: {
      x: 50,
      y: 18,
      width: 60,
      height: 61,
      anchor: "top",
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
        color:"white",
      backgroundColor:ctaColor,
      fontWeight: "bold",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 96,
      width: 40,
      height: 6,
      anchor: "bottom",
        fontSize: 4,
        animate:animatePendule(),

    },
    landscape: {
        fontSize: 3,
      x: 70,
      y: 92.4,
      width: 27,
      height: 15,
      anchor: "bottom",
      animate:animatePendule(),


    },
    loop:true,
    controlsAnimate:"play",
    children:cta,
  };
  const configLogo = {
    backgroundImage: logo,
    style: {
      backgroundSize: "95%",
    },
    portrait: {
      x: 50,
      y: 4.7,
      width: 29,
      height: 10,
      anchor: "top",
    },
    landscape: {
      x: 70,
      y: 7.5,
      width: 15,
      height: 15,
      anchor: "top",
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
      y: 84,
      width: 90,
      height: 45,
      anchor: "middle",
      fontSize: 6,
    },
    landscape: {
      x: 70,
      y: 52,
      width: 40,
      height: 55,
      anchor: "middle",
      fontSize: 2,
    },
    children: `‘‘${title}’’`,
  };


  
  return (
    <span style={{display:finish?'block':'none'}}>
    <VideoToFramesPlayer    {...configVideo} portraitSrc={srcPortrait} landscapeSrc={srcLandscape} muted={!finish} loop={true}   autoPlay={true} reset={finish}    />
        <Card {...configLogo} />
        <Card {...configTitle} />
        <Card {...configCta} />
    </span>
  )
}

export default Video