import React from 'react'
import Card from '../../../../../../src/component/Card'
import imageHand from "../../../../assets/image/concept1/hand.webp";

const Hand = ({controller}) => {
    const animate=[
        [{opacity:1 }, 400],
        [{scale:-0.2,rotate:-10 }, 100],
        [{ }, 200],
        [{x:-15 }, 400],
        [{x:-5,opacity:-1 }, 400],
        [{x:20,scale:0.2,rotate:10 }, 100],
        [{ }, 500],
        [{opacity:1 }, 400],

        [{scale:-0.2,rotate:10 }, 100],
        [{ }, 200],
        [{x:15 }, 400],
        [{x:5,opacity:-1 }, 400],
        [{x:-20,scale:0.2,rotate:-10 }, 100],
        [{ }, 500],
        [{opacity:1 }, 400],

        [{scale:-0.2, }, 100],
        [{scale:0.2, }, 100],
        [{opacity :-1 }, 400],
     
        [{ }, 1000],

    ];
    const animateLandscape=[
        [{opacity:1 }, 400],
        [{scale:-0.2,rotate:-10 }, 100],
        [{ }, 200],
        [{x:-15 }, 400],
        [{x:-5,opacity:-1 }, 400],
        [{x:20,scale:0.2,rotate:10 }, 100],
        [{ }, 500],
        [{opacity:1 }, 400],

        [{scale:-0.2,rotate:10 }, 100],
        [{ }, 200],
        [{x:15 }, 400],
        [{x:5,opacity:-1 }, 400],
        [{x:-20,scale:0.2,rotate:-10 }, 100],
        [{ }, 500],
        [{opacity:1 }, 400],

        [{scale:-0.2, }, 100],
        [{scale:0.2, }, 100],
        [{opacity :-1 }, 400],
     
        [{ }, 1000],

    ];
    const configHand = {
    
        style: {
          backgroundImage: `url(${imageHand})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          pointerEvents: "none",
          zIndex:30 
          
        },
        portrait: {
          x: 70,
          y: 50,
          width: 20,
          animate,
          height: 20,
          anchor: "middle",
          opacity:0,
        },
        landscape: {
          x: 50,
          y: 50,
          width: 15,
          height: 15,
          opacity:0,
          animate:animateLandscape,
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