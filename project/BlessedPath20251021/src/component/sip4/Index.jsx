import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip4.css";
import imageBackround from "../../../assets/image/sip4/background.webp";
import imageMain from "../../../assets/image/sip4/main.webp";
import imageCta from "../../../assets/image/sip4/cta.webp";
import Blaze from "../../../../../src/component/style/Blaze";
import animateHeartbeat from "../../../../../src/utils/animate/animateHeartbeat";
import animateScaleBlur from "../../../../../src/utils/animate/animateScaleBlur";
import imageBackround1l from "../../../assets/image/sip4/mainl.webp";
import imageBackroundl from "../../../assets/image/sip4/bg4.png";
import Logo from "../Logo";
const Index = () => {

  const configbackground = {
  
    backgroundImage: imageBackround,
    portrait: { x: 50, y: 50, width: 290, height: 235, anchor: "middle" },
    landscape: { hidden:true },
     
  };

  const configbackgroundl1 = {

    backgroundImage: imageBackround1l,
    portrait: { hidden:true },
    landscape: { x:29.5, y: 68, width: 70, height: 160, anchor: "middle" },
    
  };

  const configbackgroundl2 = {
    backgroundImage: imageBackroundl,
    portrait: { hidden:true },
    landscape: { x:3.5, y:1.3, width: 93, height: 98, anchor: "left-top" },
    
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
      x: 75,
      y: 48,
      width: 45,
      height: 120,
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
        x: 75.2,
        y: 81.5,
        width: 25,
        height: 30,
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

      <Card {...configbackgroundl2} />
      <Card {...configbackgroundl1} />
      <Card {...configbackground} />
      <Card {...configMain} />
      <Blaze image={imageCta} classNameAssing="blaze" />
      <Card {...configCta} />
      <Logo xl={75.2} yl={14} width={25} height={25}  />

    </>
  );
};

export default Index;
