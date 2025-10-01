import React from 'react'
import landscape from "../../assets/video/sip4/landscape.mp4";
import portrait from "../../assets/video/sip4/portrait.mp4";
import VideoToFramesPlayer from "../../../../src/component/VideoToFramesPlayer";
import Card from '../../../../src/component/Card';
import "../../assets/style/sip4.css";


const Sip4 = () => {


  const animate = [
    [{ scale: 0 }, 3000],
    [{ scale: 0.2 }, 300],
    [{ scale: -0.2 }, 300],
  ];
  const videoStyle={
    style:{
      border: "3px solid black",
    },
    portrait: {
        height: 150,
        width: 150,
        fontSize: 6,
        anchor: "middle",
        x: 50,
        y:50,
      },
      landscape: {
        height: 97,
        width: 97,
        anchor: "bottom",
        x: 34,
        y:100,
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
        y: 5.3,
        scale:1,
        animate,
      },
      landscape: {
        height: 22,
        width: 58,
        fontSize: 5.3,
        anchor: "left-top",
        x: 5.2,
        y: 0,
        animate,
        scale:1,
      },
    }
    const logo={
      style:{
          backgroundImage: `url(https://headway-product.com/images/logo.svg)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
      },
      portrait: {
          height: 4,
          width: 30,
          fontSize: 7,
          anchor: "top",
          x: 50,
          y: 2,
        },
        landscape: {
          height: 13,
          width: 23,
          fontSize: 6,
          anchor: "left-top",
          x: 70,
          y: 20,
        },
      }
        const button={
          style:{
              backgroundColor: "#2A65F5",
              color: "white",
              fontWeight: "500",
              borderRadius: "20px",
          },
          portrait: {
              height: 10,
              width: 8,
              fontSize: 2,
              anchor: "left-top",
              x: 0,
              y: 0,
              scale:3,
              hidden:true,

            },
            landscape: {
              height: 9,
              width: 20,
              fontSize: 2.5,
              anchor: "top",
              x: 80,
              y: 80,
              scale:1,
              rotate:0, 
              animate:
                [
                  [{scale:0.2,},450],
                  [{scale:-0.2},450]
              ]}
          
        }
        const tap={
          style:{
              color:"black",
              backgroundColor: "#EFEFEF",
              fontWeight:400,
          },
          portrait: {
              height: 10,
              width: 100,
              fontSize: 8,
              anchor: "left-top",
              x: 0,
              y: 50,
              hidden:true,
              
            },
            landscape: {
              height: 22,
              width:30,
              fontSize: 5.3,
              anchor: "top",
              x: 79,
              y: 40,
              scale:1,
              rotate:0,

              animate:
                [
                  [{scale:0.2,},450],
                  [{scale:-0.2},450]
              ]}
          }


  const whiteT = {
    style: {
      backgroundColor: "#EFEFEF",
    },
    portrait: {
      height: 30,
      width: 1000,
      anchor: "bottom",
      x: -2,
      y: 12,
    },
    landscape: {
      height: 100,
      width: 1000,
      fontSize: 6,
      anchor: "bottom",
      x: -2,
      y: -2,
    },
  };

  const whiteB = {
    style: {
      backgroundColor: "#EFEFEF",
    },
    portrait: {
      height: 5,
      width: 10000,
      anchor: "bottom",
      x: -2,
      y: 103,
    },
    landscape: {
      height: 10,
      width: 1000,
      fontSize: 6,
      anchor: "bottom",
      x: -2,
      y: 120,
    },
  };
  const whiteR = {
    style: {
      backgroundColor: "#EFEFEF",
    },
    portrait: {
      height: 1000,
      width: 5,
      anchor: "left",
      x: -19,
      y: -2,
    },
    landscape: {
      height: 1000,
      width: 500,
      anchor: "right",
      x: 2,
      y: -2,
    },
  };
  const whiteL = {
    style: {
      backgroundColor: "#EFEFEF",
    },
    portrait: {
      height: 1000,
      width: 50,
      anchor: "left",
      x: 112,
      y: -2,
    },
    landscape: {
      height: 1000,
      width: 500,
      anchor: "left",
      x: 80,
      y: -2,
    },
  };

  const white = {
    style: {
      backgroundColor: "#EFEFEF",
    },
    portrait: {
      height: 1000,
      width: 5,
      anchor: "left",
      x: 99.5,
      y: -2,
      hidden: true,
    },
    landscape: {
      height: 10,
      width: 300,
      anchor: "left",
      x: 15,
      y: 10,
    },
  };
    return (<>
    
    <VideoToFramesPlayer

    landscapeSrc={landscape}
    portraitSrc={portrait}
    {...videoStyle}
    fps={24}                   // Ajusta el muestreo
    loop={true}               // true si quieres que repita
   
  repeat={[
    [2000, 1000, 4]
  ]} // opcional
    />
    
      <Card {...whiteT} />
      <Card {...whiteB} />
      <Card {...whiteL} />
      <Card {...whiteR} />
      <Card {...white} />

    <Card {...header}> Hola mundo</Card> 
    <Card {...tap} loop={true} controlsAnimate='play'> Tap to read</Card> 
    <Card {...logo}   /> 
    <Card {...button} loop={true} controlsAnimate='play' >Try Now</Card>
    </>
  )
}

export default Sip4