import React from "react";
import Card from "../../../../../../src/component/Card";

const Card1 = ({ image, title, play = false, animationEnd = false }) => {
  const animate = [[{ opacity: -1,blur:10, }, 200]];
  const controlsAnimate = play ? "play" : "stop";
  
  
  const animateEnd = [
  [{ rotateY: +90,  scaleX: -0.08, scaleY: +0.08, scale: +1.04 ,blur:2 }, 250],
  [{ rotateY: +180, scaleX: +0.08, scaleY: -0.08, scale: 1.06  ,blur:4}, 250],
  [{ rotateY: +360, scaleX: -0.02, scaleY: +0.02, scale: +1.02 ,blur:8}, 250],
  [{ rotateY:   0,  scaleX:  0.00, scaleY:  0.00, scale:  1.00 ,blur:16},  250],
];

  let animateCard=[
    [{ rotate: -45,  x: -20,  y: -3,  scale: +0.05, scaleX: +.04, scaleY: +.54 }, 120],
    [{ rotate: -45, x: -20,  y: -5,  scale: -0.02,scaleY: .52 }, 100],
    [{ rotate: -45, x: -15,  y: -7,  scale: -0.03, blur: +2 },                        160],
    [{ rotate: -45, x: -25,  y: -9,  scale: -0.04, opacity: -0.5, blur: +2 },         200],
    [{      rotate: -180,         x: -100, y: -2,  opacity: -0.5 },                                  160],
  ];
  const configTitle = {
    style: {
      background: "#000",
    },
    portrait: {
      x: 50,
      y: 10,
      width: 100,
      height: 10,
      anchor: "middle",
      blur: 0,
      opacity: 1,
      animate: animate,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 8,
      height: 14,
      anchor: "middle",
      scale: 1,
      blur: 0,
      opacity: 1,
      animate: animate,

      fontSize: 3.5,
    },
    children: title,
    loop: false,
    controlsAnimate,
  };
  const configImage = {
    style: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      outline: "5px solid white",
    },
    portrait: {
        animate: animationEnd ? animateEnd : animateCard,
      x: 46,
      y: 41,
      width: 45,
      height: 40,
      anchor: "middle",
      blur: 0,
      opacity: 1,
      rotateY:0,
      rotateX:0,
      backdropBlur: 0,
      scale: 1,
      scaleX : 1,
      scaleY : 1,
      rotate: -10,
    },
    landscape: {
      x: 1,
      y: 2,
      width: 97,
      blur: 0,
      height: 76,
      anchor: "left-top",
      animate: animationEnd ? animateEnd : animateCard,

      opacity: 1,

      rotate: 0,
      scale: 1,
    },
    loop: false,
    controlsAnimate,
  };

  return (
    <>
      <Card {...configImage} />
      <Card {...configTitle} />
    </>
  );
};

export default Card1;
