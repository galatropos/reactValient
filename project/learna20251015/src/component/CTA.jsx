import React from 'react'
import animatePulse from '../utils/animatePulse';
import Card from '../../../../src/component/Card';

const CTA = ({xLandscape,yLandscape,xPortrait,yPortrait,scale=1,setActive}) => {
  const configCta = {
    onClick:()=>{
      setActive(false)
    },
    style: {
      scale,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      background: "#66C61D",
      borderRadius: "30px",
      fontWeight: "800",
      borderBottom: "7px solid #53A612",

    },
    portrait: {
      x: xPortrait,
      y: yPortrait,
      width: 45,
      height: 6,
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