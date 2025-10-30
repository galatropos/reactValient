import React, {  useState } from "react";
import "../../../assets/style/sip2.css";
import End from "./End";
import Start from "./Start";
import FontChange from "../../../../../src/component/FontChange";
import nunito from '../../../../../src/assets/font/Nunito/Nunito-VariableFont_wght.ttf';


const Index = () => {

  FontChange(
    {

      fontUrl:[
        nunito,
      ],
      fontFamily:["Nunito"]
    }
  )


  const [active,setActive]=useState(true);
  return (
    active?<Start setActive={setActive}/>:<End setActive={setActive}/>

  );
};

export default Index;
