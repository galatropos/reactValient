import React from 'react'
import portrait from "../../assets/video/portrait_3.mp4";
import landscape from "../../assets/video/landscape_3.mp4";
import VideoToFramesPlayer from '../../../../src/component/VideoToFramesPlayer';
import { videoVariables } from './utils';


const tools = {
  repeat: [[4900, 1180, 2000]],
  pause: [[4800, 100]],
};

const Sip = () => {
  return (
    <VideoToFramesPlayer
      {...videoVariables}
      portraitSrc={portrait}
      landscapeSrc={landscape}
      {...tools}
      />
  );
};

export default Sip