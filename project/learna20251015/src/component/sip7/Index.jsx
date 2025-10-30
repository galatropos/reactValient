import React, { useState } from "react";
import "../../../assets/style/sip1.css";
import End from "./End";
import Start from "./Start";

const Index = () => {
  const [active,setActive]=useState(true);
  
  return (
    active?<Start setActive={setActive}/>:<End setActive={setActive}/>

  );
};

export default Index;
