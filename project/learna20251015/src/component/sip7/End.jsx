import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip1.css";
import imageLogotipo from "../../../assets/image/logo.webp";
import { registerOpenOnClick } from "../../../../../src/utils/registerOpenOnClick";
const animate = [
    [{ scale: 0.1 }, 800],
    [{ scale: -0.1 }, 800],
]

const End = () => {
  registerOpenOnClick();

    const configCta = {
      style: {
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        background: "#3EABFF",
        borderRadius: "30px",
        fontWeight: "800",
  
      },
      portrait: {
        x: 50,
        y: 71,
        width: 60,
        height: 7,
        fontSize: 5,
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
      children: "DESCARGAR AHORA",
    };
  const logo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "50px",
    },
    portrait: {
      x: 50,
      y: 33,
      width: 45,
      height: 24,
      anchor: "top",
    },
    landscape: {
      x: 25,
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
    },
    portrait: {
      x: 50,
      y: 20,
      width: 83,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 7,
    },
    landscape: {
      x: 25,
      y: 50,
      fontSize: 3.5,
      width: 45,
      height: 10,
      anchor: "middle",
      scale: 1,
    },
    children: "DOWNLOAD NOW AND START LEARNING!" ,
  };

  const part2 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: 900,
      flexDirection: "column",
      lineHeight: 1,
    },
    portrait: {
      x: 50,
      y: 69,
      width: 70,
      height: 10,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
      fontSize: 7,
    },
    landscape: {
      x: 25,
      y: 90,
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
      <Card {...part1} />
      <Card {...part2} />
      <Card {...configCta} />

    </>
  );
};

export default End;
