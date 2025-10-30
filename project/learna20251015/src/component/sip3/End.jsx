import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip2.css";
import imageLogotipo from "../../../assets/image/logo.webp";
import imageName from "../../../assets/image/name.png";
import { registerOpenOnClick } from "../../../../../src/utils/registerOpenOnClick";
import useRedirectMIP from "../../../../../src/hook/useRedirectMIP";
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
        borderRadius: "30px",
        fontWeight: "600",
        borderBottom: "10px solid #0082D2",
  
      },
      portrait: {
        x: 50,
        y: 73,
        width: 85,
        height: 9,
        fontSize: 7,
        anchor: "top",
        rotate: 0,
        scale: 1,
        animate,
      },
      landscape: {
        width: 35,
        fontSize: 3,
        height: 15,
        rotate: 0,
        animate,
        scale: 1,
        x: 95,
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
      borderRadius: "100px",
    },
    portrait: {
      x: 50,
      y: 29,
      width: 56,
      height: 31,
      anchor: "top",
    },
    landscape: {
      x: 30,
      y: 7,
      width: 15,
      height: 25,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };
  const configName = {
    style: {
      backgroundImage: `url(${imageName})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "100px",
    },
    portrait: {
      x: 50,
      y: 49,
      width: 31,
      height: 31,
      anchor: "top",
    },
    landscape: {
      x: 30,
      y: 7,
      width: 15,
      height: 25,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };
  const part1 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: 900,
      flexDirection: "column",
      color: "#A4A4A4",
    },
    portrait: {
      x: 50,
      y: 16,
      width: 83,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 6.5,
    },
    landscape: {
      x: 30,
      y: 51,
      fontSize: 4,
      width: 45,
      height: 10,
      anchor: "middle",
      scale: 1,
    },
    children: "¡DESCARGA AHORA Y COMIENZA APRENDER! " ,
  };


  return (
    <>
      <Card {...logo} />
      <Card {...configName} />
      <Card {...part1} />
      <Card {...configCta} />

    </>
  );
};

export default End;
