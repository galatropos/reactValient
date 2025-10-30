import React from "react";
import "../../../assets/style/sip6.css";
import VideoToFramesPlayer from "../../../../../src/component/VideoToFramesPlayer";
import video from "../../../assets/video/video.mp4";

const Start = () => {
  const configBackground = {
    portrait: { x: 50, y: 50, width: 101, height: 101, anchor: "middle" },
    landscape: { x: 50, y: 50, width: 100, height: 100, anchor: "middle" },
    portraitSrc: video,
    landscapeSrc: video,
    showHUD: true,
  };

  return (
    <div>
      <VideoToFramesPlayer 
        {...configBackground} 
        objectFit="contain" 
        managerAutoPlay

  sniperUI={true}   // <-- activa el overlay
      />
    </div>
  );
};

export default Start;
