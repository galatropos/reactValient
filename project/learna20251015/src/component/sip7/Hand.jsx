import React from "react";
import imageHand from "../../../assets/image/sip6/hand.png";
import Card from "../../../../../src/component/Card";

const scaleHand = Array.from({ length: 100 }, () => [
  [{ scale: 0.2 }, 500],
  [{}, 100],
  [{ scale: -0.2 }, 500],
]).flat();
const Hand = ({ index = 0 }) => {
  let opacity = 0;
  let x = 88;
  let y = 80;
  let xl = 88 - 26;
  let yl = 80;
  let scale = 1;
  const opacityHand = [{ opacity: 1 }, 800];
  let animate = [[{}, 1000], opacityHand, ...scaleHand, [{}, 8000]];

  switch (index) {
    case 0: //intro
      animate = [opacityHand, [{}, 8000]];
      break;
    case 1: //book
      x = 48;
      y = 50;
      xl = 50;
      yl = 48;
      console.log("object");

      break;
    case 2: //pen
      x = 88;
      y = 58;
      xl = 62;
      yl = 58;
      break;
    case 3: //table
      x = 46;
      y = 71;
      xl = 48;
      yl = 70;
      break;
    case 4: //continuiar
      x = 84;
      y = 88;
      xl = 60;
      yl = 88;
      break;
    case 5: //tired
      x = 49;
      y = 50;
      xl = 49;
      yl = 50;
      break;
    case 6: //continuar
      x = 80;
      y = 88;
      xl = 60;
      yl = 88;
      break;
    case 7: //continuar
      x = 80;
      y = 88;
      xl = 60;
      yl = 88;
      break;
    case 8: //continuarMal
      x = 80;
      y = 88;
      xl = 60;
      yl = 88;
      break;
    case 9: //continuarMal
      x = 80;
      y = 88;
      xl = 60;
      yl = 88;
  }

  const configHand = {
    style: {
      backgroundImage: `url(${imageHand})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      pointerEvents: "none",
    },
    portrait: {
      x,
      y,
      width: 18,
      height: 18,
      anchor: "middle",
      // 👇 visible solo desde index>=1 para no depender de opacidad en ani1
      opacity: opacity,
      animate,
      scale,
    },
    landscape: {
      x: xl,
      y: yl,
      width: 5,
      height: 10,
      anchor: "middle",
      opacity: opacity,
      animate,
      scale,
    },
    loop: true,
    controlsAnimate: "play",
  };

  // 🔑 Al cambiar index, React remonta Card y arranca la animación correspondiente
  return <Card key={`hand-${index}`} {...configHand} />;
};

export default Hand;
