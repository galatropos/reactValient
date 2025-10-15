import React from "react";
import "../../../assets/style/sip11.css";
import portrait from "../../../assets/image/sip11/background.webp";
import Card from "../../../../../src/component/Card";
import CTA from "./CTA";
import { useOrientation } from "../../../../../src/hook/useOrientation";

const Index = () => {
  const orientation = useOrientation();

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
        orientation === "landscape" ? portrait : portrait
      })`,
    },

    portrait: {
      x: 50,
      y: 45,
      width: 240,
      height: 240,
      anchor: "middle",
    },
    landscape: {
      x: 35,
      y: 64,
      width: 220,
      height: 220,
      anchor: "middle",
    },
  };
  return (
    <>
      {<CTA />}
      <Card {...contentStyle} />
    </>
  );
};

export default Index;
