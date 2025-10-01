import React from "react";
import Card from "../../../../../src/component/Card";
import ctaImg from "../../../assets/image/sip3/cta.webp";
import handImg from "../../../assets/image/sip3/hand.webp";
import { animate } from "../animate";

const CTA = () => {
   const animateHand = [
    [{ y: 2 }, 500],
    [{ x: 0 }, 150],
    [{ y: -2 }, 500],
  ];

  const cta = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${ctaImg})`,
      transformOrigin: "center center" 

    },
    portrait: {
      fontSize: 4.5,
      height: 7.5,
      width: 40,
      anchor: "middle",
      x: 50,
      y: 89,
      scale: 1,
      rotate: 0,
      opacity: 1,
      animate,
    },
    landscape: {
      fontSize: 3,
      height: 16,
      width: 22,
      anchor: "middle",
      scale: 1,
      opacity: 1,
      animate,
      x: 79,
      y: 80,
    },
    controlsAnimate: "play",
    loop: true,
  };


  const hand = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${handImg})`,
      transformOrigin: "center center" 

    },
    portrait: {
      fontSize: 4.5,
      height: 7.5,
      width: 40,
      anchor: "middle",
      x: 50,
      y: 80,
      scale: 1,
      rotate: 0,
      opacity: 1,
      animate:animateHand,
    },
    landscape: {
      fontSize: 3,
      height: 10,
      width: 20,
      anchor: "middle",
      scale: 1,
      opacity: 1,
      animate:animateHand,
      x: 79,
      y: 68,
    },
    controlsAnimate: "play",
    loop: true,
  };
  return (
    <>
      <Card {...cta}></Card>
      <Card {...hand}></Card>
    </>
  );
};

export default CTA;
