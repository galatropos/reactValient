import React from "react";
import Concept from "../main/concept3/Index";
import imageLogoCandy from "../../../assets/image/logoCandy.webp";
import imageIcoCandy from "../../../assets/image/sip5/ico.png";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import FontChange from "../../../../../src/component/FontChange";

import videoP from "../../../assets/video/sip5/video.mp4";
import image1 from "../../../assets/image/test3/1.webp";
import image2 from "../../../assets/image/test3/2.webp";
import image3 from "../../../assets/image/test3/3.webp";
import imageAvatar from "../../../assets/image/sip6/avatar.webp";

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
    backgroundLast: "#D63378",
    video,
    imageAvatar,
    images: [
      {image:image1,  
        title:"Secrets & sin"
      },
      {image:image2,  
        title:"Gideon"
      } ,
      {image:image3,  
        title:"Chasing Kiarra"
      },

    ],

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
