import Novel from "../../../assets/novel/mip4/Novel";
import porte from "../../../assets/novel/mip4/porte.jpeg";
import image1 from "../../../assets/novel/mip4/image1.jpeg";
import image2 from "../../../assets/novel/mip4/image2.jpeg";
import image3 from "../../../assets/novel/mip4/image3.jpeg";
import Concept from "../main/concept3/Index";


import React from "react";
import imageLogoGalatea from "../../../assets/image/logoGalatea.webp";
import imageIcoGalatea from "../../../assets/image/sip5/icoGalatea.png";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import FontChange from "../../../../../src/component/FontChange";
import novel from "../../../../../src/assets/font/Noto_Serif/NotoSerif-VariableFont_wdth,wght.ttf";

import  imageAvatar from "../../../assets/image/sip7/avatar.webp";
 
const Index = () => { 
   FontChange({ fontUrl: [Inter,novel], fontFamily: ["Inter","novel"] });


  const image = {
    image: porte,
    title: "Chapert 1 The Perfect Spiral",
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

      {image:porte,  
        title:"The Perfect Spiral"
      },
      {image:image1,  
        title:"Broken"
      },
      {image:image2,  
        title:"Victory Formation"
      } ,
      {image:image3,  
        title:"The Perfect Touchdown"
      },
    ],
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
