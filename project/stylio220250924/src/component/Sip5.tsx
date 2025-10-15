import React from "react";
import portrait from "../../assets/video/portrait_5.mp4";
import landscape from "../../assets/video/landscape_5.mp4";
import VideoToFramesPlayer from "../../../../src/component/VideoToFramesPlayer";
import { videoVariables } from "./utils";

const tools = {
  repeat: [[4900, 1170, 2000]],
  pause: [[4800, 80]],
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

export default Sip;
