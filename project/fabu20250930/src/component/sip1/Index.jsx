import React from "react";
import "../../../assets/style/sip1.css";
import portrait from "../../../assets/image/sip1/portrait.webp";
import landscape from "../../../assets/image/sip1/landscape.webp";
import Card from "../../../../../src/component/Card";
import CTA from "./CTA";
import { useOrientation } from "../../../../../src/hook/useOrientation";

const Index = () => {
  const orientation = useOrientation();
 
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
      y: 53,
      width: 260,
      height: 260,
      anchor: "middle",
    },
    landscape: {
      x: 50,
      y: 42,
      width: 190,
      height: 190,
      anchor: "middle",
    },
  };
  return (
    <>
      <Card {...contentStyle} />
      {<CTA />}
    </>
  );
};

export default Index;
