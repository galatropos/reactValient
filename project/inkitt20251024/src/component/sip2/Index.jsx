import React from "react";
import Concept from "../main/concept1/Index";
import imageLogoCandy from "../../../assets/image/test1/logoCandy.webp";
import image1 from "../../../assets/image/test1/1.jpg";
import image2 from "../../../assets/image/test1/2.jpg";
import image3 from "../../../assets/image/test1/3.jpg";
import videoCandy from "../../../assets/video/test1/video.mp4";
import Inter from "../../../../../src/assets/font/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf";
import FontChange from "../../../../../src/component/FontChange";

const Index = () => {
  FontChange({ fontUrl: [Inter], fontFamily: ["Plus_Jakarta_Sans"] });

  const candyJar = {
    mraid: {
      appstore:
        "https://apps.apple.com/us/app/candyjartv-drama-shorts/id6466786430",
      playStore:
        "https://play.google.com/store/apps/details?id=com.inkitt.app.galateatv.android",
      windows: "https://candyjar.com/",
    },
    logo: imageLogoCandy,
    backgroundColor:"#1B1B1C" ,
    title: "MEET YOUR NEXT MAIN CHARACTER",
    ctaText: "WHATCH NOW",
    ctaColor: "#8251EC",
    ctaTextColor: "#FFF",
    imageCarousel: [image1, image2, image3],
    video: {
      srcPortrait: videoCandy,
      srcLandscape: videoCandy,
    },
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
