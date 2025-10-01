import React, { useEffect, useState } from 'react'
import Card from '../../../../../src/component/Card';

const animate = [
    [{ scale: +0.2, opacity: +0.2 }, 250],   // crece y se ilumina (scale 1.2, opacity 1.2 → más brillante)
    [{ scale: -0.1, opacity: -0.3 }, 200],   // baja un poco y se apaga (scale 1.1, opacity 0.9)
    [{ scale: +0.15, opacity: +0.1 }, 200],  // rebota y brilla de nuevo (scale 1.25, opacity 1.0)
    [{ scale: -0.25, opacity: -0.2 }, 250],  // cae fuerte y se oscurece (scale 1.0, opacity 0.8)
    [{ scale: +0.1, opacity: +0.2 }, 200],   // pequeño rebote y destello (scale 1.1, opacity 1.0)
    [{ scale: -0.1, opacity: -0.1 }, 200],   // regresa tranquilo (scale 1.0, opacity 0.9)
    [{}, 400],         
  ];
const card2 = {

    controlsAnimate: "play",
    loop: true,
    style: { fontWeight: "700",transformOrigin: "center" },
    portrait: {
      fontSize: 25,
      height: 100,
      width: 100,
      anchor: "middle",
      x: 50,
      y: 23.5,
      opacity: 1,
      scale: 1,
      animate,
    },
    // LANDSCAPE: "40%" grande en la columna izquierda
    landscape: {
      fontSize: 15,
      height: 20,
      width: 50,
      anchor: "right",
      x: 100,
      y: 40,
      scale: 1,
      opacity: 1,
      animate
    },
  };
  
function useCountUp(to = 40, { from = 0, duration = 1000, easing = "outCubic" } = {}) {
    const [value, setValue] = useState(from);
  
    useEffect(() => {
      let raf;
      const start = performance.now();
      const easings = {
        linear: t => t,
        outCubic: t => 1 - Math.pow(1 - t, 3),
        outQuart: t => 1 - Math.pow(1 - t, 4),
      };
      const ease = easings[easing] || easings.outCubic;
  
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const v = from + (to - from) * ease(t);
        setValue(Math.round(v));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
  
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [from, to, duration, easing]);
  
    return value;
  }
  
const Percen = () => {
  const percent = useCountUp(40, { from: 0, duration: 2000, easing: "outCubic" });

  return (
    <Card {...card2}>{percent}%</Card>

  )
}

export default Percen