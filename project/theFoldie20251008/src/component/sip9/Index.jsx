import React from 'react'
import Card from '../../../../../src/component/Card'
import imageLogotipo from '../../../assets/image/logo.webp'
import PopScale from '../../../../../src/component/effects/pop/PopScale'
import imageCircle from '../../../assets/image/circle/circle.webp'
import CTA from '../CTA'

const Index = () => {
  const configLogotipo={
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 50,
      y: 42,
      width: 60,
      height:11,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 50,
      y: 35,
      width: 30,
      height: 11,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
    },
  }
  const configPopUp={
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "bold",
    },
    portrait: {
      x: 50,
      y: 49.5,
      fontSize: 8,
      width: 90,
      height: 50,
      anchor: "middle",
      rotate: 0,
      scale: 0.8,
    },
    landscape: {
      x: 50,
      y: 50,
   width: 90,
      height: 50,
      scale: 1,
      fontSize: 4,
      anchor: "middle",
    },
  }
  
  const elementPopUp=[
    <span>BUY 1 GET 1 FOR FREE</span>,
    <span>BOGO Offer!</span>,
  
  ]
  const animateCircle=[
    [{ rotate: 90,scale:0.1 }, 2000],
    [{ rotate: 90,scale:0.1 }, 2000],
    [{ rotate: 90,scale:-0.1 }, 2000],
    [{ rotate: 90,scale:-0.1 }, 2000],
  ];
  const configCircle={
    style: {
  
      backgroundImage: `url(${imageCircle})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
  
    },
    portrait: {
      x: 50,
      y: 50,
      width: 220,
      height: 220,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      animate:animateCircle,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 300,
      height: 200,
      anchor: "middle",
      rotate: 0,
      animate:animateCircle,
      scale: 1,
    },
    loop:true,
    controlsAnimate: "play",
  }
    return (
      <>
      <Card {...configCircle}/>
      <PopScale {...configPopUp}  elements={elementPopUp} intervalChange={4000} scale={0.8}/>
     <CTA xLandscape={50} yLandscape={69} xPortrait={50} yPortrait={64}/>
      <Card {...configLogotipo}/>
      </>
    )
  }
export default Index