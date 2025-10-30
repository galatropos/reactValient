
import React from 'react'
import Concept from '../main/concept4/Index'
import image1 from "../../../assets/image/sip2/1.webp";
import image2 from "../../../assets/image/sip2/2.webp";
import image3 from "../../../assets/image/sip2/3.webp";
import imageLast from "../../../assets/image/sip2/last.webp";
import imageLogoCandy from "../../../assets/image/logoCandy.webp";
import FontChange from "../../../../../src/component/FontChange";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
import videoP from "../../../assets/video/sip5/video.mp4";


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

const candyJar={
  backgroundColor:"#1B1B1C" ,
  mraid: {
    appstore:
      "https://apps.apple.com/us/app/candyjartv-drama-shorts/id6466786430",
    playStore:
      "https://play.google.com/store/apps/details?id=com.inkitt.app.galateatv.android",
    windows: "https://candyjar.com/",
  },
  logo:imageLogoCandy,
  quest,
  video:{
    srcPortrait:videoP,
    srcLandscape:videoP,
    title:"ChasinKiara",
  },
  text:"YOUR ROMANCE WATCHING IS WATCH",
  imagePort:imageLast,
  textCta:"WATCH NOW",
  colorCta:"#8251EC",
  colorQuest:"#D63378",
  colorProgress:"#F542CE"

}


  return (
    <Concept {
      ...candyJar
    }      />
  )
}

export default Index