import React from "react";
import Card from "../../../../../src/component/Card";
import ctaImg from "../../../assets/image/sip11/cta.webp";
import { animate } from "../animate";

const CTA = () => {
  const cta = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${ctaImg})`,
      transformOrigin: "center center",
    },
    portrait: {
      fontSize: 4.5,
      height: 10,
      width: 70,
      anchor: "middle",
      x: 50,
      y: 75,
      scale: 1,
      rotate: 0,
      opacity: 1,
      animate,
    },
    landscape: {
      height: 25,
      width: 27,
      anchor: "middle",
      scale: 1,
      opacity: 1,
      animate,
      x: 66,
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
