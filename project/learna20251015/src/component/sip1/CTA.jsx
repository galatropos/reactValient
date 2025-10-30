import React from 'react'
import animatePulse from '../../utils/animatePulse';
import Card from "../../../../../src/component/Card";
import useAudio from "../../../../../src/hook/useAudio";
import audioClick from "../../../assets/audio/sip1/click.mp3";

const CTA = ({xLandscape,yLandscape,xPortrait,yPortrait,scale=1,setActive}) => {
  const {play}=useAudio(audioClick)
  const configCta = {
    onClick:()=>{
      play()
      setTimeout(()=>{
        setActive(false)
      },200)
    },
    style: {
      scale,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      background: "#66C61D",
      borderRadius: "25px",
      fontWeight: "600",
      borderBottom: "7px solid #53A612",

    },
    portrait: {
      x: xPortrait,
      y: yPortrait,
      width: 43,
      height: 5.5,
      fontSize: 4,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
      animate: animatePulse,
    },
    landscape: {
      width: 23,
      fontSize: 2.5,
      height: 9,
      rotate: 0,
      animate: animatePulse,
      scale: 1,
      x: xLandscape,
      y: yLandscape,
      anchor: "middle",
    },
    loop: true,
    controlsAnimate: "play",
    children: "EMPIEZA",
  };
  return (
    <Card {...configCta} />

  )
}

export default CTA