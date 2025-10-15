import React from "react";
import Card from "../../../../../src/component/Card";
import ctaImg from "../../../assets/image/sip6/cta.webp";
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
      height: 7.5,
      width: 40,
      anchor: "middle",
      x: 50,
      y: 93,
      scale: 1,
      rotate: 0,
      opacity: 1,
      animate,
    },
    landscape: {
      fontSize: 3,
      height: 16,
      width: 25,
      anchor: "middle",
      scale: 1,
      opacity: 1,
      animate,
      x: 84,
      y: 70,
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
