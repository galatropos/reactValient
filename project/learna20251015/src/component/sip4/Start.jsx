import React from "react";
import Card from "../../../../../src/component/Card";
import imageLogotipo from "../../../assets/image/logo.webp";
import imageAvatar from "../../../assets/image/sip4/avatar.webp";
import imageContent from "../../../assets/image/sip4/content.webp";
import "../../../assets/style/sip4.css";
import Globe from "./Globe";
import CTA from "./CTA";
import Hand from "./Hand";


const Start = ({setActive}) => {


  const configLogo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 4,
      y: 2,
      width: 15,
      height: 8,
      anchor: "left-top",
    },
    landscape: {
      x: 2,
      y: 2,
      width: 8,
      height: 13,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
    },
  };

  const configAvatar = {
    style: {
      backgroundImage: `url(${imageAvatar})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 33,
      y: 6,
      width: 44,
      height: 18,
      anchor: "top",
    },
    landscape: {
      x: 22.6,
      y: 16,
      width: 33,
      height: 65,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };

 
  const configMain = {
    style: {
      borderRadius: "100px",
      border: "1px solid #fff",
      backgroundColor: "#fff",
      color: "#3561AE",
      flexDirection: "column",
      justifyContent: "start",
      lineHeight: 0.8,
      fontWeight: 600,
    },
    portrait: {
      x: 0,
      y: 29,
      width: 99,
      height: 75,
      anchor: "left-top",
      fontSize:12
    },
    landscape: {
      x: 93,
      y: 2,
      width: 50,
      height: 95,
      anchor: "right-top",
      fontSize:5
    },
  };

const configActive = {
  style: {
    background: "transparent",
  },
  portrait: {
    x: 50,
    y: 50,
    width: 110,
    height:110,
    anchor: "middle",
  },
  landscape: {
    x: 50,
    y: 50,
    width: 110,
    height:110,
    anchor: "middle",
  },
  onClick:()=>setActive(false) 
}

const configContent = {
  style: {
    backgroundImage: `url(${imageContent})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "20px",
  },
  portrait: {
    x: 50,
    y: 14,
    width: 86,
    height: 86,
    anchor: "top",
  },
  landscape: {
    x: 95,
    y: 4,
    width: 55,
    height: 80,
    anchor: "right-top",
    rotate: 0,
    scale: 1,
  },
};

  return (
    <>
      <Card {...configLogo} />
      <Card {...configAvatar} />
    <Card {...configActive} />
    <Card {...configMain} />
      <Card {...configContent} />
      <CTA xLandscape={68} yLandscape={90} xPortrait={50} yPortrait={89.5} setActive={setActive}/>
      <Globe />

    <Hand />
    <Card {...configActive} />
    </>
  );
};

export default Start;
