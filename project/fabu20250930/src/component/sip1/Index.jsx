import React from "react";
import "../../../assets/style/sip1.css";
import portrait from "../../../assets/image/sip1/portrait.webp";
import background from "../../../assets/image/sip1/background.webp";
import landscape from "../../../assets/image/sip1/landscape.webp";
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
      backgroundImage: `url(${background})`,
      transformOrigin: "center center",
    },
    landscape: {
      x: 80,
      y: 54,
      width: 57,
      height: 120,
      anchor: "middle",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 170,
      height: 170,
      anchor: "middle",
    },
  };

  const stylesImg = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
      y: 50,
      width: 102,
      height: 102,
      anchor: "middle",
    },
    landscape: {
      x: 50,
      y: 77,
      width: 100,
      height: 160,
      anchor: "middle",
    },
  };
  return (
    <>
      <Card {...backgroundStyle} />
      <Card {...contentStyle} />
      {<CTA />}
    </>
  );
};

export default Index;
