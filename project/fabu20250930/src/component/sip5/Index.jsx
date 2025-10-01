import React from "react";
import "../../../assets/style/sip5.css";
import portrait from "../../../assets/image/sip5/portrait.webp";
import landscape from "../../../assets/image/sip5/landscape.webp";
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
      y: 50,
      width: 100,
      height: 100,
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
