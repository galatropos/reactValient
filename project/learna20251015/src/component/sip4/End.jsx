import React, { useEffect } from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip1.css";
import imageLogotipo from "../../../assets/image/logo.webp";
import useRedirectMIP from "../../../../../src/hook/useRedirectMIP";
import { registerOpenOnClick } from "../../../../../src/utils/registerOpenOnClick";
const animate = [
    [{ scale: 0.1 }, 800],
    [{ scale: -0.1 }, 800],
]

const End = () => {
  registerOpenOnClick();
  useRedirectMIP({
    appstore:
      "https://apps.apple.com/ve/app/learna-ai-aprender-ingl%C3%A9s/id6478287397",
    playStore:
      "https://play.google.com/store/apps/details?id=com.codeway.aitutor",
    windows: "https://ailearna.com/es",
  });

    const configCta = {
      style: {
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        background: "#3EABFF",
        borderRadius: "20px",
        fontWeight: "900",
  
      },
      portrait: {
        x: 50,
        y: 59.5,
        width: 58,
        height: 6,
        fontSize: 6,
        anchor: "top",
        rotate: 0,
        scale: 1,
        animate,
      },
      landscape: {
        width: 34,
        fontSize: 3.5,
        height: 13,
        rotate: 0,
        animate,
        scale: 1,
        x: 90,
        y: 50,
        anchor: "right",
      },
      loop: true,
      controlsAnimate: "play",
      children: "Más información",
    };
  const logo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "40px",
    },
    portrait: {
      x: 50,
      y: 33,
      width: 30,
      height: 17,
      anchor: "top",
    },
    landscape: {
      x: 25,
      y: 20,
      width: 15,
      height: 25,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };

  const part2 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: 900,
      flexDirection: "column",
    },
    portrait: {
      x: 50,
      y: 60,
      width: 40,
      height: 10,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
      fontSize: 4.5,
    },
    landscape: {
      x: 25,
      y: 75,
      fontSize: 4,
      width: 30,
      height: 10,
      anchor: "bottom",
      scale: 1,
    },
    children: "Speak & Learn English: Learna" ,
  };

  return (
    <>
      <Card {...logo} />
      <Card {...part2} />
      <Card {...configCta} />

    </>
  );
};

export default End;
