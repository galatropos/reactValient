import React from "react";
import Card from "../../../../../src/component/Card";
import ctaImg from "../../../assets/image/sip10/cta.webp";
import { animate } from "../animate";

const CTA = () => {


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
      height: 8,
      width: 45,
      anchor: "middle",
      x: 40,
      y: 69,
      scale: 1,
      rotate: 0,
      opacity: 1,
      animate,
    },
    landscape: {
      fontSize: 3,
      height: 16,
      width:20,
      anchor: "middle",
      scale: 1,
      opacity: 1,
      animate,
      x: 45,
      y: 80,
    },
    controlsAnimate: "play",
    loop: true,
  };



  return (
    <>
      <Card {...cta}></Card>
    </>
  );
};

export default CTA;
