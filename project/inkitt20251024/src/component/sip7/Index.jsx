import React from "react";
import Concept from "../main/concept4/Index";
import image1 from "../../../assets/image/sip2/1.webp";
import image2 from "../../../assets/image/sip2/2.webp";
import image3 from "../../../assets/image/sip2/3.webp";
import imageLast from "../../../assets/image/sip2/last.webp";
import imageLogoGalatea from "../../../assets/image/logoGalatea.webp";
import FontChange from "../../../../../src/component/FontChange";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import Novel from "../sip7/Novel";
import novel from "../../../../../src/assets/font/Noto_Serif/NotoSerif-VariableFont_wdth,wght.ttf";
const Index = () => {
  FontChange({ fontUrl: [Inter,novel], fontFamily: ["Inter","novel"] });

  const quest = [
    {
      image: image1,
      title: "Pick your favorite vibe",
      text: "choose one to continue",
      quest: ["Romance", "Mystery", "Fantasy", "Thriller"],
    },
    {
      image: image2,
      title: "Choose a main character energy",
      text: "Only one pick",
      quest: ["Alpha Leader", "Strong Heroine", "Secret Loner", "Comic Relief"],
    },
    {
      image: image3,
      title: "Pick the spice level",
      text: "Keep it real ;)",
      quest: ["Sweet", "warm", "Spicy", "Extra"],
    },
  ];

  const galatea = {
    mraid: {
      appstore:
        "https://apps.apple.com/es/app/galatea-novels-audiobooks/id1380362212",
      playStore: "https://play.google.com/store/apps/details?id=com.colt",
      windows: "https://galatea.com",
    },
    backgroundColor: "#1B1B1C",
    logo: imageLogoGalatea,
    quest,
    text: <Novel />,
    imagePort: imageLast,
    textCta: "READ NOW",
    colorCta: "#00925E",
    colorQuest: "#56B069",
    colorProgress: "#00FE9D",
  };

  return <Concept {...galatea} />;
};

export default Index;
