import React, { useEffect, useState } from 'react'
import   '../../../assets/style/sip4.css';
import Card from '../../../../../src/component/Card'
import Disclamer from '../Disclamer';
import cta from '../../../assets/image/sip5/cta.webp'
import rate from '../../../assets/image/sip5/rate.webp'
import sandals from '../../../assets/image/sip5/sandals.webp'
import asterisc from '../../../assets/image/sip5/asterisc.webp'
import duck from '../../../assets/image/sip5/duck.webp'
import number from '../../../assets/image/sip5/number.webp'
import umbrella from '../../../assets/image/sip5/umbrella.webp'
import content from '../../../assets/image/sip5/content.webp'
import lineGif from '../../../assets/video/line.gif'
import Logo from '../Logo';


const animateRender=[
  [{height:100 }, 2000], // abajo
  [{},500]
]


const animateDuck = [
  // --- Intro (2s, deltas que suman 0; opacity sube 0→1) ---
  [{ opacity: +0.10, y: -0.20, rotate: -0.60 }, 300],
  [{ opacity: +0.10, y: -0.15, rotate: -0.45 }, 300],
  [{ opacity: +0.10, y: -0.10, rotate: -0.30 }, 300],
  [{ opacity: +0.10, y: -0.05, rotate: -0.15 }, 300],
  [{ opacity: +0.10, y: +0.05, rotate: +0.15 }, 300],
  [{ opacity: +0.10, y: +0.10, rotate: +0.30 }, 300],
  [{ opacity: +0.10, y: +0.15, rotate: +0.45 }, 300],
  [{ opacity: +0.20, y: +0.20, rotate: +0.60 }, 300],
  [{ opacity: +0.20, y:  0.00, rotate:  0.00 }, 300],
  [{ opacity: +0.10, y:  0.00, rotate:  0.00 }, 300],
  // --- Flote (1.2s, Σx=Σy=Σrotate=0) ---
  [{ x:  0.25, y: -0.20, rotate: -0.6 }, 200],
  [{ x:  0.15, y:  0.00, rotate: -0.2 }, 200],
  [{ x:  0.00, y:  0.20, rotate:  0.2 }, 200],
  [{ x: -0.25, y:  0.20, rotate:  0.6 }, 200],
  [{ x: -0.15, y:  0.00, rotate:  0.2 }, 200],
  [{ x:  0.00, y: -0.20, rotate: -0.2 }, 200],
];
  const configContent = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${content})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x:0,
      y: 70,
      width: 50,
      height: 140,
      anchor: "left",
    },
  };
  const configlineGif = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${lineGif})`,
    },
    portrait: {
      height: 16,
      width: 70,
      anchor: "middle",
      x:37,
      y: 37.5,
    },
    landscape: {
      height: 25,
      width: 34,
      anchor: "middle",
      x:18,
      y: 50,
    },
  };

  const animateCta=[
    [{x:-2  }, 1000],
    [{x:2  }, 1000],
  ]
  const configCta = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${cta})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      animate:animateCta
    },
    landscape: {
      x:0,
      y: 70,
      width: 50,
      height: 140,
      anchor: "left",
      animate:animateCta
    },
    controlsAnimate: "play", 
    loop:true
  };
  const configRate = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${rate})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: -9,
      y: 65,
      width: 70,
      height: 140,
      anchor: "left",
    },
  };

  const configSandals = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${sandals})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 0,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      animate: animateRender,

    },
    landscape: {
      x: 59,
      y: 40,   
      width: 50,
      height: 0,
      anchor: "middle",
      animate: animateRender,

    },
    controlsAnimate: "play", 
  };

  const configAsterisc = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${asterisc})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
   
      x:0,
      y: 70,
      width: 50,
      height: 140,
      anchor: "left",
    },
  };





  const configNumber = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${number})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x:0,
      y: 70,
      width: 50,
      height: 140,
      anchor: "left",
    },
  };

  const configUmbrella = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${umbrella})`,
    },
    portrait: {
      x: 50,
      y: 50,
      width: 100,
      height: 0,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      animate: animateRender,
    },
    landscape: {
      x: 25,
      y: 70,
      rotate: -60,
      width: 50,
      height: 0,
      anchor: "left",
      animate: animateRender,
    },

controlsAnimate: "play", 
  };

const Index = () => {
const [opacityDuck, setOpacityDuck] = useState(0)

useEffect(() => {
  // Se ejecuta una sola vez al montar el componente
  const timer = setTimeout(() => {
    setOpacityDuck(1);
  }, 2100); // 3000 ms = 3 segundos

  // Limpieza por si el componente se desmonta antes de que termine el tiempo
  return () => clearTimeout(timer);
}, []);



const configDuck = {
  style: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transformOrigin: "center center",
    backgroundImage: `url(${duck})`,
  },
  portrait: {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    anchor: "middle",
    rotate: 0,
    animate: animateDuck,
    scale: 1,
    opacity: opacityDuck,

  },
  landscape: {
    x: 30,
    y: 30,
    width: 60,
    height: 110,
    animate: animateDuck,
    opacity: opacityDuck,
    anchor: "left",
  },
  
  controlsAnimate: "play", 
  loop:true,
};



 

  return (
   <>

<Logo />

<Card {...configRate} />
<Card {...configDuck} />
<Card {...configNumber} />
<Card {...configSandals} />
<Card {...configUmbrella} />
<Card {...configContent} />
  <Card {...configDuck}/>
<Card {...configAsterisc} />
<Card {...configCta} />

<Card {...configlineGif} />

   <Card {...configNumber}/>
   <Disclamer option={false} />

   </>

  )
}

export default Index