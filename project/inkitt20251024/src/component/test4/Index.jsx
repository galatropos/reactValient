
import React from 'react'
import Concept from '../main/concept4/Index'
import image1 from "../../../assets/image/sip2/1.png";
import image2 from "../../../assets/image/sip2/2.png";
import image3 from "../../../assets/image/sip2/3.png";
import imageLast from "../../../assets/image/sip2/last.png";
import imageLogoGalatea from "../../../assets/image/logoGalatea.png";
import imageLogoCandy from "../../../assets/image/logoCandy.webp";
import FontChange from "../../../../../src/component/FontChange";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";


const Index = () => {
FontChange({ fontUrl: [Inter], fontFamily: ["Inter"] });



  const quest=
  [
    {
      image:image1,
      title:"Pick your favorite vibe",
      text:"choose one to continue",
      quest:["Romance","Mystery","Fantasy","Thriller"]
    },
    {
      image:image2,
      title:"Choose a main character energy",
      text:"Only one pick",
      quest:["Alpha Leader", "Strong Heroine", "Secret Loner", "Comic Relief"]
    },
    {
      image:image3,
      title:"Pick the spice level",
      text:"Keep it real ;)",
      quest:["Sweet","warm", "Spicy", "Extra"]
    },
  ];

const galatea={
  mraid: {
    appstore:
      "https://apps.apple.com/es/app/galatea-novels-audiobooks/id1380362212",
    playStore: "https://play.google.com/store/apps/details?id=com.colt",
    windows: "https://galatea.com",
  },
        logo:imageLogoGalatea,
        quest,
        text:"YOUR ROMANCE READING IS READY",
        imagePort:imageLast,
        textCta:"READ NOW",
        colorCta:"#56B069",
        colorQuest:"#56B069",
        colorProgress:"#00FE9D"
 
}

const candyJar={
  mraid: {
    appstore:
      "https://apps.apple.com/us/app/candyjartv-drama-shorts/id6466786430",
    playStore:
      "https://play.google.com/store/apps/details?id=com.inkitt.app.galateatv.android",
    windows: "https://candyjar.com/",
  },
  logo:imageLogoCandy,
  quest,
  text:"YOUR ROMANCE WATCHING IS WATCH",
  imagePort:imageLast,
  textCta:"WATCH NOW",
  colorCta:"#F542CE",
  colorQuest:"#56B069",
  colorProgress:"#00FE9D"

}


  return (
    <Concept {
      //...galatea
      ...candyJar
    }      />
  )
}

export default Index