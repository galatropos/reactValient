import React from "react";
import "../../../assets/style/sip10.css";
import portrait from "../../../assets/image/sip10/background.webp";
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
      width: 430,
      height: 160,
      anchor: "middle",
    },
    landscape: {
      x: 50,
      y: 52,
      width:180,
      height: 310,
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
