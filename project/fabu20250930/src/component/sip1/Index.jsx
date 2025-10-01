import React from "react";
import "../../../assets/style/sip1.css";
import portrait from "../../../assets/image/sip1/portrait.webp";
import landscape from "../../../assets/image/sip1/landscape.webp";
import background from "../../../assets/image/sip1/background.webp";
import Card from "../../../../../src/component/Card";
import CTA from "./CTA";

const Index = () => {
  const backgroundStyle = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -11,
      backgroundImage: `url(${background})`,
    },
    landscape: {
      x: 50,
      y: 57,
      width: 200,
      height: 200,
      anchor: "middle",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 200,
      height: 200,
      anchor: "middle",
    },
  };

  const stylesImg = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -11,
  };
  const portraitStyle = {
    style: { ...stylesImg, backgroundImage: `url(${portrait})` },
    landscape: {
      hidden: true,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 102,
      height: 102,
      anchor: "middle",
    },
  };

  const landscapeStyle = {
    style: { ...stylesImg, backgroundImage: `url(${landscape})` },
    landscape: {
      x: 50,
      y: 70,
      width: 88,
      height: 140,
      anchor: "middle",
    },
    portrait: {
      hidden: true,
    },
  };
  return (
    <>
    {

      <CTA />
    }

      <Card {...backgroundStyle} />
      <Card {...portraitStyle} />
      <Card {...landscapeStyle} />
    </>
  );
};

export default Index;
