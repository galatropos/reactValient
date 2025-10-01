import React from 'react'
import portrait from "../../assets/video/portrait_1.webm";
import landscape from "../../assets/video/landscape_1.webm";
import VideoToFramesPlayer from '../../../../src/component/VideoToFramesPlayer';


const tools= {
  repeat:[[5000, 2600, 200]],
  pause:[[4900, 150]],
}

const Sip = () => {
    const videoVariables={
    style: {
    },
    objectFit:"cover",
    portrait: {
      height: 110,
      width: 110,
      anchor: "middle",
      x: 50,
      y: 48.5,
    },
    // LANDSCAPE (fondo a toda el área)
    landscape: {
      height: 110,
      width: 110,
      anchor: "middle",
      x:50,
      y: 49.5,
    },
    loop: true,

    
  }
  return (
   <VideoToFramesPlayer {...videoVariables} portraitSrc={portrait} landscapeSrc={landscape} {...tools}
   />
  )
}

export default Sip