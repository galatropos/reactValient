/* eslint-disable no-undef */
import { useEffect } from "react";
import Sip from "./Sip6";
import './assets/style/style.css';
/*
 seraphinatheraputics_codan_sip_20250819_01_charlotte

*/
function Index() {  


  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    document.title = "Welcome to Fatty15";
    if (favicon) {
      favicon.href = "https://fatty15.com/cdn/shop/files/favicon_180x180.png?v=1670511457"; // tu imagen en /public
    }
  }, []);


  
  useEffect(() => {
  const handleClick = () => {
  
    if (typeof mraid !== "undefined" && typeof mraid.open === "function") mraid.open();
    {
      console.log("mraid");
      window.open("https://fatty15.com/", "_blank");

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