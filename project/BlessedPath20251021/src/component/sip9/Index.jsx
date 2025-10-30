import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip9.css";
import imageBackround from "../../../assets/image/sip9/background.webp";
import imageMain from "../../../assets/image/sip9/main.webp";
import imageMain2 from "../../../assets/image/sip9/main2.webp";
import imageCta from "../../../assets/image/sip9/cta.webp";
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
    portrait: { x: 36, y: 66, width: 100, height: 66, anchor: "middle" },
    landscape: { x: 3, y: 16, width: 45, height: 92, anchor: "left-top" },
    controlsAnimate: "play",
    loop: true,
    
  };

  const configMain = {
    style:{
    },
    backgroundImage: useOrientation()==="portrait"?imageMain:imageMain2,
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
      x: 74,
      y: 54.5,
      width: 45,
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
        x: 75,
        y: 88,
        width: 22,
        height: 50,
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
      <Logo xl={25.5} yl={8}  />

    </>
  );
};

export default Index;
