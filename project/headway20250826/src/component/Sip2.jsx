import React from "react";
import landscape from "../../assets/video/sip2/landscape.mp4";
import portrait from "../../assets/video/sip2/portrait.mp4";
import VideoToFramesPlayer from "../../../../src/component/VideoToFramesPlayer";
import Card from "../../../../src/component/Card";
import "../../assets/style/sip2.css";

const Sip2 = () => {
  const animate = [
    [{ scale: 0 }, 3000],
    [{ scale: 0.2 }, 300],
    [{ scale: -0.2 }, 300],
  ];
  const videoStyle = {
    style: {},
    portrait: {
      height: 95,
      width: 95,
      fontSize: 6,
      anchor: "bottom",
      x: 50,
      y: 99,
    },
    landscape: {
      height: 95,
      width: 95,
      anchor: "bottom",
      x: 50,
      y: 106,
    },
  };
  const header = {
    loop: true,
    controlsAnimate: "play",
    style: {
      color: "#0066FD",
      fontWeight: "bold",
      transformOrigin: " center",
    },
    portrait: {
      height: 10,
      width: 100,
      fontSize: 8,
      anchor: "left-top",
      x: 0,
      y: 6.5,
      scale: 1,
      animate,
    },
    landscape: {
      height: 22,
      width: 54,
      fontSize: 4.2,
      anchor: "left-top",
      x: 0,
      y: 0,
      animate,
      scale: 1,
    },
  };
  const logo = {
    style: {
      backgroundImage: `url(https://headway-product.com/images/logo.svg)`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    portrait: {
      height: 6,
      width: 30,
      fontSize: 6,
      anchor: "top",
      x: 50,
      y: 1,
    },
    landscape: {
      height: 25,
      width: 25,
      fontSize: 6,
      anchor: "left-top",
      x: 60.5,
      y: -3,
    },
  };
  const whiteT = {
    style: {
      backgroundColor: "white",
    },
    portrait: {
      height: 30,
      width: 1000,
      anchor: "bottom",
      x: -2,
      y: 12,
    },
    landscape: {
      height: 10,
      width: 1000,
      fontSize: 6,
      anchor: "bottom",
      x: -2,
      y: -2,
    },
  };

  const whiteB = {
    style: {
      backgroundColor: "white",
    },
    portrait: {
      height: 5,
      width: 10000,
      anchor: "bottom",
      x: -2,
      y: 103,
    },
    landscape: {
      height: 10,
      width: 1000,
      fontSize: 6,
      anchor: "bottom",
      x: -2,
      y: 110,
    },
  };
  const whiteR = {
    style: {
      backgroundColor: "white",
    },
    portrait: {
      height: 1000,
      width: 5,
      anchor: "left",
      x: -19,
      y: -2,
    },
    landscape: {
      height: 1000,
      width: 5,
      anchor: "left",
      x: -2,
      y: -2,
    },
  };
  const whiteL = {
    style: {
      backgroundColor: "white",
    },
    portrait: {
      height: 1000,
      width: 5,
      anchor: "left",
      x: 112,
      y: -2,
    },
    landscape: {
      height: 1000,
      width: 5,
      anchor: "left",
      x: 97,
      y: -2,
    },
  };

  const white = {
    style: {
      backgroundColor: "white",
    },
    portrait: {
      height: 1000,
      width: 5,
      anchor: "left",
      x: 99.5,
      y: -2,
      hidden: true,
    },
    landscape: {
      height: 10,
      width: 30,
      anchor: "left",
      x: 0,
      y: 18,
    },
  };


  return (
    <>
      <VideoToFramesPlayer
        landscapeSrc={landscape}
        portraitSrc={portrait}
        cotroller="stop"
        {...videoStyle}
        fps={24} // Ajusta el muestreo
        loop={true} // true si quieres que repita
      />
      <Card {...whiteT} />
      <Card {...whiteB} />
      <Card {...whiteL} />
      <Card {...whiteR} />
      <Card {...white} />

      <Card {...header}> Hola mundo</Card>
      <Card {...logo} />
    </>
  );
};
export default Sip2;
