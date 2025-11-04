import React from "react";
import Concept from "../main/concept3/Index";
import Novel from "../../../assets/novel/Novel4.jsx"
import imageLogoGalatea from "../../../assets/image/logoGalatea.webp";
import imageIcoGalatea from "../../../assets/image/sip5/icoGalatea.png";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import FontChange from "../../../../../src/component/FontChange";
import novel from "../../../../../src/assets/font/Noto_Serif/NotoSerif-VariableFont_wdth,wght.ttf";

import porte from "../../../assets/video/sip5/porte.webp";
import image1 from "../../../assets/image/test3/1.webp";
import image2 from "../../../assets/image/test3/2.webp";
import image3 from "../../../assets/image/test3/3.webp";
import  imageAvatar from "../../../assets/image/sip7/avatar.webp";
 
const Index = () => { 
   FontChange({ fontUrl: [Inter,novel], fontFamily: ["Inter","novel"] });



  const image = {
    image: porte,
    title: "Chapert 1 lorem ipsum",
  };
  const galatea = {
    imageAvatar:imageAvatar,
    backgroundColor:"#1B1B1C" ,
    mraid: {
      appstore:
        "https://apps.apple.com/es/app/galatea-novels-audiobooks/id1380362212",
      playStore: "https://play.google.com/store/apps/details?id=com.colt",
      windows: "https://galatea.com",
    },
    logo: imageLogoGalatea,
    ico: imageIcoGalatea,
    footerColor: "#4A965B",
    ctaText: "READ NOW",
    footerText: "Find me time on",
    ctaColor: "#00925E",
    image,
    text:<Novel />,
    images: [
      {image:image1,  
        title:"Secrets & sin"
      },
      {image:image2,  
        title:"Gideon"
      } ,
      {image:image3,  
        title:"Chasing Kiarra"
      }],
  };

  return (
    <Concept
    {
      ...galatea

    }

    />
  );
};

export default Index;
