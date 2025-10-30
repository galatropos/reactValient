import React from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip1.css";
import imageBackgroundLandscape from "../../../assets/image/sip1/background.png";
import calabaza from "../../../assets/image/sip1/calabaza.webp";
import imageLogo from "../../../assets/image/logo.png";
import { useCyclicCounter } from "../../../../../src/hook/useCyclicCounter";
import useOrientation from "../../../../../src/hook/useOrientation";



import FontChange from "../../../../../src/component/FontChange";
import inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";
/* ========= Helpers (en el mismo archivo) ========= */

// Pre-carga una lista de URLs (una sola vez)




const Index = () => {
  FontChange(
    {fontFamily:["inter"],fontUrl:[inter]}

  );

  const contScale = useCyclicCounter({
    
    min: 0,
    max: 1,
    interval: 5000,
    timeOut: 10000,
    loop: true,
    restartTrigger: 0,
  });
  const orientation = useOrientation();

  // Pre-carga

  // Swap seguro (sin “flash”)



  const animateScale = [
    [{ scale: +0.089 }, 100],
    [{ scale: -0.089 }, 100],
    [{ scale: +0.059 }, 80],
    [{ scale: -0.059 }, 80],
    [{ scale: +0.029 }, 60],
    [{ scale: -0.029 }, 60],
    [{ scale: 0.0 }, 1],
    [{}, 5000],
  ];


  const configBackground = {
    style: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    backgroundImage: imageBackgroundLandscape,
    portrait: { x: 50, y: 50, width: 213, height: 120, anchor: "middle" },
    landscape: { x: 48, y: 49, width: 130, height: 231, anchor: "middle" },
  };

  const configSelect = {
    style: { color: "#007EFD", fontWeight: "bold" },
    portrait: { x: 50, y: 71, width: 90, height: 7, anchor: "middle", fontSize: 3 },
    landscape: { x: 68.6, y: 48, width: 38, height: 9, anchor: "middle", fontSize: 1.9 },
    className: "blaze",
    controlsAnimate: "play",
    loop: true,
    children: "↓ SELECT AN OPTION TO CONTINUE ↓",
  };

  const configCTA1 = {
    style: { background: "#26A746", color: "white", borderRadius: "10px", fontWeight: "700", borderBottom:"8px solid #28853B" },
    portrait: { x: 68.5, y: 82.1, width: 32, height: 7, anchor: "middle", fontSize: 3, scale: 1, animate: animateScale },
    landscape: { x: 68.6, y: 66, width: 30, height: 8, anchor: "middle", animate: animateScale, fontSize: 1.5, scale: 1 },
    controlsAnimate: !contScale ? "play" : "stop",
    loop: false,
    children: "YES, I WANT TO START MY MEMOIR",
  };

  const configCTA2 = {
   
    style: { background: "#DC3546", color: "white", borderRadius: "10px", fontWeight: "700", borderBottom:"8px solid #BF2837" },
    portrait: { x: 31.5, y: 82.1, width: 32, height: 7, anchor: "middle", fontSize: 3, scale: 1, animate: animateScale },
    landscape: { x: 68.6, y: 77.5, width: 30, height: 7, animate: animateScale, anchor: "middle", scale: 1, fontSize: 1.5 },
    controlsAnimate: contScale ? "play" : "stop",
    loop: false,
    children: "NO, I’LL WAIT UNTIL NEXT YEAR",
  };

  const configLogo = {
    backgroundImage: imageLogo,
    portrait: { x: 50, y: 14, width: 60, height: 5, anchor: "top" },
    landscape: { x: 68.5, y: 22, width: 29, height: 7, anchor: "middle" },
  };


  const configPage1 = {
    style: { color: "#2F2F2F", fontWeight: "500", flexDirection: "column", gap: 20,  },
    portrait: { x: 50, y: 45, width: 70, height: 30, anchor: "middle", scale: 1, fontSize: 4 },
    landscape: { x: 30, y: 50, width: 35, height: 45, anchor: "middle", scale: 1, fontSize: 2 },
  };

const configCalabaza = {
  backgroundImage:calabaza,
    style: { color: "#2F2F2F", fontWeight: "500", flexDirection: "column", gap: 20,backgroundSize:"contain"  },
    portrait: { x: 130, y: 106, width: 100, height: 40, anchor: "right-bottom", scale: 1, fontSize: 4 },
    landscape: { x: 140, y: 120, width: 100, height: 80, anchor: "right-bottom", scale: 1, fontSize: 4 },
  };

  return (
    <>
      <Card {...configBackground} />
      <Card {...configCalabaza} />

      <Card {...configLogo} />
      <Card {...configPage1}>
      <span style={{ fontWeight: "bold", textAlign: "center", fontSize:'55px' ,color:"#007EFD" }}>🎁 CONGRATS! 🎁</span>
        <span style={{ fontWeight: "bold", textAlign: "center", fontSize:'39px',color:"#007EFD" }}>
          YOU’VE UNLOCKED THE HOLIDAY MEMOIR STARTER TOOL
        </span>
        <span>
          This season, celebrate your story — decades of moments, memories, and milestones worth sharing.
        </span>
        <span>Start now, and you’ll have your personalized memoir ready to gift or receive by Christmas.</span>
        <span>No writing needed — just answer 50 questions, and we’ll do the rest.</span>
      </Card>

      <Card {...configSelect} />
      <Card {...configCTA1} />
      <Card {...configCTA2} />
    </>
  );
};

export default Index;
