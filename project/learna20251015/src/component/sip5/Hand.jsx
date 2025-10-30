import React, { useEffect } from 'react'
import imageHand from "../../../assets/image/sip5/hand.png";
import Card from '../../../../../src/component/Card';

function useGlobalTouch(handler) {
    useEffect(() => {
      const fn = (e) => handler(e);
      window.addEventListener("pointerdown", fn);
      return () => window.removeEventListener("pointerdown", fn);
    }, [handler]);
  }

const Hand = () => {
const [control, setControl] = React.useState("play");

    useGlobalTouch((e) => setControl("stop"));

    const animateHandPortrait = [
        [{ rotate:30 ,opacity:1 }, 100], //the
        [{ x:-80 }, 1000], //the
        [{ opacity:-1 }, 200], //the
        [{  }, 400], //the
        [{ opacity:1, rotate:-30 }, 600], //the
        [{ x:80 }, 1000], //the
        [{ opacity:-1 }, 1000], //the
        [{  }, 400], //the

]

const animateHandLandscape = [
  [{ rotate:30 ,opacity:1 }, 100], //the
  [{ x:-30 }, 1000], //the
  [{ opacity:-1 }, 200], //the
  [{  }, 400], //the
  [{ opacity:1, rotate:-30 }, 600], //the
  [{ x:30 }, 1000], //the
  [{ opacity:-1 }, 1000], //the
  [{  }, 400], //the

]

const configHand = {


    style: {
      backgroundImage: `url(${imageHand})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 90,
      y: 80,
      width: 24,
      height: 10,
      anchor: "middle",
      opacity:0,
      animate: animateHandPortrait,
    },
    landscape: {
      x: 66,
      y: 60,
      width: 8,
      height: 13,
      anchor: "top",
      animate: animateHandLandscape,
      opacity:0,
      rotate: 0,
      scale: 1,
    },
    loop: true,
    controlsAnimate: control,
  };
  return (
    <Card {...configHand} />
  )
}

export default Hand