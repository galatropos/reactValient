import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip6.css";
import imageBackround from "../../../assets/image/sip6/background.webp";
import imageMain from "../../../assets/image/sip6/main.webp";
import imageCta from "../../../assets/image/sip6/cta.webp";
import Blaze from "../../../../../src/component/style/Blaze";
import animateHeartbeat from "../../../../../src/utils/animate/animateHeartbeat";
import animateScaleBlur from "../../../../../src/utils/animate/animateScaleBlur";
import useOrientation from "../../../../../src/hook/useOrientation";
import Logo from "../Logo";
const Index = () => {
    useOrientation();

  const configbackground = {
    style: {
      backgroundImage: `
       linear-gradient(to bottom, #1C1504 0 5%, transparent 40% 100%),
      url(${imageBackround})
      `,

    },
    backgroundImage: imageBackround,
    portrait: { x: 50, y: 50, width: 300, height: 235, anchor: "middle" },
    landscape: { x: 49.5, y: 55.5, width: 240, height: 280, anchor: "middle" },
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
      x: 50,
      y: 57,
      width: 54,
      height: 118,
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
      y: 71,
      width: 50,
      height: 100,
      anchor: "middle",
      animate: animateHeartbeat(),
      scale: 1,
    },
    landscape: { 
        x: 50,
        y: 88,
        width: 16,
        height: 20,
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

      <Logo xl={50} yl={9.5}  style={{filter:"grayscale(1) brightness(1000)"}} />

    </>
  );
};

export default Index;
