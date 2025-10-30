import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip2.css";
import imageBackground from "../../../assets/image/sip2/background.jpg";
import imageLogo from "../../../assets/image/logo.png";
import FontChange from "../../../../../src/component/FontChange";

import inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import Dancing_Script from "../../../../../src/assets/font/Dancing_Script/DancingScript-VariableFont_wght.ttf";
import Playfair_Display from "../../../../../src/assets/font/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf";
const Index = () => {

  FontChange(
    {fontFamily:["inter","Dancing_Script","Playfair_Display"],fontUrl:[inter,Dancing_Script,Playfair_Display]}

  );
  const animateScale = [
    [{ scale: +0.089 }, 100],
    [{ scale: -0.089 }, 100],
    [{ scale: +0.059 }, 80],
    [{ scale: -0.059 }, 80],
    [{ scale: +0.029 }, 60],
    [{ scale: -0.029 }, 60],
    [{ scale: 0.0 }, 1],
    [{}, 2000],
  ];

  const configBackground = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "87% 10%",
      borderSolid: "1px solid black",
    },
    backgroundImage: imageBackground,
    portrait: {
      x: -2,
      y: 50,
      width: 25,
      height: 102,
      anchor: "left",
    },
    landscape: {
      x: -2,
      y: 50,
      width: 25,
      height: 102,
      anchor: "left",
    },
  };


  const configCTA1 = {
    style: {
      background: "black",
      color: "white",
      borderRadius: "100px",
      fontWeight: "500",
      padding: "0px 14px",
    },
    portrait: {
      x: 59,
      y: 92,
      width: 46,
      height: 7,
      anchor: "middle",
      fontSize: 3.4,
      scale: 1,
      animate: animateScale,
    },
    landscape: {
      x: 82.7,
      y: 70,
      width: 26.7,
      height: 14,
      anchor: "bottom",
      animate: animateScale,
      fontSize: 2,
      scale: 1,
    },
    controlsAnimate: "play",
    loop: true,
    children: "Claim your discount before the holidays end",
  };

  const configLogo = {
    style: {
    },
    backgroundImage: imageLogo,

    portrait: {
      x: 61,
      y: 5,
      width: 60,
      height: 5,
      anchor: "top",
    },
    landscape: {
      x: 83.5,
      y: 31,
      width: 29,
      height: 7,
      anchor: "top",
    },
  };
  const configMain = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
    },
    portrait: {
      x: 50,
      y: 22,
      width: 80,
      height: 100,
      anchor: "middle",
      scale: 1,
      fontSize: 9,
    },
    landscape: {
      x: 30,
      y: 10,
      width: 50,
      height: 60,
      anchor: "middle",
      scale: 1,
      fontSize: 3.5,
    },
  };
  const configPage1 = {
    style: {
      color: "#373737",
      fontWeight: "400",
      flexDirection: "column",
      gap: 40,
      border: "1px solid white",
      textAlign: "left",
    },
    portrait: {
      x: 61,
      y: 49,
      width: 50,
      height: 50,
      anchor: "middle",
      scale: 1,
      fontSize: 4,
    },
    landscape: {
      x: 25,
      y: 50,
      width: 41,
      height: 45,
      anchor: "left",
      fontSize: 2.1,
    },
  };

  return (
    <>
      {/*  */}
      <Card {...configBackground} />

      <Card {...configLogo} />
      <Card {...configMain}></Card>
      <Card {...configPage1}>
        <span className="text1">
          We’re not saying you have to write a <span className="text_cursive">memoir</span>  — but as the holidays come
          and memories fill the air, it’s the perfect time to preserve yours
          forever.
        </span>
        <span className="text_left">
          This season, we’re inviting <span className="text2">15 women</span> to join guided sessions that turn
          your life stories into a beautiful hardcover book — a gift for
          yourself, and for the generations who follow.
        </span>
        <span className="text_left">
          Answer <span className="text2">50 simple</span> questions, and we’ll craft your story in time to
          share or gift it by Christmas.
        </span>
      </Card>

      <Card {...configCTA1} />
    </>
  );
};

export default Index;
