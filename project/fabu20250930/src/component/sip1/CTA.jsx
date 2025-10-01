import React from "react";
import Card from "../../../../../src/component/Card";
import ctaImg from "../../../assets/image/sip1/cta.webp";
import { animate } from "../animate";

const CTA = () => {


  const cta = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${ctaImg})`,
    },
    portrait: {
      fontSize: 4.5,
      height: 8,
      width: 56,
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
      height: 14,
      width: 35,
      anchor: "middle",
      scale: 1,
      opacity: 1,
      animate,
      x: 50,
      y: 88,
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
