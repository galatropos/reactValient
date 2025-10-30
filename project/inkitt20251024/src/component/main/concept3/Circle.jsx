import React, { useEffect, useState } from "react";
import Card from "../../../../../../src/component/Card";
import imageAccept from "../../../../assets/image/concept3/accept.webp";
import imageDenied from "../../../../assets/image/concept3/denied.webp";

const Circle = ({ next, length }) => {
  const [accept, setAccept] = useState("stop");
  const [denied, setDenied] = useState("stop");

  const animate = [
    [{ scale: +0.2 }, 100],
    [{ scale: -0.2 }, 100],
  ];

  useEffect(() => {
    if (next > 0) {
      if (next === length) setAccept("play");
      else setDenied("play");
    }

    setTimeout(() => {
      setAccept("stop");
      setDenied("stop");
    }, 500);
  }, [next]);

  const configCircleAccept = {
    style: {
      background: `url(${imageAccept}) center/contain no-repeat`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `
      brightness(0) saturate(100%)
      invert(86%) sepia(10%) saturate(1000%)
      hue-rotate(90deg) brightness(98%) contrast(92%)
    `,
    },
    portrait: {
      x: 63.5,
      y: 78.5,
      width: 19.5,
      height: 6.8,
      animate,
      scale: 1,
      anchor: "middle",
    },
    landscape: {
      x: 68.5,
      y: 52,
      width: 9,
      height: 29,
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
      background: `url(${imageDenied}) center/contain no-repeat`,
      backgroundSize: "50%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `
   brightness(0) saturate(100%)
      invert(88%) sepia(12%) saturate(900%)
      hue-rotate(315deg) brightness(103%) contrast(90%)
  `,
    },
    portrait: {
      x: 37.8,
      y: 78.3,
      width: 9,
      scale: 1,
      height: 10.5,
      animate,
      anchor: "middle",
    },
    landscape: {
      x: 90.3,
      y: 50.5,
      width: 8,
      height: 29,
      anchor: "middle",
      scale: 1,
      fontSize: 3.5,
      animate,
    },
    loop: false,
    controlsAnimate: denied,
  };

  const configCircleAccept2 = {
    style: {
      backgroundPosition: "center",
      border: "6px solid #B0ECAA",
      borderRadius: "50%",
      backgroundRepeat: "no-repeat",
      filter: `
      brightness(0) saturate(100%)
      invert(86%) sepia(10%) saturate(1000%)
      hue-rotate(90deg) brightness(98%) contrast(92%)
    `,
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
      x: 68,
      y: 50,
      width: 13.9,
      height: 23,
      anchor: "middle",
      scale: 1,
      animate,
      fontSize: 3.5,
    },
    loop: false,
    controlsAnimate: accept,
  };
  const configCircleDenied2 = {
    style: {
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      border: "6px solid #B0ECAA",
      borderRadius: "50%",
      filter: `
   brightness(0) saturate(100%)
      invert(88%) sepia(12%) saturate(900%)
      hue-rotate(315deg) brightness(103%) contrast(90%)
  `,
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
      x: 90,
      y: 50,
      width: 13.9,
      height: 23,
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
      <Card key={"a1"} {...configCircleAccept} />
      <Card key={"a2"} {...configCircleAccept2} />
      <Card key={"a3"} {...configCircleDenied} />
      <Card key={"a4"} {...configCircleDenied2} />
    </>
  );
};

export default Circle;
