import React, {  useEffect, useState } from "react";
import "../../../assets/style/sip1.css";
import End from "./End";
import Start from "./Start";
import useAudio from "../../../../../src/hook/useAudio";
import audioIntro from "../../../assets/audio/sip1/intro.mp3";
import TapRippleCursor from "../../../../../src/component/TapRippleCursor";

const Index = () => {
  const [active,setActive]=useState(true);
  const {automatic, setLoop}=useAudio(audioIntro)

  useEffect(()=>{
    automatic()
    setLoop(true)
  },[audioIntro])

  return (
    <>
    <TapRippleCursor smoothing={1} size={30} opacity={0.6} />
    {

      active?<Start setActive={setActive}/>:<End setActive={setActive}/>
    }
    </>

  );
};

export default Index;
