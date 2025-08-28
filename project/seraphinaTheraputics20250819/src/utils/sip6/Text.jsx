import React, { useEffect, useState } from 'react'
import Card from '../../../../../src/component/Card';

const Text = () => {
    const [get1, set1] = useState()
    const [get2, set2] = useState()
    const [get3, set3] = useState()
    const [get4, set4] = useState()
    const [get5, set5] = useState()
    const animation1 = [[{ opacity: 1 }, 500]];
    const animation2 = [[{  opacity: 1 }, 500]];
    const animation3 = [[{  opacity: 1 }, 500]];
    const animation4 = [[{  opacity: 1 }, 500]];

    const styleA = {
        textAlign: "right",
        alignItems: "end",
        justifyContent: "end",
        fontWeight: "600",
        color: "white",
    
      };

      const portraitA = {
        height: 5,
        width: 40,
        fontSize: 3,
        anchor: "left-top",
        opacity:0,
      x: 48,
      };
      const landscapeA = {
        height: 5,
        width: 24,
        fontSize: 2,
        anchor: "left-top",
        opacity:0,
      x: 23
      };
    
    
      const a1 = {
        style: styleA,
        landscape: {
          ...landscapeA,
      animate: animation1,
      y: 11,
        },
        portrait: {
          y: 39.5,
      animate: animation1,
      ...portraitA,
        },
      };
    
      const a2 = {
        style: styleA,
        landscape: {
          ...landscapeA,
      animate: animation2,
      y: 26,
        },
        portrait: {
          ...portraitA,
      animate: animation2,
      y: 47.5,
        },
      };
    
      const a3 = {
        style: styleA,
        landscape: {
          ...landscapeA,
      animate: animation3,
      y: 39,
        },
        portrait: {
          ...portraitA,
      animate: animation3,
      y: 56,
        },
      };
    
      const a4 = {
        style: styleA,
        landscape: {
          ...landscapeA,
      animate: animation4,
      y: 54,
        },
        portrait: {
          ...portraitA,
      animate: animation4,
      y: 63.5,
        },
      };
    
    
      const a5 = {
        style: styleA,
        landscape: {
          ...landscapeA,
      animate: animation4,
      y: 63.2,
        },
        portrait: {
          ...portraitA,
      animate: animation4,
      y: 72,
        },
      };
    
    
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
  <Card {...a1} controlsAnimate={get1}  loop={false} setSecuenceFinish={set1} >With 36+ cellular activities, fatty15 supports</Card>
  <Card {...a2} controlsAnimate={get2}  loop={false} setSecuenceFinish={set1} >Red blood cell health</Card>
  <Card {...a3} controlsAnimate={get3}  loop={false} setSecuenceFinish={set1} >Healthy metabolism</Card>
  <Card {...a4} controlsAnimate={get4}  loop={false} setSecuenceFinish={set1} >Cognitive health</Card>
  <Card {...a5} controlsAnimate={get5}  loop={false} setSecuenceFinish={set1} >Liver health</Card>
  </Card>

  )
}

export default Text