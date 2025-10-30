import React from 'react'
import Card from '../../../../../src/component/Card'
import "../../../assets/style/concept.css"
import imageLogotipo from "../../../assets/image/logoCandy.webp";
import imageHand from "../../../assets/image/concept1/hand.png";
import FontChange from '../../../../../src/component/FontChange';
import Plus_Jakarta_Sans from '../../../../../src/assets/font/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf';
const Concept1 = ({title="MEET YOU NEXT BOOK BOYFRIEND"}) => {
FontChange({fontUrl:[Plus_Jakarta_Sans],fontFamily:["Plus_Jakarta_Sans"]})


const configLogo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 3,
      width: 40,
      height: 9,
      anchor: "top",
    },
    landscape: {
      x: 1,
      y: 4,
      width: 20,
      height: 13,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
    },
  };
  const configTitle = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
    },
    portrait: {
      x: 50,
      y: 18,
      width: 60,
      height: 10,
      anchor: "middle",
      scale: 1,
      fontSize: 6,
      lineHeight: 4.5,
    },
    landscape: {
      x: 50,
      y: 5,
      fontSize: 4,
      width: 50,
      height: 10,
      anchor: "top",
      scale: 1,
    },
  };
  const configMain = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
      border: "1px solid white",
    },
    portrait: {
      x: 50,
      y: 52,
      width: 60,
      height: 50,
      anchor: "middle",
      scale: 1,
      fontSize: 9,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 30,
      height: 50,
      anchor: "middle",
      scale: 1,
      fontSize: 3.5,
    },
  }
  const configCta = {
    style: {
      background: "#D63378",
      color: "white",
      fontWeight: "900",
      
    },
    portrait: {
      x: 50,
      y: 93,
      width: 50,
      height: 9,
      anchor: "bottom",
      fontSize: 6.3,
      scale: 1,
    },
    landscape: {
      x: 50,
      y: 90,
      width: 39,
      height: 11,
      anchor: "middle",
      fontSize: 2.1,
      scale: 1,
    },
  };

  const configHand = {
    style: {
      backgroundImage: `url(${imageHand})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 20,
      y: 70,
      width: 30,
      height: 30,
      anchor: "middle",
      rotate: 90,
    },
    landscape: {
      rotate: 90,
      x: 35,
      y: 70,
      width: 20,
      height: 20,
      anchor: "middle",
    },
  };
  return (
    <>
    <Card {...configLogo}></Card>
    <Card {...configTitle}>{title} </Card>
    <Card {...configMain}> </Card>
    <Card {...configCta}>WATCH NOW </Card>
    <Card {...configHand} />
    </>
  )
}

export default Concept1