import React from 'react'
import Card from '../../../../../src/component/Card'

const CTA = () => {



const cta = {
  style: {
    fontWeight: "400",
    backgroundColor: "#D53F64",
    color: "white",
    transformOrigin: "center",
    fontFamily: "Roboto",
  },
  portrait: {
    fontSize: 4.5,
    height: 6,
    width: 54,
    anchor: "middle",
    x: 50,
    y: 90,
    scale: 1,
    rotate: 0,
    opacity: 1,
    animate:[
      [{ scale: 0.2 }, 900],
      [{ scale: -0.2 }, 900],
    ]
  },
  landscape: {
    fontSize: 3,
    height: 10,
    width: 33,
    anchor: "right",
    scale: 1,
    opacity: 1,
    animate:[
      [{ scale: 0.2 }, 900],
      [{ scale: -0.2 }, 900],
    ],
    x: 91,
    y: 85,
  },
  controlsAnimate: "play",
  loop: true,
}

  return (
    <Card {...cta}>Tap to Save Big Today</Card>
  )
}

export default CTA