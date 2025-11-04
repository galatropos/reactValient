import React from "react";
import Concept from "../main/concept5/Index";
import imageLogoGalatea from "../../../assets/image/logoGalatea.webp";
import imageIcoGalatea from "../../../assets/image/sip5/icoGalatea.png";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import FontChange from "../../../../../src/component/FontChange";
import novel from "../../../../../src/assets/font/Noto_Serif/NotoSerif-VariableFont_wdth,wght.ttf";

import porte from "../../../assets/video/sip5/porte.webp";
import Novel from "../sip5/Novel";

const Index = () => {
  FontChange({ fontUrl: [Inter,novel], fontFamily: ["Inter","novel"] });

  const image = {
    image: porte,
    title: "Chapert 1 lorem ipsum",
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
    footerColor: "#56B069",
    ctaText: "READ NOW",
    footerText: "Find me time on",
    ctaColor: "#00925E",
    image,
    backgroundColor: "#1B1B1C",
    text:<Novel />,
  };

  return (
    <Concept
    {
      //...candyJar
      ...galatea

    }

    />
  );
};

export default Index;
