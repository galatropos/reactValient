import React, { memo } from "react";
import Card from "../../../../../../src/component/Card";
import imageHand from "../../../../assets/image/concept1/hand.webp";

const BASE_STYLE = {
  backgroundImage: `url(${imageHand})`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  pointerEvents: "none",
};

const ANIMATE_PORTRAIT = [
  [{}, 400],
  [{ opacity: 1 }, 200],
  [{ x: -25 }, 400],
  [{ opacity: -1 }, 200],
  [{}, 700],
];

const ANIMATE_LANDSCAPE = [
  [{}, 400],
  [{ opacity: 1 }, 100],
  [{ x: -15 }, 400],
  [{ opacity: -1 }, 200],
  [{}, 700],
];

const Hand = ({ controller = "play" }) => {
  const configHand = {
    style: BASE_STYLE,
    portrait: {
      x: 70,
      y: 70,
      width: 20,
      height: 20,
      anchor: "middle",
      opacity: 0,
      animate: ANIMATE_PORTRAIT,
    },
    landscape: {
      x: 25,
      y: 80,
      width: 20,
      height: 20,
      anchor: "left",
      opacity: 0,
      animate: ANIMATE_LANDSCAPE,
    },
    loop: true,
    controlsAnimate: controller,
  };

  return <Card {...configHand} />;
};

export default memo(Hand, (prev, next) => prev.controller === next.controller);
