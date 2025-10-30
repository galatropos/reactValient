import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip1.css";
import imageBackround from "../../../assets/image/sip1/background.webp";
import imageMain from "../../../assets/image/sip1/main.webp";
import imageCta from "../../../assets/image/sip1/cta.webp";
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
    portrait: { x: 82, y: 65, width: 125, height: 125, anchor: "middle" },
    landscape: { x: 25, y: 60, width: 80, height: 165, anchor: "middle" },
    controlsAnimate: "play",
    loop: true,
    
  };

  const configMain = {
    style:{
        filter: "drop-shadow(0 0 5px white)",
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
   
      animate: animateScaleBlur({ pauseMidMs: 500000 }),
    },
    landscape: {
      x: 85,
      y: 62,
      width: 55,
      height: 120,
      anchor: "middle",
      opacity: 0,
      blur: 100,
      animate: animateScaleBlur({ pauseMidMs: 500000 }),
    },
    animate: animateHeartbeat(),
    controlsAnimate: "play",
    loop: true,
  };

  const configCta = {
    style:{
      backgroundSize: "contain",
    },
    portrait: {
      x: 50,
      y: 75,
      width: 100,
      height: 13,
      anchor: "middle",
      animate: animateHeartbeat(),
      scale: 1,
    },
    landscape: { 
        x: 74,
        y: 95,
        width: 34,
        height: 60,
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
      <Logo xl={25.7} yl={8}   />
    </>
  );
};

export default Index;
