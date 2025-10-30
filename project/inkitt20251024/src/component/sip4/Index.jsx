
import React from 'react'
import Concept from '../main/concept2/Index'
import imageMain from "../../../assets/image/test2/main.webp";
import imageLogoCandy from "../../../assets/image/logoCandy.webp";
import videoCandy from "../../../assets/video/test1/video.mp4";
import FontChange from "../../../../../src/component/FontChange";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";


const Index = () => {
  FontChange({ fontUrl: [Inter], fontFamily: ["Inter"] });


  const candyJar={
    mraid: {
      appstore:
        "https://apps.apple.com/us/app/candyjartv-drama-shorts/id6466786430",
      playStore:
        "https://play.google.com/store/apps/details?id=com.inkitt.app.galateatv.android",
      windows: "https://candyjar.com/",
    },
    imageMain:imageMain,
    logo:imageLogoCandy,
    title:"Hot alpha Males",
    ctaText:"WHATCH NOW",
    ctaColor: "#8251EC",
    backgroundColor:"#1B1B1C" ,
    video:{
      srcPortrait:videoCandy,
      srcLandscape:videoCandy,
    }
  }
  return (
    <Concept {
      ...candyJar
    } />
  )
}

export default Index