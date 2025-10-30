import React  from "react";
import Card from "../../../../../src/component/Card";
import imageLogotipo from "../../../assets/image/logo.webp";
import Hand from "./Hand";
import background from "../../../assets/image/sip5/background.webp";
import imageCTA from "../../../assets/image/sip5/cta.png";

import useAudio from "../../../../../src/hook/useAudio";
import audioClick from "../../../assets/audio/sip5/click.mp3";

import Carrousel from "./Carousel";
import { registerOpenOnClick } from "../../../../../src/utils/registerOpenOnClick";
import {useRedirectMIPEvent} from "../../../../../src/hook/useRedirectMIP";


const Start = ({setActive}) => {
    const click=useAudio(audioClick)
  
  const logo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 8,
      width: 14,
      height: 7.5,
      anchor: "middle",
    },
    landscape: {
      x: 5,
      y: 4,
      width: 8,
      height: 13,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };

  const configP1 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: 800,
      flexDirection: "column",
    },
    portrait: {
      x: 50,
      y: 14,
      width: 90,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 7,
      lineHeight: 4.5,
    },
    landscape: {
      x: 50,
      y: 5,
      fontSize: 4,
      width: 50,
      height: 10,
      anchor: "top",
      scale: 1,
    },
    children: "Elige tu tutor de IA, empieza a hablar inglés!"
  };
  const configBackground = {
    style: {
      backgroundImage: `url(${background})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 460,
      height: 300,
      anchor: "middle",
    },
    landscape: {
      rotate: 90,
      x: 50,
      y: 50,
      width: 100,
      height: 180,
      anchor: "middle",
    },
  };

  const configCTA = {
    style: {
      backgroundImage: `url(${imageCTA})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      fontWeight:700,
    },
    portrait: {
      x: 50,
      y: 90,
      width: 42,
      height: 8,
      anchor: "middle",
      fontSize:4.3,
    },
    landscape: {
      x: 50,
      y: 102,
      width: 25,
      height: 25,
      anchor: "bottom",
      rotate: 0,
      fontSize:3,
      scale: 1,
    },
    children:"Más información"
  };

  const configScroller = {
    style: {
      color: "#FFF",
      flexDirection: "column",
      overFlow: "scroll",
      fontWeight: 900,
    },
    portrait: {
      x:50,
      y: 50,
      width: 10,
      height: 100,
      anchor: "middle",
      fontSize: 7,
    },
    landscape: {
      x: 50,
      y: 42,
      width: 36,
      height: 60,
      anchor: "middle",
      rotate: 0,
      scale: 0.6,
      fontSize: 5,
    },
    loop: true,
  };


  const activateOn=()=>{
    useRedirectMIPEvent({
      appstore:
        "https://apps.apple.com/ve/app/learna-ai-aprender-ingl%C3%A9s/id6478287397",
      playStore:
        "https://play.google.com/store/apps/details?id=com.codeway.aitutor",
      windows: "https://ailearna.com/es",
    });
    registerOpenOnClick();
  }
const onSound=()=>{
  click.play()
}

  return (
    <>
      <Card {...configBackground} onPressStart={activateOn} />
      <Card {...configP1}  onPressStart={activateOn} />
      <Card {...logo}   onPressStart={activateOn} />
      <Card {...configCTA}  onPressStart={activateOn}  />
        <Card {...configScroller}
        onPressEndInside={onSound}
        onPressEndOutside={onSound}
        >
          <Carrousel  />
        </Card>
        <Hand />

      
    </>
  );
};

export default Start;
