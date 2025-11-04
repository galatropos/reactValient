import React from 'react'
import Card from '../../../../../../src/component/Card'
import imageHand from "../../../../assets/image/concept1/hand.webp";

const Hand = ({controller}) => {
    const animate=[
        [{ }, 400],
        [{opacity:1}, 100],
        [{x: -25}, 400],
        [{opacity:-1}, 200],
        [{ }, 700],
    ];

    const animateLandscape=[
      [{ }, 400],
      [{opacity:1}, 100],
      [{x: -15}, 400],
      [{opacity:-1}, 200],
      [{ }, 700],
  ];
    const configHand = {
    
        style: {
          backgroundImage: `url(${imageHand})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
        },
        portrait: {
          x: 70,
          y: 70,
          width: 20,
          animate,
          height: 20,
          anchor: "middle",
          opacity:0,
        },
        landscape: {
          x: 25,
          y: 80,
          width: 20,
          opacity:0,
          animate:animateLandscape,
          height: 20,
          anchor: "left",
        },
        loop: true,
        controlsAnimate: controller,
      };
  return (
   <Card key={4} {...configHand} />
  )
}

export default Hand