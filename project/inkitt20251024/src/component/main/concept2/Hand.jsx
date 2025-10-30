import React from "react";
import imageHand from "../../../../assets/image/concept2/hand.webp";
import Card from "../../../../../../src/component/Card";

const animatePortrait = [
    [{  }, 500],
    [{ opacity:1, }, 200],
    [{ scale:0.2 }, 100],
    [{ scale:-0.2 }, 100],
    [{ scale:0.2 }, 100],
    [{ scale:-0.2 }, 100],
    [{ opacity:-1 }, 100],
    [{  }, 500],

];

const animateLandscape = [
  [{  }, 500],
  [{ opacity:1, }, 200],
  [{ scale:0.2 }, 100],
  [{ scale:-0.2 }, 100],
  [{ scale:0.2 }, 100],
  [{ scale:-0.2 }, 100],
  [{ opacity:-1 }, 100],
  [{  }, 500],
];


const Hand = ({controller="stop"}) => {

    const configHand = {
    
        style: {
          backgroundImage: `url(${imageHand})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          zIndex: 10,
        },
        portrait: {
          x: 55,
          y: 55,
          width: 20,
          animate: animatePortrait,
          height: 20,
          anchor: "middle",
          opacity:0,
        },
        landscape: {
          x: 65,
          y: 45,
          width: 20,
          opacity:0,
          animate: animateLandscape,
          height: 20,
          anchor: "left",
        },
        loop: true,
        controlsAnimate:controller,
      };
  return <Card key={4} {...configHand} />;
};

export default Hand;
