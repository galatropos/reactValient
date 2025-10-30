import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip7.css";
import imageBackround from "../../../assets/image/sip7/background.webp";
import imageMain from "../../../assets/image/sip7/main.webp";
import imageCta from "../../../assets/image/sip7/cta.webp";
import Blaze from "../../../../../src/component/style/Blaze";
import animateHeartbeat from "../../../../../src/utils/animate/animateHeartbeat";
import animateScaleBlur from "../../../../../src/utils/animate/animateScaleBlur";
import useOrientation from "../../../../../src/hook/useOrientation";
import Logo from "../Logo";
const Index = () => {
    useOrientation();

  const configbackground = {
    style: {

    },
    backgroundImage: imageBackround,
    portrait: { x: 50, y: 50, width: 300, height: 235, anchor: "middle" },
    landscape: { x: 50, y: 55, width: 230, height: 260, anchor: "middle" },
    controlsAnimate: "play",
    loop: true,
    
  };

  const configMain = {
    style:{
    },
    backgroundImage: imageMain,
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      opacity: 0,
      blur: 100,
      animate: animateScaleBlur({ pauseMidMs:500000 }),
    },
    landscape: {
      x: 50,
      y: 56,
      width: 48,
      height: 100,
      anchor: "middle",
      opacity: 0,
      blur: 100,
      animate: animateScaleBlur({ pauseMidMs: 500000 }),
    },
    controlsAnimate: "play",
    loop: true,
  };

  const configCta = {
    style:{
      backgroundSize: "contain",
      filter: "drop-shadow(0 10px 10px rgba(114, 108, 99, 0.17)"

    },
    portrait: {
      x: 50,
      y: 81,
      width: 63,
      height: 100,
      anchor: "middle",
      animate: animateHeartbeat(),
      scale: 1,
    },
    landscape: { 
        x: 50.2,
        y: 50,
        width: 30,
        height: 40,
        anchor: "middle",
        animate: animateHeartbeat(),
        scale: 1,
    },
    className: "blaze",
    backgroundImage: imageCta,
    controlsAnimate: "play",
    loop: true,
  };
  return (
    <>
      <Blaze image={imageCta} classNameAssing="blaze" />

      <Card {...configbackground} />
      <Card {...configMain} />
      <Card {...configCta} />
      <Logo xl={50} yl={3.5}  style={{filter:"grayscale(1) brightness(100)"}} />

    </>
  );
};

export default Index;
