import React from "react";
import "../../../assets/style/sip2.css";
import portrait from "../../../assets/image/sip2/portrait.webp";
import landscape from "../../../assets/image/sip2/landscape.webp";
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
      y: 59,
      width: 270,
      height: 270,
      anchor: "middle",
    },
    landscape: {
      x: 53,
      y: 45,
      width: 240,
      height: 240,
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
