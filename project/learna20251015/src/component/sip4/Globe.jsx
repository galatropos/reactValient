import React from 'react'
import imageGlobe from "../../../assets/image/sip4/globe.webp";
import Card from '../../../../../src/component/Card';

const Globe = () => {
    const animate = [
        [{}, 1000],
        [{opacity: 1}, 10],
        [{ scale: 0.9 }, 100],
        [{  }, 50000],
      ]

    const configGlobe = {
        style: {
          backgroundImage: `url(${imageGlobe})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          color:"#4970B7",
          lineHeight: 1.2,
          fontWeight: 900,
          padding: "0px 10px 30px 20px",
            transformOrigin: "bottom left"

        },
        portrait: {
          x: 68,
          y: 6,
          width: 42,
          height: 19,
          fontSize: 3.3,
          anchor: "top",
          scale: 0.1,
          opacity: 0,
          animate,
        },
        landscape: {
          x: 28,
          y: 12,
          width: 12,
          height: 35,
          anchor: "top",
          rotate: 0,
          animate,
          scale: 1,
          fontSize: 1,
        },
        loop: true,
        controlsAnimate: "play",
        children:"Arrastra y suelta palabras para describir la escena en inglés.",
      };
  return (<Card {...configGlobe} />)
}

export default Globe