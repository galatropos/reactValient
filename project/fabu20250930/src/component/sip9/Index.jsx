import React from "react";
//import "../../../assets/style/sip9.css";
import portrait from "../../../assets/image/sip9/portrait.webp";
import Card from "../../../../../src/component/Card";
import CTA from "./CTA";
import { useOrientation } from "../../../../../src/hook/useOrientation";
import background  from "../../../assets/image/sip9/background.webp";

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
      y: 47,
      width: 108,
      height: 108,
      anchor: "middle",
    },
    landscape: {
      x: 35,
      y: 54,
      width: 45,
      height: 110,
      anchor: "middle",
    },
  };
  const backgroundStyle = { 
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -11,
      backgroundImage: `url(${background})`,
      transformOrigin: "center center",
    },
    landscape: {
      x: 50,
      y: 50,
      width: 160,
      height: 280,
      anchor: "middle",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 280,
      height: 160,
      anchor: "middle",
    },
  }
  return (
    <>
      {<CTA />}
      <Card {...backgroundStyle} />
      <Card {...contentStyle} />
    </>
  );
};

export default Index;
