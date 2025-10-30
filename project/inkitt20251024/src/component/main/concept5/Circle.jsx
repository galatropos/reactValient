import React, {  useEffect, useState } from "react";
import Card from "../../../../../../src/component/Card";
import imageAccept from "../../../../assets/image/concept3/accept.png";
import imageDenied from "../../../../assets/image/concept3/denied.png";

const Circle = ({ next, length }) => {
    const [accept, setAccept] = useState("stop");
  const [denied, setDenied] = useState("stop");


  const animate = [
    [{ scale: +0.2 }, 100],
    [{ scale: -0.2 }, 100]
];

useEffect(() => {
    if (next > 0) {
        
        if (next === length ) setAccept("play");
        else setDenied("play");
      }

      
    setTimeout(() => {
        setAccept("stop");
        setDenied("stop");
    }, 300);


}, [next]);

  const configCircleAccept = {
    style: {

        background: `url(${imageAccept}) center/contain no-repeat, #B0ECAA`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        
        
      
      borderRadius: "50%",
    },
    portrait: {
      x: 63,
      y: 78,
      width: 19,
      height: 10.5,
      animate,
      scale: 1,
      anchor: "middle",
    },
    landscape: {
      x: 0,
      y: 0,
      width: 8,
      height: 14,
      anchor: "middle",
      scale: 1,
      animate,
      fontSize: 3.5,
    },
    loop: false,
    controlsAnimate: accept,
  };
  const configCircleDenied = {
    style: {
      borderRadius: "50%",
      background: `url(${imageDenied}) center/contain no-repeat, #ECAAAA`,
    },
    portrait: {
      x: 37,
      y: 78,
      width: 19,
      scale: 1,
      height: 10.5,
      animate,
      anchor: "middle",
    },
    landscape: {
      x: 0,
      y: 0,
      width: 8,
      height: 14,
      anchor: "middle",
      scale: 1,
      fontSize: 3.5,
      animate,
    },
    loop: false,
    controlsAnimate: denied,
  };
  return (
    <>
      <Card key={3} {...configCircleAccept} />
      <Card key={4} {...configCircleDenied} />
    </>
  );
};

export default Circle;
