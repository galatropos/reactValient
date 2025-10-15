import React from "react";
import "../../../assets/style/sip12.css";
import portrait from "../../../assets/image/sip12/background.webp";
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
      y: 50,
      width: 530,
      height: 300,
      anchor: "middle",
    },
    landscape: {
      x: 34,
      y: 61,
      width:220,
      height: 390,
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
