import React, { memo } from "react";
import imageHand from "../../../../assets/image/concept2/hand.webp";
import Card from "../../../../../../src/component/Card";

const ANIMATE_PORTRAIT = [
  [{}, 500],
  [{ opacity: 1 }, 200],
  [{ scale: 0.2 }, 100],
  [{ scale: -0.2 }, 100],
  [{ scale: 0.2 }, 100],
  [{ scale: -0.2 }, 100],
  [{ opacity: -1 }, 100],
  [{}, 500],
];

const ANIMATE_LANDSCAPE = [...ANIMATE_PORTRAIT];

function Hand({ controller = "stop" }) {
  const configHand = {
    style: {
      backgroundImage: `url(${imageHand})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      zIndex: 10,
      pointerEvents: "none",
    },
    portrait: { x: 60, y: 63, width: 20, height: 20, anchor: "middle", opacity: 0, animate: ANIMATE_PORTRAIT },
    landscape: { x: 22, y: 60, width: 20, height: 20, anchor: "left", opacity: 0, animate: ANIMATE_LANDSCAPE },
    loop: true,
    controlsAnimate: controller,
  };

  return <Card {...configHand} />;
}

export default memo(Hand, (a, b) => a.controller === b.controller);
