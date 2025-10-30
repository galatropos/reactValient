import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip1.css";
import imageLogotipo from "../../../assets/image/logo.webp";
import { registerOpenOnClick } from "../../../../../src/utils/registerOpenOnClick";
import useRedirectMIP from "../../../../../src/hook/useRedirectMIP";
const animate = [
  [{ scale: 0.1 }, 800],
  [{ scale: -0.1 }, 800],
];

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
      fontWeight: "700",
    },
    portrait: {
      x: 50,
      y: 71,
      width: 70,
      height: 8,
      fontSize: 5.8,
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
    children: "MÁS INFORMACIÓN",
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
      y: 32,
      width: 48,
      height: 26,
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
      lineHeight: 1.2,
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
    children: "DOWNLOAD NOW AND START LEARNING!",
  };

  const part2 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: 800,
      flexDirection: "column",
      lineHeight: 1.2,
    },
    portrait: {
      x: 50,
      y: 69,
      width: 50,
      height: 10,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
      fontSize: 6,
    },
    landscape: {
      x: 25,
      y: 90,
      fontSize: 4,
      width: 40,
      height: 10,
      anchor: "bottom",
      scale: 1,
    },
    children: "Speak & Learn English: Learna",
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
