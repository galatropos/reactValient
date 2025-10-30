import React from "react";
import Card from "../../../../../src/component/Card";

const Request = ({
  xLandscape,
  yLandscape,
  xPortrait,
  yPortrait,
  content,
}) => {
  const configRequest = {
    style: {
      borderRadius: "35px",
      outline: "5px solid #3CA1FF",
      fontWeight: 500,
    },
    portrait: {
      x: xPortrait,
      y: yPortrait,
      width: 27,
      height: 8,
      anchor: "top",
      fontSize: 5,
    },
    landscape: {
      x: xLandscape,
      y: yLandscape,
      width: 15,
      height: 12,
      fontSize: 3,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    children: content,
  };

  return <Card {...configRequest} />;
};

export default Request;
