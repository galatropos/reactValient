import React from 'react'
import Card from '../../../../../src/component/Card'
import portrait from "../../../assets/image/sip3/content.webp";
import cta from "../../../assets/image/sip3/cta.webp";
import money1 from "../../../assets/image/sip3/money1.webp";
import money2 from "../../../assets/image/sip3/money2.webp";
import money3 from "../../../assets/image/sip3/money3.webp";  
import asterisc from "../../../assets/image/sip3/asterisc.webp";
import rate from "../../../assets/image/sip3/rate.webp";
import   '../../../assets/style/sip2.css';
import Disclamer from '../Disclamer';
import Logo from '../Logo';


const animateMoney1=[

 // ——— Círculo base (r = 0.24) ———
 [{ x:  0.00, y:  0.24 }, 300],
 [{ x:  0.17, y:  0.17 }, 300],
 [{ x:  0.24, y:  0.00 }, 300],
 [{ x:  0.17, y: -0.17 }, 300],
 [{ x:  0.00, y: -0.24 }, 300],
 [{ x: -0.17, y: -0.17 }, 300],
 [{ x: -0.24, y:  0.00 }, 300],
 [{ x: -0.17, y:  0.17 }, 300],

 // ——— Círculo grande TRIPLE (r = 0.72) con offset +0.06 en x ———
 [{ x:  0.06, y:  0.72 }, 300],
 [{ x:  0.57, y:  0.51 }, 300], // 0.51 ≈ 0.72/√2
 [{ x:  0.78, y:  0.00 }, 300],
 [{ x:  0.57, y: -0.51 }, 300],
 [{ x:  0.06, y: -0.72 }, 300],
 [{ x: -0.45, y: -0.51 }, 300],
 [{ x: -0.66, y:  0.00 }, 300],
 [{ x: -0.45, y:  0.51 }, 300],

 // ——— Círculo grande TRIPLE espejo (r = 0.72) con offset −0.06 en x ———
 [{ x: -0.06, y:  0.72 }, 300],
 [{ x:  0.45, y:  0.51 }, 300],
 [{ x:  0.66, y:  0.00 }, 300],
 [{ x:  0.45, y: -0.51 }, 300],
 [{ x: -0.06, y: -0.72 }, 300],
 [{ x: -0.57, y: -0.51 }, 300],
 [{ x: -0.78, y:  0.00 }, 300],
 [{ x: -0.57, y:  0.51 }, 300],
]
const animateMoney2=[

  [{  y:  0.8,rotateX:15  }, 1000],  // abajo
  [{  y:  -0.8,rotateX:-15  }, 1000],  // abajo
]
const animateMoney3=[


  [{  y:  0.8,rotateX:10  }, 1000],  // abajo
  [{  y:  -0.8,rotateX:-10  }, 1000],  // abajo
]
const configMoney=(moneyImage,animateMoney,y=50,x=25)=>({
  style: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transformOrigin: "center center",
    backgroundImage: `url(${moneyImage})`,
  },
  portrait: {
    x: 50,
    y: 50,
    width: 115,height: 115,
    anchor: "middle",
    rotate:0,
    scale:1,
    scaleY:1,
    scaleX:1,
    rotateX:0,
    animate:animateMoney,
    rotateY:1,
  },
  landscape: {
    x,
    y,
    width: 60,
    height: 130,
    anchor: "middle",
    rotate:0,
    scale:1,
    scaleY:1,
    scaleX:1,
    rotateX:0,
    animate:animateMoney,
    rotateY:1,
 },
 loop:true,
 controlsAnimate: "play", 
})

const Index = () => {
  const animateCta=[
    [{x:-6  }, 1000],
    [{x:6  }, 1000],
  ]

    const configContent={
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${portrait})`,

    },
    portrait: {
      x: 50,
      y: 50,
      width: 115,height: 115,
      anchor: "middle",
      rotate:0,
      scale:1,
    },
    landscape: {
      x: -9,
      y: 65,
      width: 70,
      height: 140,
      anchor: "left",
 } 
}


const configRate={
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
    width: 115,height: 115,
    anchor: "middle",
    rotate:0,
    scale:1,
  },
  landscape: {
    x: 31,
    y: -0,
    width: 80,
    height: 160,
    anchor: "left",
} 
}
const configAsterisc={
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
    width: 115,height: 115,
    anchor: "middle",
    rotate:0,
    scale:1,
  },
  landscape: {
    x: 35,
    y: 13,
    width: 70,
    height: 120,
    anchor: "left",
} 
}


const configCTA={
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
    width: 115,height: 115,
    anchor: "middle",
    rotate:0,
    scale:1,
    animate:animateCta
  },
  landscape: {

    x: 38.5,
    y: 13,
    width: 65,
    height: 120,
    anchor: "left",
    animate:animateCta

}, 
loop:true,
controlsAnimate: "play", 

}
  return (
   <>
   <Disclamer option={false} />
   <Logo />


   <Card {...configContent}  />
   <Card {...configRate}  />
   <Card {...configAsterisc}  />
   <Card {...configMoney(money1,animateMoney1,75)}  />
   <Card {...configMoney(money2,animateMoney2,65,23)}  />
   <Card {...configMoney(money3,  animateMoney3,20,75)}  />
   <Card {...configCTA}  />
  
   </>

  )
}

export default Index