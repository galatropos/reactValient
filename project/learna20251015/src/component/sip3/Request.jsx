import React from "react";
import Card from "../../../../../src/component/Card";
import pineapple from "../../../assets/image/sip3/pineapple.webp";
import pear from "../../../assets/image/sip3/pear.webp";
import apple from "../../../assets/image/sip3/apple.webp";

const imageFruit=[pineapple,pear,apple];
const Request = ({
  xLandscape,
  yLandscape,
  xPortrait,
  yPortrait,
  index=0,
}) => {
  const configRequest = {
    style: {
      borderRadius: "35px",
      outline: "5px solid #3CA1FF",
      backgroundImage: `url(${imageFruit[index]})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: xPortrait,
      y: yPortrait,
      width: 26,
      height: 13,
      anchor: "top",
      fontSize: 5.8,
    },
    landscape: {
      x: xLandscape,
      y: yLandscape,
      width: 12,
      height: 16,
      fontSize: 3.4,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
  };

  return <Card {...configRequest} />;
};

export default Request;
