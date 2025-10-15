import React from 'react'
import Card from '../../../../../src/component/Card'
import portrait from "../../../assets/image/sip2/content.webp";
import cta from "../../../assets/image/sip2/cta.webp";
import money1 from "../../../assets/image/sip2/money1.webp";
import money2 from "../../../assets/image/sip2/money2.webp";
import money3 from "../../../assets/image/sip2/money3.webp";  
import money4 from "../../../assets/image/sip2/money4.webp";
import asterisc from "../../../assets/image/sip2/asterisc.webp";
import rate from "../../../assets/image/sip2/rate.webp";
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

const configMoney=(moneyImage,animateMoney,x=30,y=50)=>({
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
    width: 120,height: 120,
    anchor: "middle",
    rotate:0,
    scale:1,
    animate:animateMoney,
    scaleY:1,
    scaleX:1,
    rotateY:0,
    rotateX:0
  },
  landscape: {
    x,
    y,
    width: 60,
    height: 130,
    anchor: "middle",
    rotate:0,
    scale:1,
    animate:animateMoney,
    scaleY:1,
    scaleX:1,
    rotateY:0,
    rotateX:0
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
     width: 120,height: 120,
      anchor: "middle",
      rotate:0,
      scale:1,
    },
    landscape: {

      x: -14,
      y: 65,
      width: 80,
      height: 160,
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
   width: 120,height: 120,
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
   width: 120,height: 120,
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
   width: 120,height: 120,
    anchor: "middle",
    rotate:0,
    scale:1,
    animate:animateCta
  },
  landscape: {

    x: 35,
    y: 13,
    width: 70,
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
   <Card {...configMoney(money1,animateMoney1,30,75)}  />
   <Card {...configMoney(money4,animateMoney1,25,59)}  />
   <Card {...configMoney(money2,animateMoney1,74,10)}  />
   <Card {...configMoney(money3,animateMoney1,70,15)}  />
   <Card {...configCTA}  />
  
   </>

  )
}

export default Index