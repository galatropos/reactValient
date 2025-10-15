import React from 'react'
import Card from '../../../../../src/component/Card'
import content from '../../../assets/image/sip1/content.webp'
import background from '../../../assets/image/sip1/background.webp'
import word from '../../../assets/image/sip1/word.webp'
import Disclamer from '../Disclamer';

const Index = () => {

  const animateWords=[
    [{ scale: 0.08 }, 1000],
    [{ x:  0.6,  y: -0.4 }, 50],
    [{ x: -0.8,  y:  0.5 }, 50],
    [{ x:  0.7,  y:  0.3 }, 50],
    [{ x: -0.5,  y: -0.6 }, 50],
    [{ x:  0.3,  y:  0.2 }, 50],
    [{ x: -0.3,  y:  0.0 }, 50],
    [{ x:  0.2,  y:  0.1 }, 50],
    [{ x: -0.2,  y: -0.1 }, 50],
    [{ x:  0.1,  y:  0.0 }, 50],
    [{ x:  0.0,  y:  0.0 }, 100], 
    [{ scale: -0.08 }, 1000],
    [{  }, 1000],
  ]

  const configBackground = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${background})`,
      transformOrigin: "center center",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 467,
      height: 203,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      opacity: 1,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 232,
      height: 200,
      rotate: 0,
      scale: 1,
      anchor: "middle",
  } ,
   controlsAnimate: "play", 
   loop:true
   
  }
  

const configContent={
  style: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${content})`,
    transformOrigin: "center center",
  },
  portrait: {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    anchor: "middle",
    rotate: 0,
    scale: 1,
    opacity: 1,
  },
  landscape: {
    x: 50,
    y: 50,
    width: 50,
    height: 140,
    rotate: 0,
    scale: 1,
    anchor: "middle",
 } ,
 controlsAnimate: "play", 
 loop:true
}

const configWord={
  style: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${word})`,
    transformOrigin: "center center",
  },
  portrait: {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    anchor: "middle",
    rotate: 0,
    scale: 1,
    opacity: 1,
    animate:animateWords
  },
  landscape: {
    x: 50,
    y: 50,
    width: 50,
    height: 140,
    rotate: 0,
    scale: 1,
    anchor: "middle",
    animate:animateWords,
 } ,
  controlsAnimate: "play", 
    loop:true
}



  return (
   <>
   <Card {...configBackground}   />
   <Card {...configContent}  />
   <Card {...configWord}  />
 
   
   <Disclamer option={false} />
   </>

  )
}

export default Index