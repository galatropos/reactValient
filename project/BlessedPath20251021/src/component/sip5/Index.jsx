import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip5.css";
import imageBackround from "../../../assets/image/sip5/background.webp";
import imageMain from "../../../assets/image/sip5/main.webp";
import imageCta from "../../../assets/image/sip5/cta.webp";
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
    landscape: { x: 50, y: 49.5, width: 180, height: 310, anchor: "middle" },
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
   
      animate: animateScaleBlur({ pauseMidMs: 500000 }),
    },
    landscape: {
      x: 49.7,
      y: 58.5,
      width: 50,
      height: 110,
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
      filter: "drop-shadow(0 20px 5px rgba(114, 108, 99, 0.17)"

    },
    portrait: {
      x: 50,
      y: 71,
      width: 50,
      height: 100,
      anchor: "middle",
      animate: animateHeartbeat(),
      scale: 1,
    },
    landscape: { 
        x: 50,
        y: 86,
        width: 20,
        height: 25,
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
      <Logo xl={50} yl={10} width={15} height={25}  />

    </>
  );
};

export default Index;
