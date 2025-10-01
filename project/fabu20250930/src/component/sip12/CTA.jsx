import React from "react";
import Card from "../../../../../src/component/Card";
import ctaImg from "../../../assets/image/sip12/cta.webp";
import { animate } from "../animate";

const CTA = () => {


  const cta = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${ctaImg})`,
      transformOrigin: "center center" ,
      borderRadius: "60px", // todas las esquinas
      boxShadow: "0 5px 25px rgba(0,0,0,0.7)" // sombra

    },
    portrait: {
      fontSize: 4.5,
      height: 8,
      width: 50,
      anchor: "middle",
      x: 50,
      y: 80,
      scale: 1,
      rotate: 0,
      opacity: 1,
      animate,
    },
    landscape: {
      fontSize: 3,
      height: 11,
      width: 22,
      anchor: "middle",
      scale: 1,
      opacity: 1,
      animate,
      x: 75,
      y: 50,
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
