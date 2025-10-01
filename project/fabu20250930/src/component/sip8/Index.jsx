import React from "react";
import "../../../assets/style/sip8.css";
import portrait from "../../../assets/image/sip8/portrait.webp";
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
      width: 102,
      height: 102,
      anchor: "middle",
    },
    landscape: {
      x: 35,
      y: 50,
      width: 30,
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
