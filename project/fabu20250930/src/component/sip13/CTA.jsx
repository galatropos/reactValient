import React from 'react'
import Card from '../../../../../src/component/Card'

const CTA = () => {
const animate=
  [
    [{ scale: 0.1 }, 500],
    [{ scale: 0 }, 150],
    [{ scale: -0.1 }, 500],
];



const cta = {
  style:{
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    transformOrigin: "center center" ,
    borderRadius: "60px", // todas las esquinas
  },
  portrait: {
    fontSize: 4.5,
    height: 8,
    width: 56,
    anchor: "middle",
    x: 50,
    y: 90,
    scale: 1,
    rotate: 0,
    opacity: 1,
    animate},
  landscape: {
    fontSize: 3,
    height: 14,
    width: 35,
    anchor: "middle",
    scale: 1,
    opacity: 1,
    animate,
    x: 70,
    y: 50,
  },
  controlsAnimate: "play",
  loop: true,
};

  return (
    <>
    <Card {...cta} className="fenix-btn" >Take Test</Card>

    </>
  )
}

export default CTA