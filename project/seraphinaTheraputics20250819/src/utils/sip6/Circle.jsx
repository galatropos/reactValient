import { useEffect, useState } from "react";
import Card from "../../../../../src/component/Card";

//controlsAnimate="play" setSecuenceFinish={}


const styleCricle = {
  border: "1px solid white",

  borderRadius: "100%",
};
  const portraitCricle={
    opacity:0,
  height: 2,
  width: 3.5,
  fontSize: 3,
  anchor: "left-top",
  x: 40.2,

}
const landscapeCricle={
  opacity:0,
width: 2,
height: 3.5,
fontSize: 3,
anchor: "left-top",
x: 20,
y: 38,

}

const animationL1=[
  [{opacity: 1}, 100],
   [ { },1500],
]

const animationL2=[
  [{opacity: 1}, 500],
  [ {},100],
]
const animationL3=[
  [{opacity: 1}, 500],
  [ {},100],
]
const animationL4=[
  [{opacity: 1}, 500],
  [ {},100],
]
const animationL5=[
  [{opacity: 1}, 500],
  [ {},100],
]




const animation1=[
  [{opacity: 1}, 100],
   [ {  },500],
]

const animation2=[
  [{opacity: 1}, 500],
  [ {},100],
]
const animation3=[
  [{opacity: 1}, 500],
  [ {y: 0},100],
]
const animation4=[
  [{opacity: 1}, 500],
  [ {},100],
]
const animation5=[
  [{opacity: 1}, 500],
  [ {},100],
]
  
  const circle1 = {
    style: styleCricle,
    landscape: {
      ...landscapeCricle,
      animate:animationL1,
      y: 15.5,

    },
    portrait: {
      ...portraitCricle,
      animate:animation1,
      y: 44,

    },
  };
   const circle2 = {
    style: styleCricle,
    landscape: {
      ...landscapeCricle,
      animate:animationL2,
      y: 30,

    },
    portrait: {
      animate:animation2,
      ...portraitCricle,
      y: 52,

    },
  };
   const circle3 = {
    style: styleCricle,
    landscape: {
      ...landscapeCricle,
      animate:animationL3,
      y: 56,


    },
    portrait: {
      ...portraitCricle,
      animate:animation3, 
      y: 60,



    },
  };
   const circle4 = {
    style: styleCricle,
    landscape: {
      ...landscapeCricle,
      animate:animationL4,
      y: 42.5,

    },
    portrait: {
      ...portraitCricle,
      animate:animation4,
      y: 68,

    },
  };

  const circle5 = {
    style: styleCricle,
    landscape: {
      ...landscapeCricle,
      animate:animationL5,
      y: 67,

    },
    portrait: {
      ...portraitCricle,
      animate:animation5,
      y: 76,

    },
  };



  
  const Circle = ({setCircle,circle}) => {
        const [get1, set1] = useState()
        const [get2, set2] = useState()
        const [get3, set3] = useState()
        const [get4, set4] = useState()
        const [get5, set5] = useState()


        
          useEffect(() => {
            const timers = [];
        
            // Espera 1 segundo y empieza la cascada
            timers.push(
              setTimeout(() => set1("play"), 1500)
            );
            timers.push(
              setTimeout(() => set2("play"), 1500 + 250)
            );
            timers.push(
              setTimeout(() => set3("play"), 1500 + 250 * 2)
            );
            timers.push(
              setTimeout(() => set4("play"), 1500 + 250 * 3)
            );
            timers.push(
              setTimeout(() => set5("play"), 1500 + 250 * 4)
            );
        
            // Cleanup (si se desmonta el componente)
            return () => timers.forEach((t) => clearTimeout(t));
          }, []);

    return (
      <Card>
    
      <Card {...circle1} controlsAnimate= {get1}  loop={false} setSecuenceFinish= {set1} />
      <Card {...circle2}  controlsAnimate={get2}  loop={false} setSecuenceFinish={set2}/>
      <Card {...circle3}  controlsAnimate={get3}  loop={false} setSecuenceFinish={set3}/>
      <Card {...circle4}  controlsAnimate={get4}  loop={false} setSecuenceFinish={set4}/>
      <Card {...circle5}  controlsAnimate={get5}  loop={false} setSecuenceFinish={set5}/>
</Card>
    )
  }
  
  export default Circle