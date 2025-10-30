import React  from "react";
import Card from "../../../../../src/component/Card";
import imageLogotipo from "../../../assets/image/logo.webp";
import Hand from "./Hand";
import background from "../../../assets/image/sip5/background.webp";
import imageCTA from "../../../assets/image/sip5/cta.png";

import useAudio from "../../../../../src/hook/useAudio";
import audioClick from "../../../assets/audio/sip5/click.mp3";

import CarouselMip from "../../../../../src/component/effects/carousel/CarouselMip";
import { registerOpenOnClick } from "../../../../../src/utils/registerOpenOnClick";
import {useRedirectMIPEvent} from "../../../../../src/hook/useRedirectMIP";

import face1 from "../../../assets/image/sip5/face1.png";
import face2 from "../../../assets/image/sip5/face2.png";
import face3 from "../../../assets/image/sip5/face3.png";

import SlideFace from "../../../../../src/component/effects/carousel/carouselMip/SlideFace"; // opcional: tu componente de slide
import AutoScrollBox from "../../../../../src/component/AutoScrollBox";
const Start = ({setActive}) => {
    const click=useAudio(audioClick)
  
  const logo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 8,
      width: 14,
      height: 7.5,
      anchor: "middle",
    },
    landscape: {
      x: 5,
      y: 4,
      width: 8,
      height: 13,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };

  const configP1 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: 800,
      flexDirection: "column",
    },
    portrait: {
      x: 50,
      y: 14,
      width: 90,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 7,
      lineHeight: 4.5,
    },
    landscape: {
      x: 50,
      y: 5,
      fontSize: 4,
      width: 50,
      height: 10,
      anchor: "top",
      scale: 1,
    },
    children: "Elige tu tutor de IA, empieza a hablar inglés!"
  };
  const configBackground = {
    style: {
      backgroundImage: `url(${background})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 460,
      height: 300,
      anchor: "middle",
    },
    landscape: {
      rotate: 90,
      x: 50,
      y: 50,
      width: 100,
      height: 180,
      anchor: "middle",
    },
  };

  const configCTA = {
    style: {
      backgroundImage: `url(${imageCTA})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      fontWeight:700,
    },
    portrait: {
      x: 50,
      y: 90,
      width: 42,
      height: 8,
      anchor: "middle",
      fontSize:4.3,
    },
    landscape: {
      x: 50,
      y: 102,
      width: 25,
      height: 25,
      anchor: "bottom",
      rotate: 0,
      fontSize:3,
      scale: 1,
    },
    children:"Más información"
  };

  const configScroller = {
    style: {
      color: "#FFF",
      flexDirection: "column",
      overFlow: "scroll",
      fontWeight: 900,
    },
    portrait: {
      x:50,
      y: 50,
      width: 10,
      height: 100,
      anchor: "middle",
      fontSize: 7,
    },
    landscape: {
      x: 50,
      y: 42,
      width: 36,
      height: 60,
      anchor: "middle",
      rotate: 0,
      scale: 0.6,
      fontSize: 5,
    },
    loop: true,
  };


  const activateOn=()=>{
    useRedirectMIPEvent({
      appstore:
        "https://apps.apple.com/ve/app/learna-ai-aprender-ingl%C3%A9s/id6478287397",
      playStore:
        "https://play.google.com/store/apps/details?id=com.codeway.aitutor",
      windows: "https://ailearna.com/es",
    });
    registerOpenOnClick();
  }
const onSound=()=>{
  click.play()
}


const slides = [
  // Puedes pasar elementos simples con divs:
  (
    <div style={{ width:"100%", height:"100%", background:"#000", position:"relative" }}>
      <img src={face1} alt="" style={{ width:"100%", height:"100%", objectFit:"contain" }} />
      <div style={{ position:"absolute", top:16, left:16, background:"#fff8", padding:"6px 10px", borderRadius:8 }}>
        Badge 1
      </div>
    </div>
  ),

  // O usar tu propio componente SlideFace (con overlays, etc.)
  (
    <SlideFace
      src={face2}
      title="Learna - X"
      objectFit="contain"
      imgScale={1.05}
      bg="#000"
      overlay={(
        <div style={{ position:"absolute", bottom:16, right:16 }}>
          <button
            onClick={(e) => { e.stopPropagation(); console.log("CTA!"); }}
            style={{
              background:"#3300CF",
              color:"#fff",
              border:0,
              borderRadius:10,
              padding:"10px 14px",
              cursor:"pointer"
            }}
          >CTA</button>
        </div>
      )}
    />
  ),

  // Otro elemento libre:
  (
    <div style={{ width:"100%", height:"100%", background:"#101010", color:"#fff", display:"grid", placeItems:"center" }}>
      <div style={{ textAlign:"center" }}>
        <h2 style={{ margin:0 }}>Slide de Texto</h2>
        <p style={{ opacity:0.8 }}>Puedes meter cualquier JSX aquí.</p>
      </div>
    </div>
  ),
];



  return (
    <>
      <Card {...configBackground} onPressStart={activateOn} />
      <Card {...configP1}  onPressStart={activateOn} />
      <Card {...logo}   onPressStart={activateOn} />
      <Card {...configCTA}  onPressStart={activateOn}  />
        <Card {...configScroller}
        onPressEndInside={onSound}
        onPressEndOutside={onSound}
        >
<CarouselMip
  slides={slides}
  fullScreen={false}     // ⬅️ peeks
  slideWidthPct={2}   // ⬅️ cada slide = 86% del ancho
  gapPx={400}             // ⬅️ separación visible
  centerScale={1}
  compensateGap={false}
  sideOuterGapPx={0}
/>
        </Card>
        <Hand />

      
    </>
  );

return(
  <Card>
   <AutoScrollBox height="70vh" speed={50} loop pauseOnHover controlsMode={"hidden"}  >
      <b>Texto enorme</b> — Pon aquí tu contenido. Puedes pegar párrafos largos,
      listas o lo que quieras. El contenedor hará autoscroll vertical a una
      velocidad fija en píxeles por segundo. Al llegar al final, reinicia al
      principio (si `loop` es true). Pasa el mouse o toca para pausar. <br />
      <br />
      • Línea 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
      • Línea 2: Sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. <br />
      • Línea 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. <br />
      • Línea 4: Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. <br />
      {/* Repite o genera más contenido para probar el scroll */}
      {Array.from({ length: 200 }).map((_, i) => (
        <div key={i}>Línea extra #{i + 1} — contenido de prueba.</div>
      ))}
    </AutoScrollBox>
  </Card>
)
};

export default Start;
