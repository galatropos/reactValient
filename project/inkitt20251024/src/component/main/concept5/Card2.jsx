import React from "react";
import Card from "../../../../../../src/component/Card";

const Card2 = ({ image, title, play = false}) => {

  const controlsAnimate = play ? "play" : "stop";
  const animate = [[{ opacity: -1,blur:10, }, 200]];

  const animateCard = [
    [{ rotate: +45,  x: +20,  y: -3,  scale: +0.05, scaleX: +0.04, scaleY: +0.54 }, 120],
    [{ rotate: +45,  x: +20,  y: -5,  scale: -0.02,                 scaleY:  0.52 }, 100],
    [{ rotate: +45,  x: +15,  y: -7,  scale: -0.03, blur: +2 },                      160],
    [{ rotate: +45,  x: +25,  y: -9,  scale: -0.04, opacity: -0.5, blur: +2 },       200],
    [{ rotate: +180, x: +100, y: -2,  opacity: -0.5 },                                160],
  ];

  const configImage = {
    style: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      outline: "5px solid white",
    },
    portrait: {
      x: 55,
      y: 45,
      width: 45,
      height: 40,
      anchor: "middle",
      opacity: 1,
      rotate: 0,
      scaleX : 1,
    blur: 0,
    rotateY:0,
    rotateX:0,
    backdropBlur: 0,
    scale: 1,
    scaleY : 1,
      animate:animateCard,

    },
    landscape: {
      x: 1,
      y: 2,
      width: 97,
      height: 76,
      anchor: "left-top",
      rotate: 0,
      opacity: 1,
      scale: 1,
      scaleX : 1,
    blur: 0,
    rotateY:0,
    rotateX:0,
    backdropBlur: 0,
    scaleY : 1,
      animate:animateCard,
    },
    loop: false,
    controlsAnimate,
  };

  const configTitle = {
    style: {
      background: "#000",
    },
    portrait: {
      x: 50,
      y: 10,
      width: 100,
      height: 10,
      opacity: 1,
      anchor: "middle",
      animate,
        scaleX : 1,
      blur: 0,
      rotateY:0,
      rotateX:0,
      backdropBlur: 0,
      scale: 1,
      scaleY : 1,
      rotate: 1,
      
    },
    landscape: {
      x: 50,
      y: 50,
      width: 8,
      height: 14,
      anchor: "middle",
      scale: 1,
      opacity: 1,
      fontSize: 3.5,      animate,

    },
    children: title,
    loop: false,
    controlsAnimate,
  };
  return (
    <>
      <Card key={"image"} {...configImage} />
      <Card key={"title"} {...configTitle} />
    </>
  );
};

export default Card2;
