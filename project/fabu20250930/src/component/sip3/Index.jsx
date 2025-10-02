import React from "react";
import "../../../assets/style/sip3.css";
import portrait from "../../../assets/image/sip3/portrait.webp";
import landscape from "../../../assets/image/sip3/landscape.webp";
import background from "../../../assets/image/sip3/background.webp";
import Card from "../../../../../src/component/Card";
import CTA from "./CTA";
import { useOrientation } from "../../../../../src/hook/useOrientation";

const Index = () => {
  const orientation = useOrientation();
  const backgroundStyle = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -11,
      backgroundImage: `url(${background})`,
      transform: `${orientation === "landscape" ? "rotate(90deg)" : ""}`,
      transformOrigin: "center center",
    },
    landscape: {
      x: 50,
      y: 50,
      width: 60,
      height: 270,
      anchor: "middle",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 155,
      height: 155,
      anchor: "middle",
    },
  };

  const stylesImg = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -11,
  };

  const contentStyle = {
    style: {
      ...stylesImg,
      backgroundImage: `url(${
        orientation === "landscape" ? landscape : portrait
      })`,
    },

    portrait: {
      x: 50,
      y: 48,
      width: 102,
      height: 102,
      anchor: "middle",
    },
    landscape: {
      x: 50,
      y: 63,
      width: 100,
      height: 100,
      anchor: "middle",
    },
  };
  return (
    <>
      {<CTA />}

      <Card {...backgroundStyle} />
      <Card {...contentStyle} />
    </>
  );
};

export default Index;
