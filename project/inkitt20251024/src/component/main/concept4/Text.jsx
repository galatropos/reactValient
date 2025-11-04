import React from "react";

import Card from "../../../../../../src/component/Card";
import animatePendule from "../../../../../../src/utils/animate/animatePendule";
import { useRedirectMIPEvent } from "../../../../../../src/hook/useRedirectMIP";
import hexadecimalToRgba from "../../../../../../src/utils/hexadecimalToRgba";
import AutoScrollBox from "../../../../../../src/component/AutoScrollBox";


const Text = ({
  finish=true,
  logo,
  title,
  image,
  cta,
  ctaColor,
  mraid,
  backgroundColor,
  text
}) => {
  const configPorte = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    backgroundImage: image,
    portrait: {
      x: 50,
      y: 27,
      width: 90,
      height: 20,
      anchor: "middle",
    },
    landscape: {
      x: 27,
      y: 50,
      width: 31,
      height: 85,
      anchor: "middle",
    },
  };
  const configBackground = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",      
      mixBlendMode: "saturation",
      backgroundImage: `linear-gradient(to top,
    ${hexadecimalToRgba(backgroundColor, 1)} 10%,
    ${hexadecimalToRgba(backgroundColor, 1)} 20%,
    ${hexadecimalToRgba(backgroundColor, 1)} 30%,
    ${hexadecimalToRgba(backgroundColor, 1)} 40%,
    ${hexadecimalToRgba(backgroundColor, 0.9)} 50%,
    ${hexadecimalToRgba(backgroundColor, 0.9)} 60%,
    ${hexadecimalToRgba(backgroundColor, 0.8)} 90%,
    ${hexadecimalToRgba(backgroundColor, 7)} 100%
    ), url(${image})`,

    },
    portrait: {
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      anchor: "middle",
    },
    landscape: {
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      anchor: "middle",
    },
  };
  const configCta = {
    onPressStart: () => useRedirectMIPEvent(mraid),
    style: {
      backgroundColor: ctaColor,
      fontWeight: "bold",
      color: "white",
      borderRadius: "20px",

    },
    portrait: {
      x: 50,
      y: 95,
      width: 40,
      height: 6,
      anchor: "bottom",
      fontSize: 4,
      animate: animatePendule(),
    },
    landscape: {
      fontSize: 3,
      x: 70,
      y: 87,
      width: 26,
      height: 11,
      anchor: "middle",
      animate: animatePendule(),
    },
    loop: true,
    controlsAnimate: "play",
    children: cta,
  };
  const configLogo = {
    backgroundImage: logo,
    style: {
      backgroundSize: "95%",
    },
    portrait: {
      x: 50,
      y: 4,
      width: 30,
      height: 10,
      anchor: "top",
    },
    landscape: {
      x: 70,
      y: 7.5,
      width: 15,
      height: 15,
      anchor: "top",
    },
  };
  const configTitle = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
      fontFamily:"novel", 
    },
    portrait: {
      x: 50,
      y: 62,
      width: 90,
      height: 45,
      anchor: "middle",
      fontSize: 4,
    },
    landscape: {
      x: 70,
      y: 52,
      width: 35,
      height: 55,
      anchor: "middle",
      fontSize: 2,
    },
    children: `‘‘${title}’’`,
  };

  return (
    <span style={{ display: finish ? "block" : "none" }}>
      <Card {...configBackground} />
      <Card {...configPorte} />
      <Card {...configLogo} />
      <Card {...configTitle} >
        <AutoScrollBox fitParent={true} height="100%" controlsMode="hidden">
        {text}
        </AutoScrollBox>
      </Card>
      <Card {...configCta} />
    </span>
  );
};

export default Text;
