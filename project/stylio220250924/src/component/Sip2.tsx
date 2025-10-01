import React from 'react'
import portrait from "../../assets/video/portrait_2.webm";
import landscape from "../../assets/video/landscape_2.webm";
import VideoToFramesPlayer from '../../../../src/component/VideoToFramesPlayer';
import { videoVariables } from './utils';

const repeat = [[5000, 2400, 200]]

const Sip = () => {
 
  return (
   <VideoToFramesPlayer {...videoVariables} portraitSrc={portrait} landscapeSrc={landscape} repeat={repeat}
   />
  )
}

export default Sip