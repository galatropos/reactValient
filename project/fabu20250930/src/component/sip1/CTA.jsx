import React from "react";
import Card from "../../../../../src/component/Card";
import ctaImg from "../../../assets/image/sip1/cta.webp";
import { animate } from "../animate";

const CTA = () => {
  const cta = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${ctaImg})`,
      transformOrigin: "center center",
      borderRadius: "60px",
      origin: "center center",
    },
    portrait: {
      height: 7,
      width: 40,
      anchor: "middle",
      x: 50,
      y: 90,
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
      x: 50,
      y: 89,
    },
    controlsAnimate: "play",
    loop: true,
  };

  return (
    <>
      <Card {...cta} />
    </>
  );
};

export default CTA;
