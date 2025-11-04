import React, {  useEffect, useState } from "react";
import Block1 from "./Block1";
import Block2 from "./Block2";
import audioSountrack from "../../../../assets/audio/sountrack1.mp3";
import useAudio from "../../../../../../src/hook/useAudio";
import Card from "../../../../../../src/component/Card";

const Index = ({ imageMain, text, logo, title, ctaColor, ctaText, video,mraid,backgroundColor,titleBook }) => {
  document.body.style.backgroundColor = backgroundColor;
  const [next, setNext] = useState(0);
  let startSountrack=useAudio(audioSountrack, { trackTime: false });
  useEffect(()=>{startSountrack.automatic();startSountrack.setLoop(true);},[])
useEffect(() => {
  if(!text&&next===1){
    startSountrack.stop();
  }
}, [next])

const configWall={
  style:{backgroundColor:backgroundColor },  
  portrait:{
    x:50,
    y:50,
    width:100,
    height:100,
    anchor:"middle"
  },
  landscape:{
    x:50,
    y:50,
    width:100,
    height:100,
    anchor:"middle"
  }
}

  return (
    <>
    
    <Card key={"wall"}  {...configWall}/>
      <span key={"span1"}style={{ opacity: next === 0 ? 1 : 0,zIndex:next===0?1000:0}}>
        <Block1
        key={"block1"}
          setNext={setNext}
          imageMain={imageMain}
          logo={logo}
          title={title}
          ctaColor={ctaColor}
          backgroundColor={backgroundColor}
        />
      </span>
      <span key={"span2"} style={{ opacity: next === 1 ? 1 : 0,zIndex:next===1?10:0}}>
        <Block2
        key={"block2"}
          setNext={setNext}
          ctaColor={ctaColor}
          ctaText={ctaText}
          video={video}
          finish={next === 1}
          logo={logo}
          mraid={mraid}
          backgroundColor={backgroundColor}
          title={titleBook}

        >
          {text}
        </Block2>
      </span>
    </>
  );
};

export default Index;
