import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip1.css";
import imageBackround from "../../../assets/image/sip3/background.webp";
import imageMain from "../../../assets/image/sip3/main.webp";
import imageCta from "../../../assets/image/sip3/cta.webp";
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
    portrait: { x: 50, y: 50, width: 300, height: 260, anchor: "middle" },
    landscape: { x: 70, y: 46, width: 250, height: 300, anchor: "middle" },
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
      x: 36,
      y: 6,
      width: 64.5,
      height: 140,
      anchor: "top",
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
      filter: "drop-shadow(0 20px 20px #37322AA0)"
    },
    portrait: {
      x: 50,
      y: 75,
      width: 70,
      height: 100,
      anchor: "middle",
      animate: animateHeartbeat(),
      scale: 1,
    },
    landscape: { 
        x: 74,
        y: 89,
        width: 35,
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
      <Logo xl={73.9}  yl={12.9} width={30} height={30}  />

    </>
  );
};

export default Index;
