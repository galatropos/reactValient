import React from 'react'
import animatePulse from '../utils/animatePulse';
import Card from '../../../../src/component/Card';

const CTA = ({xLandscape,yLandscape,xPortrait,yPortrait}) => {

  const configCta = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      background: "#1F2937",
      borderRadius: "60px",
      fontWeight: "500",
    },
    portrait: {
      x: xPortrait,
      y: yPortrait,
      width: 44,
      height: 6.5,
      fontSize: 4,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
      animate: animatePulse,
    },
    landscape: {
      width: 23,
      fontSize: 2,
      height: 11,
      rotate: 0,
      animate: animatePulse,
      scale: 1,
      x: xLandscape,
      y: yLandscape,
      anchor: "middle",
    },
    loop: true,
    controlsAnimate: "play",
    children: "Shop Now",
  };
  return (
    <Card {...configCta} />

  )
}

export default CTA