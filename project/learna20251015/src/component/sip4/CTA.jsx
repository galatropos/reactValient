import React from 'react'
import animatePulse from '../../utils/animatePulse';
import Card from '../../../../../src/component/Card';

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
      fontWeight: "700",
      borderBottom: "6px solid #3B8006",

    },
    portrait: {
      x: xPortrait,
      y: yPortrait,
      width: 35,
      height: 5.5,
      fontSize: 4.6,
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
    controlsAnimate: "stop",
    children: "CHECK",
  };
  return (
    <Card {...configCta} />

  )
}

export default CTA