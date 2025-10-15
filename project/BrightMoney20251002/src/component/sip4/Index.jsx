import React from "react";
import "../../../assets/style/sip4.css";
import Card from "../../../../../src/component/Card";
import Disclamer from "../Disclamer";
import card from "../../../assets/image/sip4/card.webp";
import content from "../../../assets/image/sip4/content.webp";
import money1 from "../../../assets/image/sip4/money1.webp";
import money2 from "../../../assets/image/sip4/money2.webp";
import number from "../../../assets/image/sip4/number.webp";
import glowNumber from "../../../assets/image/sip4/glowNumber.webp";
import rate from "../../../assets/image/sip4/rate.webp";
import Logo from "../Logo";

const animateCard=[
  [{ x: -0.20, y:  0.28, rotateX:  3, rotateY: -3 }, 200],
  [{ x: -0.10, y:  0.22, rotateX:  2, rotateY: -2 }, 200],
  [{ x:  0.00, y:  0.18, rotateX:  2, rotateY:  0 }, 200],
  [{ x:  0.10, y:  0.22, rotateX:  2, rotateY:  2 }, 200],
  [{ x:  0.20, y:  0.28, rotateX:  3, rotateY:  3 }, 200],

  // vuelta (negativos exactos para cerrar en 0)
  [{ x:  0.20, y: -0.28, rotateX: -3, rotateY:  3 }, 200],
  [{ x:  0.10, y: -0.22, rotateX: -2, rotateY:  2 }, 200],
  [{ x:  0.00, y: -0.18, rotateX: -2, rotateY:  0 }, 200],
  [{ x: -0.10, y: -0.22, rotateX: -2, rotateY: -2 }, 200],
  [{ x: -0.20, y: -0.28, rotateX: -3, rotateY: -3 }, 200],
]
const landscape={

  x: 35,
  y: 25,
  width: 60,
  height: 190,
  anchor: "left",
}

const Index = () => {
  const configCard = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${card})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 105,height: 105,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      animate:animateCard

    },
    landscape: {
      animate:animateCard,
      ...landscape
    },
    loop:true,
    controlsAnimate: "play",
  };
  const configContent = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${content})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 105,height: 105,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: -3.2,
      y: 82,
      width: 45,
      height: 100,
      anchor: "left",
    },
  };

  const configRate = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${rate})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 105,height: 105,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      
      ...landscape
    },
  };
  const configMoney1 = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${money1})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 105,height: 105,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      
      ...landscape
    },
  };
  const configMoney2 = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${money2})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 105,height: 105,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape,
  };
  const configGlowNumber= {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${glowNumber})`,
      '--img': `url(${glowNumber})`,
      '--pos': 'center',
      '--size': 'contain',
    },
    portrait: {
      x: 50,
      y: 50,
      width: 105,height: 105,
      anchor: "middle",
      rotate: 0,
      scale: 1,      

    },
    landscape,
    loop:true,
    controlsAnimate: "play",
  };
  const configNumber= {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${number})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 105,height: 105,
      anchor: "middle",
      rotate: 0,
      scale: 1,      

    },
    landscape,
    loop:true,
    controlsAnimate: "play",
  };
    return (
    <>

      <Card {...configContent} />
      <Card {...configMoney1} />
      <Card {...configCard} />
      <Card {...configRate} />
      <Card {...configNumber}  />
      <Card  className="price-bg" {...configGlowNumber}  />
      <Card {...configMoney2} />
      <Disclamer color={true} option={false} />

<Logo />
    </>
  );
};

export default Index;
