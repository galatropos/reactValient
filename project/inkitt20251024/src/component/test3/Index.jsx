import React from "react";
import Concept from "../main/concept3/Index";
import imageLogoCandy from "../../../assets/image/sip5/logo.webp";
import imageIcoCandy from "../../../assets/image/sip5/ico.png";
import imageLogoGalatea from "../../../assets/image/sip5/logoGalatea.png";
import imageIcoGalatea from "../../../assets/image/sip5/icoGalatea.png";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import FontChange from "../../../../../src/component/FontChange";

import videoP from "../../../assets/video/sip5/video.mp4";
import videoL from "../../../assets/video/sip5/video.mp4";
import porte from "../../../assets/video/sip5/porte.webp";
import image1 from "../../../assets/image/test3/1.jpg";
import image2 from "../../../assets/image/test3/2.jpg";
import image3 from "../../../assets/image/test3/3.png";

const Index = () => {
  FontChange({ fontUrl: [Inter], fontFamily: ["Inter"] });
  const video = {
    srcPortrait: videoP,
    srcLandscape: videoL,
    title: "Lorem ipsum VO",
  };

  const image = {
    image: porte,
    title: "Chapert 1 lorem ipsum",
  };
  const candyJar = {
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
    ctaColor: "#fff",
    backgroundLast: "#D63378",
    video,
    images: [
      {image:image1,  
        title:"image1"
      },
      {image:image2,  
        title:"image2"
      } ,
      {image:image3,  
        title:"image3"
      },

    ],

  };

  const galatea = {
    mraid: {
      appstore:
        "https://apps.apple.com/es/app/galatea-novels-audiobooks/id1380362212",
      playStore: "https://play.google.com/store/apps/details?id=com.colt",
      windows: "https://galatea.com",
    },
    logo: imageLogoGalatea,
    ico: imageIcoGalatea,
    footerColor: "#000",
    ctaText: "READ NOW",
    footerText: "Find me time on",
    ctaColor: "#fff",
    image,
    images: [
      {image:image1,  
        title:"image1"
      },
      {image:image2,  
        title:"image2"
      } ,
      {image:image3,  
        title:"image3"
      }],
  };

  return (
    <Concept
    {
      ...candyJar
      //...galatea

    }

    />
  );
};

export default Index;
