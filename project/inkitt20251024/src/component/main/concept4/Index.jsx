import React, { useEffect, useState } from "react";

import Card from "../../../../../../src/component/Card";
import TapRippleCursor from "../../../../../../src/component/TapRippleCursor";
import Quiz from "./Quiz";
import Text from "./Text";
import Video from "./Video";
import "../../../../assets/style/concept4.css";
import animateBlurCombo from "../../../../../../src/utils/animate/animateBlurBackdrop";
import useAudio from "../../../../../../src/hook/useAudio";

import audioSountrack from "../../../../assets/audio/sountrack1.mp3";

const Index = ({imagePort,quest,logo,text,textCta,colorCta,colorQuest,colorProgress,mraid,backgroundColor,video}) => {
  document.body.style.backgroundColor = backgroundColor;
  useEffect(()=>{startSountrack.automatic();startSountrack.setLoop(true);},[])
  let startSountrack=useAudio(audioSountrack);

  const [next, setNext] = useState(0);

  const [controller,setController]=React.useState("stop");

  if(next>=quest.length)
  {
    if(video)startSountrack.stop();
    return (
      video?
      <Video finish={next>=quest.length} mraid={mraid}  logo={logo}  cta={textCta} ctaColor={colorCta}  backgroundColor={colorQuest} text={text} video={video} />:
      <Text backgroundColor={backgroundColor} mraid={mraid} cta={textCta} logo={logo} image={imagePort} text={text} ctaColor={colorCta}/>
      
    )
  }
  const imageMain=quest[next].image;



  const configLogo = {
    style: {
      backgroundImage: `url(${logo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 3,
      width: 40,
      height: 9,
      anchor: "top",
    },
    landscape: {
      x: 15,
      y: 4.9,
      width: 20,
      height: 13,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
    },
  };
  const configProgress = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
    },
    portrait: {
      x: 50,
      y: 49,
      width: 80,
      height: 1.5,
      anchor: "middle",
      scale: 1,
      fontSize: 9,
    },
    landscape: {
      x: 75,
      y: 22,
      width:40,
      height: 3,
      anchor: "middle",
      scale: 1,
      fontSize: 3.5,
    },
  };

  const configImage = {
    backgroundImage: imageMain,
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
      borderRadius: "30px",
    },
    portrait: {
      x: 50,
      y: 13,
      width: 74,
      height: 32,
      anchor: "top",
      scale: 1,
          animate:animateBlurCombo(),
          fontSize: 9,
    },
    landscape: {
      x: 5,
      y: 56,
      width: 42,
      height: 70,
      anchor: "left",
      scale: 1,
          animate:animateBlurCombo(),
          fontSize: 3.5,
    },
    controlsAnimate:controller,

  };

  const configBackground = {
    style: {
      mixBlendMode: "saturation",
      backgroundImage: `linear-gradient(to top,
      ${backgroundColor}FF 10%,
      ${backgroundColor}EE 60%,
      ${backgroundColor}E6 90%,
      ${backgroundColor} 100%
    ), url(${imageMain})`,
    },
    portrait: {
      x: 50,
      y: -2,
      width: 100,
      height: 100,
      anchor: "top",
      scale: 1,
          animate:animateBlurCombo(),
          fontSize: 9,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      scale: 1,
          animate:animateBlurCombo(),
          fontSize: 3.5,
    },
    controlsAnimate:controller,
  };
const onNext=()=>{
  setController("play")
  setTimeout(()=>{
    setNext((e)=>e+1)
  },100)
  setTimeout(()=>{
    setController("stop")
  },200)
}

  return (
    <>
  <style>{`
    /* opcional: fondo global */

    /* Estilos SOLO para tu <progress id="prog1"> */
    #prog1{
      width:100%;
      height:100%;
      border:none;
      border-radius:999px;
      background:transparent;
      overflow:hidden; /* redondeado visible */
    }

    /* WebKit (Chrome, Edge, Safari) */
    #prog1::-webkit-progress-bar { background:#262630; }
    #prog1::-webkit-progress-value {
      background:${colorProgress};
      transition: width .2s ease;
    }

    /* Firefox */
    #prog1::-moz-progress-bar{
      background:${colorProgress};
      transition: width .2s ease;
    }

    /* Indeterminado (WebKit) */
    #prog1:indeterminate::-webkit-progress-bar{
      background:#262630;
      position:relative;
    }
    #prog1:indeterminate::-webkit-progress-bar::before{
      content:"";
      position:absolute; inset:0;
      background:linear-gradient(90deg, transparent 0, ${colorProgress} 40%, ${colorProgress} 60%, transparent 100%);
      background-size:200% 100%;
      animation:slide 1s linear infinite;
    }
    @keyframes slide { to { background-position: -200% 0; } }
  `}</style>
  <TapRippleCursor opacity={0.5} fadeDuration={200} size={30}  />
      <Card {...configBackground} />
      <Card {...configLogo} />
      <Card {...configImage} />
      <Card {...configProgress}>
        <progress id="prog1" value={next} max={quest.length}></progress>
      </Card>
      <Quiz {...quest[next]} setNext={onNext} colorQuest={colorQuest} colorActive={colorProgress} backgrounColor={backgroundColor}  />
    </>
  );
};

export default Index;
