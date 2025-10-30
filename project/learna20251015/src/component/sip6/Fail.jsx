import React from 'react'
import Card from '../../../../../src/component/Card'
import imageFail from "../../../assets/image/sip6/fail.png"
const sacudida = Array.from({ length: 5 }, () => [
    [{ rotate: 6 }, 50],
    [{ rotate: -6 }, 50],
  ]).flat();
const Fail = () => {
    const animate=[
        [{  }, 500],
        [{ scale: 0.1 }, 100],
        ...sacudida,
        [{ scale: -0.1 }, 100],
    ]
    const configFail = {
      style: {
              backgroundImage: `url(${imageFail})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pointerEvents: "none"

      },
      portrait: {
        x: 50,
        y: 48,
        width: 90,
        height: 90,
        fontSize: 7,
        anchor: "middle",
        rotate: 0,
        scale: 1,
        animate,
      },
      landscape: {
        width: 70,
        height: 70,
        rotate: 0,
        animate,
        scale: 1,
        x: 50,
        y: 50,
        anchor: "middle",
      },
      loop: true,
      controlsAnimate: "play",
    };
  return (
    <Card {...configFail} />
  )
}

export default Fail