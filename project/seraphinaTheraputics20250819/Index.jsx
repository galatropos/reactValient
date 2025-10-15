/* eslint-disable no-undef */
import { useEffect } from "react";
import Sip from "./Sip2";
import './assets/style/style.css';
import MaisonNeue from "../../src/assets/font/Maison_Neue_Book/fonnts.com-Maison_Neue_Book.ttf"
import Roboto from "../../src/assets/font/Roboto/Roboto-VariableFont_wdth,wght.ttf"
import FontChange from "../../src/component/FontChange";
/*
 seraphinatheraputics_codan_sip_20250819_01_charlotte
*/
function Index() {  

FontChange({fontUrl:[Roboto,MaisonNeue],fontFamily:['Roboto','Maison Neue']});
  useEffect(() => {
    document.title = "Welcome to Fatty15";
  
  }, []);


  
  useEffect(() => {
  const handleClick = () => {
  
    if (typeof mraid !== "undefined" && typeof mraid.open === "function") mraid.open();
    {
      console.log("mraid");

    }


  }

  window.addEventListener("click", handleClick);


  // Limpiar el listener al desmontar
  return () => {
    window.removeEventListener("click", handleClick);
  };
}, []);



  return (

  <Sip  />

  );
}

export default Index;