import React, { useEffect, useState } from 'react'
import bgPortrait from "../../../assets/image/bg.webp";
import bgLandscape from "../../../assets/image/portrait.jpg";
import Card from '../../../../../src/component/Card';


const Background = () => {
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerWidth > window.innerHeight) {
        setOrientation("landscape");
      } else {
        setOrientation("portrait");
      }
    };

    checkOrientation(); // Checar al montar
    window.addEventListener("resize", checkOrientation);

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

const background = {
  style: {
    backgroundImage: `url(${orientation === "portrait" ? bgPortrait : bgLandscape})`,
    backgroundSize: "100% auto",
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
  },
  portrait: {
    height: 220,
    width: 300,
    anchor: "left-top",
    x: -98,
    y: -52,
  },
  // LANDSCAPE (fondo a toda el área)
  landscape: {
    height: 180,
    width: 170,
    anchor: "left-top",
    x:-43.4,
    y: -50,
  },
};

  return (
    <Card {...background} />
    
  )
}

export default Background