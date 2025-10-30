import React, { useEffect, useState } from "react";
import "../../../assets/style/sip5.css";
import End from "./End";
import Start from "./Start";
import useAudio from "../../../../../src/hook/useAudio";
import audioIntro from "../../../assets/audio/sip5/intro.mp3";

const Index = () => {
  const [active,setActive]=useState(true);

  const intro=useAudio(audioIntro)

  useEffect(()=>{
  //  intro.automatic()
  },[intro])
  
  return (
    active?<Start setActive={setActive}/>:<End setActive={setActive}/>

  );
};

export default Index;
