import React from "react";
import Card from "../../../../../../src/component/Card";
import imageAccept from "../../../../assets/image/concept3/accept.webp";
import imageDenied from "../../../../assets/image/concept3/denied.webp";
import hexadecimalToRgba from "../../../../../../src/utils/hexadecimalToRgba";

const Circle = ({ direction }) => {
  const isRight = direction === "right";
  const isLeft  = direction === "left";

  const configCircleAccept = {
    style: {
      background: `url(${imageAccept}) center/contain no-repeat`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex:20,

    },
    portrait: {
      x: 63.5,
      y: 77.5,
      width: 19.5,
      height: 6.8,
      anchor: "middle",
      scale: isRight ? 1.2 : 1,
    },
    landscape: {
      scale: isRight ? 1.2 : 1,
      width: 8,
      height: 29,
      anchor: "middle",
      fontSize: 3.55,
      x: 85.4,
      y: 47,
    },
  };

  const configCircleDenied = {
    style: {
      background: `url(${imageDenied}) center/contain no-repeat`,
      backgroundSize: "50%",
      backgroundPosition: "center",
      zIndex:20,
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 37.8,
      y: 77.3,
      width: 9,
      scale: isLeft ? 1.2 : 1,
      height: 10.5,
      anchor: "middle",
    },
    landscape: {
      width: 6.5,
      height: 29,
      anchor: "middle",
      scale: isLeft ? 1.2 : 1,
      fontSize: 3.5,
      x: 15.5,
      y: 46,
    },
  };

  const configCircleAccept2 = {
    style: {
      backgroundPosition: "center",
      border: "6px solid #B0ECAA",
      zIndex:20,

      borderRadius: "50%",
      backgroundRepeat: "no-repeat",
      background: `radial-gradient(circle at center,
      ${hexadecimalToRgba("#B0ECAA", 0)} 0%,
      ${hexadecimalToRgba("#B0ECAA", 0.1)} 10%,
      ${hexadecimalToRgba("#B0ECAA", 0.2)} 20%,
      ${hexadecimalToRgba("#B0ECAA", 0.3)} 30%,
      ${hexadecimalToRgba("#B0ECAA", 0.4)} 40%,
      ${hexadecimalToRgba("#B0ECAA", 0.5)} 50%,
      ${hexadecimalToRgba("#B0ECAA", 0.6)} 60%,
      ${hexadecimalToRgba("#B0ECAA", 0.7)} 70%,
      ${hexadecimalToRgba("#B0ECAA", 0.8)} 80%,
      ${hexadecimalToRgba("#B0ECAA", 0.9)} 90%,
      ${hexadecimalToRgba("#B0ECAA", 1)} 100%)

      
      `,
    },
    portrait: {
      x: 63,
      y: 77,
      width: 19.5,
      height: 11.3,
      scale: isRight ? 1.2 : 1,

      anchor: "middle",
    },
    landscape: {
      width: 11.7,
      height: 20.7,
      anchor: "middle",
      fontSize: 3.5,
      scale: isRight ? 1.2 : 1,
      x: 85,
      y: 46,
    },
  };

  const configCircleDenied2 = {
    style: {
      backgroundPosition: "center",
      zIndex:20,
      backgroundRepeat: "no-repeat",
      border: "6px solid #ECAAAA",
      borderRadius: "50%",
      background: `radial-gradient(circle at center,
      ${hexadecimalToRgba("#ECAAAA", 0)} 0%,
      ${hexadecimalToRgba("#ECAAAA", 0.55)} 55%,
      ${hexadecimalToRgba("#ECAAAA", 1)} 75%,
      ${hexadecimalToRgba("#ECAAAA", 1)} 60%,
      ${hexadecimalToRgba("#ECAAAA", 1)} 100%)
      `,
    },
    portrait: {
      x: 37,
      y: 77,
      width: 19.5,
      height: 11.3,
      anchor: "middle",
      scale: isLeft ? 1.2 : 1,
    },
    landscape: {
      width: 11.7,
      height: 20.7,
      anchor: "middle",
      scale: isLeft ? 1.2 : 1,
      fontSize: 3.5,
      x: 15,
      y: 46,
    },
  };

  return (
    <>
      <Card key={"a2"} {...configCircleAccept2} />
      <Card key={"a1"} {...configCircleAccept} />
      <Card key={"a4"} {...configCircleDenied2} />
      <Card key={"a3"} {...configCircleDenied} />
    </>
  );
};

export default Circle;
