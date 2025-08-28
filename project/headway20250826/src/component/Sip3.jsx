import React from "react";
import landscape from "../../assets/video/sip3/landscape.mp4";
import portrait from "../../assets/video/sip3/portrait.mp4";
import VideoToFramesPlayer from "../../../../src/component/VideoToFramesPlayer";
import Card from "../../../../src/component/Card";
import "../../assets/style/sip3.css";


const Sip3 = () => {
  const animate = [
    [{ scale: -0.5 }, 3000],
    [{ scale: 0.5 }, 3000],
  ];
  const scale = 1.5;
  const videoStyle = {
    style: {},
    portrait: {
      height: 100,
      width: 100,
      fontSize: 6,
      anchor: "bottom",
      x: 50,
      y: 99,
    },
    landscape: {
      height: 100,
      width: 100,
      fontSize: 6,
      anchor: "middle",
      x: 50,
      y: 50,
    },
  };
  const header = {
    style: {
      color: "#0066FD",
      fontWeight: "bold",
      rotate: 0,
      transformOrigin: "center center",
    },
    portrait: {
      height: 10,
      width: 50,
      fontSize: 4,
      anchor: "middle",
      scale,
      rotate: 0,
      x: 50,
      y: 50,
      animate,
    },
    landscape: {
      height: 10,
      width: 50,
      fontSize: 4,
      anchor: "middle",
      scale,
      rotate: 0,
      x: 50,
      y: 50,
      animate,
    },
  };
  const logo = {
    style: {
      backgroundImage: `url(https://headway-product.com/images/logo.svg)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      transformOrigin: "bottom center",
      backgroundPosition: "center",
    },
    portrait: {
      height: 3,
      width: 30,
      fontSize: 6,
      anchor: "bottom",
      x: 50,
      y: 43,
      scale,
      rotate: 0,
      animate,
    },
    landscape: {
      height: 7,
      width: 20,
      fontSize: 6,
      anchor: "bottom",
      x: 50,
      y: 43,
      scale,
      rotate: 0,
      animate,
    },
  };

  const button = {
    style: {
      backgroundColor: "#1E6FFF",
      color: "white",
      fontWeight: "bold",
      borderRadius: "20px",
      transformOrigin: "top ",
    },
    portrait: {
      height: 6,
      width: 44,
      fontSize: 3,
      anchor: "top",
      x: 50,
      y: 55,
      scale,
      rotate: 0,
      animate,
    },
    landscape: {
      height: 10,
      width: 22,
      fontSize: 1.4,
      anchor: "top",
      x: 50,
      y: 58,
      scale,
      rotate: 0,
      animate,
    },
  };
  const white = {
    style: {
      backgroundColor: "#F2F2F4",
      borderRadius: "20px",
    },
    portrait: {
      height: 18,
      width: 54,
      fontSize: 6,
      anchor: "middle",
      x: 50,
      y: 51,
    },
    landscape: {
      height: 13,
      width: 29,
      fontSize: 6,
      anchor: "middle",
      x: 50,
      y: 53,
    },
  };

  const white2 = {
    style: {
      backgroundColor: "#F2F2F4",
      borderRadius: "10px",
    },
    portrait: {
      height: 18,
      width: 54,
      fontSize: 6,
      anchor: "middle",
      x: 50,
      y: 51,
      hidden: true,
    },
    landscape: {
      height: 10,
      width: 20,
      fontSize: 6,
      anchor: "middle",
      x: 50,
      y: 41,
    },
  };
  return (
    <>
      <VideoToFramesPlayer
        landscapeSrc={landscape}
        portraitSrc={portrait}
        {...videoStyle}
        fps={24} // Ajusta el muestreo
        loop={true} // true si quieres que repita
      />
      <Card {...white} />
      <Card {...white2} />

      <Card {...header} loop={true} controlsAnimate="play">
        {" "}
        Back to School Special
      </Card>
      <Card {...logo} loop={true} controlsAnimate="play" />
      <Card {...button} loop={true} controlsAnimate="play">
        Start Microlearning Today!
      </Card>
    </>
  );
};
export default Sip3;
