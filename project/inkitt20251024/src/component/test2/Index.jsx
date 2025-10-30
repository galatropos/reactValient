
import React from 'react'
import Concept from '../main/concept2/Index'
import imageMain from "../../../assets/image/test2/main.png";
import imageLogoGalatea from "../../../assets/image/logoGalatea.png";
import imageLogoCandy from "../../../assets/image/logoCandy.webp";
import videoCandy from "../../../assets/video/test1/video.mp4";
import FontChange from "../../../../../src/component/FontChange";
import Inter from "../../../../../src/assets/font/Inter/Inter-VariableFont_opsz,wght.ttf";


const Index = () => {
  FontChange({ fontUrl: [Inter], fontFamily: ["Inter"] });

  const galatea={
    mraid: {
      appstore:
        "https://apps.apple.com/es/app/galatea-novels-audiobooks/id1380362212",
      playStore: "https://play.google.com/store/apps/details?id=com.colt",
      windows: "https://galatea.com",
    },
    imageMain:imageMain,
    logo:imageLogoGalatea,
    title:"Hot alpha Males",
    ctaText:"READ NOW",
    ctaColor:"#56B069",
    text:<>
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
    </>
  }

  const candyJar={
    mraid: {
      appstore:
        "https://apps.apple.com/us/app/candyjartv-drama-shorts/id6466786430",
      playStore:
        "https://play.google.com/store/apps/details?id=com.inkitt.app.galateatv.android",
      windows: "https://candyjar.com/",
    },
    imageMain:imageMain,
    logo:imageLogoCandy,
    title:"Hot alpha Males",
    ctaText:"WHATCH NOW",
    ctaColor:"#F542CE",
    video:{
      srcPortrait:videoCandy,
      srcLandscape:videoCandy,
    }
  }
  return (
    <Concept {
      ...galatea
//      ...candyJar
    } />
  )
}

export default Index