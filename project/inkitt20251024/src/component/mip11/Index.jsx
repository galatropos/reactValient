import Novel from "../../../assets/novel/mip3/Novel";
import porte from "../../../assets/novel/mip3/porte.jpeg";
import image1 from "../../../assets/novel/mip3/image1.jpeg";
import image2 from "../../../assets/novel/mip3/image2.jpeg";
import image3 from "../../../assets/novel/mip3/image3.jpeg";
import Concept from "../main/concept1/Index";

import React from "react";
import imageLogoGalatea from "../../../assets/image/logoGalatea.webp";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import novel from "../../../../../src/assets/font/Noto_Serif/NotoSerif-VariableFont_wdth,wght.ttf";
import FontChange from "../../../../../src/component/FontChange";

const Index = () => {
  FontChange({ fontUrl: [Inter,novel], fontFamily: ["Inter","novel"] });


  const galatea = {
    mraid: {
      appstore:
        "https://apps.apple.com/es/app/galatea-novels-audiobooks/id1380362212",
      playStore: "https://play.google.com/store/apps/details?id=com.colt",
      windows: "https://galatea.com",
    },
    logo: imageLogoGalatea,
    backgroundColor:"#1B1B1C" ,
    title: "MEET YOU NEXT BOOK TEMPTATION",
    ctaText: "READ NOW",
    ctaColor: "#00925E",
    ctaTextColor: "#FFF",
    imageCarousel: [porte,image1, image2, image3],
    text: (<Novel />
    ),
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
