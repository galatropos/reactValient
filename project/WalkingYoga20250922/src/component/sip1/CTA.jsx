import React from 'react'
import Card from '../../../../../src/component/Card'

const CTA = () => {



const cta = {
  style: {
    fontWeight: "900",
    backgroundColor: "#3EA134",
    color: "white",
    transformOrigin: "center",
    borderRadius: "30px",
  },
  portrait: {
    fontSize: 4.5,
    height: 7,
    width: 56,
    anchor: "middle",
    x: 50,
    y: 91,
    scale: 1,
    rotate: 0,
    opacity: 1,
    animate:[
        [{ scale: 0.1 }, 500],
        [{ scale: 0 }, 150],
        [{ scale: -0.1 }, 500],
    ]
  },
  landscape: {
    fontSize: 3,
    height: 14,
    width: 35,
    anchor: "right",
    scale: 1,
    opacity: 1,
    animate:[
      [{ scale: 0.1 }, 500],
      [{ scale: 0 }, 150],
      [{ scale: -0.1 }, 500],
    ],
    x: 91,
    y: 76,
  },
  controlsAnimate: "play",
  loop: true,
}

  const text3 = {
    style: {
      color: "#575757",
    },
    portrait: {
      height: 50,
      width: 100,
      anchor: "bottom",
      x: 50,
      y: 122,
      fontSize: 2.6,
    },
    landscape: {
      height: 8,
      width: 30,
      fontSize: 1.5,
      anchor: "right",
      x: 87,
      y: 90,
    },
  };
  return (
    <>
    <Card {...cta}>PRUÉBALO AHORA</Card>

          <Card {...text3}>
            Los resultados pueden variar según las características personales.
          </Card>
    </>
  )
}

export default CTA