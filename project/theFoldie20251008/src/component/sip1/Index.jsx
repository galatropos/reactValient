import React from "react";
import Card from "../../../../../src/component/Card";
import imageLogotipo from "../../../assets/image/logo.webp";
import PopScale from "../../../../../src/component/effects/pop/PopScale";
import imageCircle from "../../../assets/image/imageSip1.webp";
import CTA from "../CTA";

const Index = () => {
  const configLogotipo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 50,
      y: 2,
      width: 40,
      height: 6,
      anchor: "top",
    },
    landscape: {
      x: 79,
      y: 40,
      width: 26,
      height: 12,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
  };
  const configBuy = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "bold",
      color: "#2D3142",
    },
    portrait: {
      x: 50,
      y: 9,
      width: 100,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 7.5,
    },
    landscape: {
      x: 8,
      y: 96.5,
      fontSize: 4.5,
      width: 50,
      height: 10,
      anchor: "left-bottom",
      scale: 1,
    },
    children: "BUY 1 GET 1 FOR FREE",
  };
  const configLimit = {
    style: {
      display: "inline-block",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "bold",
      color: "#2D3142",
    },
    portrait: {
      x: 50,
      y: 93,
      width: 100,
      height: 10,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
      fontSize: 7.5,
    },
    landscape: {
      x: 8,
      y: 2,
      fontSize: 4.5,
      width: 50,
      height: 10,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
    },
    children: "LMITED-TIME-OFFER",
  };

  const configBackground = {
    style: {
      backgroundImage: `

    url(${imageCircle})
  `,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 139,
      height: 120,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 33,
      y: 49.5,
      width: 91,
      height: 89,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    loop: true,
    controlsAnimate: "play",
  };

  const elementst = ["LIMITED-TIME-OFFER", "BUY 1 GET 1 FOR FREE"];

  return (
    <>
      <Card {...configBackground} />
      <CTA xLandscape={79} yLandscape={60} xPortrait={50} yPortrait={98} />
      <Card {...configLogotipo} />
      <PopScale
        {...configBuy}
        elements={elementst}
        intervalChange={4000}
        scale={0.8}
      />
      <PopScale
        {...configLimit}
        elements={[...elementst].reverse()}
        intervalChange={4000}
        scale={0.8}
      />
    </>
  );
};

export default Index;
