import React from "react";
import Concept from "../main/concept5/Index";
import imageLogoCandy from "../../../assets/image/sip5/logo.webp";
import imageIcoCandy from "../../../assets/image/sip5/ico.png";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import FontChange from "../../../../../src/component/FontChange";

import videoP from "../../../assets/video/sip5/video.mp4";

const Index = () => {
  FontChange({ fontUrl: [Inter], fontFamily: ["Inter"] });
  const video = {
    srcPortrait: videoP,
    srcLandscape: videoP,
    title: "Lorem ipsum VO",
  };


  const candyJar = {
    backgroundColor:"#1B1B1C" ,
    mraid: {
      appstore:
        "https://apps.apple.com/us/app/candyjartv-drama-shorts/id6466786430",
      playStore:
        "https://play.google.com/store/apps/details?id=com.inkitt.app.galateatv.android",
      windows: "https://candyjar.com/",
    },
    logo: imageLogoCandy,
    ico: imageIcoCandy,
    footerColor: "#D63378",
    ctaText: "WHATCH NOW",
    footerText: "find Romance on",
    ctaColor: "#8251EC",
    video,
  };



  return (
    <Concept
    {
      ...candyJar

    }

    />
  );
};

export default Index;
