import React from 'react'
import landscape from "../../assets/video/sip2/landscape.mp4";
import portrait from "../../assets/video/sip2/portrait.mp4";
import VideoToFramesPlayer from "../../../../src/component/VideoToFramesPlayer";
import Card from '../../../../src/component/Card';
import "../../assets/style/sip2.css";



const Sip2 = () => {

  const animate = [
    [{ scale: 0.5 }, 300],
    [{ scale: -0.5 }, 300],
    [{ scale: 0 }, 1000],
  ];
  const videoStyle={
    style:{
    },
    portrait: {
        height: 97,
        width: 97,
        fontSize: 6,
        anchor: "bottom",
        x: 50,
        y:99,
      },
      landscape: {
        height: 97,
        width: 97,
        anchor: "bottom",
        x: 50,
        y:106,
      },
  }
  const header={
    loop:true,
    controlsAnimate:"play",
    style:{
        color:"#0066FD",
        fontWeight: "bold",
        transformOrigin: " center",
    },
    portrait: {
        height: 10,
        width: 100,
        fontSize: 8,
        anchor: "left-top",
        x: 0,
        y: 4,
        scale:1,
        animate,
      },
      landscape: {
        height: 22,
        width: 54,
        fontSize: 4.8,
        anchor: "left-top",
        x: 0,
        y: 0,
        animate,
        scale:1,
      },
    }
    const logo={
      style:{
          backgroundImage: `url(https://headway-product.com/images/logo.svg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
      },
      portrait: {
          height: 3,
          width: 30,
          fontSize: 6,
          anchor: "top",
          x: 50,
          y: 1,
        },
        landscape: {
          height: 7,
          width: 21,
          fontSize: 6,
          anchor: "left-top",
          x: 63.8,
          y: 4,
        },
      }
      const white={
        style:{
            backgroundColor: "white",
        },
        portrait: {
            height: 10,
            width: 100,
            fontSize: 6,
            anchor: "left-top",
            x: 0,
            y: 0,
          },
          landscape: {
            height: 10,
            width: 40,
            fontSize: 6,
            anchor: "left-top",
            x: 0,
            y: 11,
          },
        }
    return (<>
    
    <VideoToFramesPlayer

    landscapeSrc={landscape}
    portraitSrc={portrait}
    {...videoStyle}
    fps={24}                   // Ajusta el muestreo
    loop={true}               // true si quieres que repita
    />
    <Card {...white} />

    <Card {...header}> Back to School Special</Card> 
    <Card {...logo} />
    </>
  )
}
export default Sip2