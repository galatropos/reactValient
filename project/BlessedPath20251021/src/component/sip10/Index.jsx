import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip10.css";
import imageBackround from "../../../assets/image/sip10/background.webp";
import imageMain from "../../../assets/image/sip10/main.webp";
import imageCta from "../../../assets/image/sip10/cta.webp";
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
    landscape: { x: 50, y: 46, width: 160, height: 260, anchor: "middle" },
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
      y: 45,
      width: 35,
      height: 90,
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
        x: 45,
        y: 81.5,
        width: 21,
        height: 15,
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
          <Logo xl={50} yl={6}   />
    </>
  );
};

export default Index;
