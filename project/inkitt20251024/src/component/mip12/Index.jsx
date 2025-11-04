import Novel from "../../../assets/novel/mip3/Novel";
import main from "../../../assets/novel/mip3/main.jpeg";


import React from 'react'
import Concept from '../main/concept2/Index'
import imageLogoGalatea from "../../../assets/image/logoGalatea.webp";
import FontChange from "../../../../../src/component/FontChange";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import novel from "../../../../../src/assets/font/Noto_Serif/NotoSerif-VariableFont_wdth,wght.ttf";

const Index = () => {
  FontChange({ fontUrl: [Inter,novel], fontFamily: ["Inter","novel"] });
  const galatea={
    mraid: {
      appstore:
        "https://apps.apple.com/es/app/galatea-novels-audiobooks/id1380362212",
      playStore: "https://play.google.com/store/apps/details?id=com.colt",
      windows: "https://galatea.com",
    },
    imageMain:main,
    logo:imageLogoGalatea,
    backgroundColor:"#1B1B1C" ,
    title:"Hot alpha Males",
    ctaText:"READ NOW",
    ctaColor:"#00925E",
    text:<Novel />,
    titleBook:"The Millennium Wolves"

  }


  return (
    <Concept {
      ...galatea
    } />
  )
}

export default Index