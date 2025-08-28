import React from 'react'
import landscape from "../../assets/video/sip4/landscape.mp4";
import portrait from "../../assets/video/sip4/portrait.mp4";
import VideoToFramesPlayer from "../../../../src/component/VideoToFramesPlayer";
import Card from '../../../../src/component/Card';
import "../../assets/style/sip4.css";


const Sip4 = () => {

  const animate = [
    [{ scale: 0.5 }, 300],
    [{ scale: -0.5 }, 300],
    [{ scale: 0 }, 1000],
  ];
  const videoStyle={
    style:{
      
    },
    portrait: {
        height: 103,
        width: 100,
        fontSize: 6,
        anchor: "bottom",
        x: 50,
        y:101,
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
        y: 4.8,
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
          y: 2,
        },
        landscape: {
          height: 7,
          width: 21,
          fontSize: 6,
          anchor: "left-top",
          x: 70,
          y: 20,
        },
      }
      const white={
        style:{
            backgroundColor: "#EFEFEF",
        
          },
        portrait: {
            height: 10,
            width: 100,
            fontSize: 6,
            anchor: "left-top",
            x: 0,
            y: -10,
          },
          landscape: {
            height: 20,
            width: 100,
            fontSize: 6,
            anchor: "left-top",
            x: 0,
            y: -3,
          },
        }
        const white2={
          style:{
              backgroundColor: "#EFEFEF",
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
              height: 120,
              width: 20,
              fontSize: 6,
              anchor: "top",
              x: 80,
              y: 0,
            },
          }
          const white3={
            style:{
                backgroundColor: "#EFEFEF",
                
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
                height: 120,
                width: 20,
                fontSize: 6,
                anchor: "top",
                x: -10,
                y: 0,
              },
            }
        const button={
          style:{
              backgroundColor: "#2A65F5",
              color: "white",
              fontWeight: "bold",
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
              height: 10,
              width: 20,
              fontSize: 3,
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
    return (<>
    
    <VideoToFramesPlayer

    landscapeSrc={landscape}
    portraitSrc={portrait}
    {...videoStyle}
    fps={24}                   // Ajusta el muestreo
    loop={true}               // true si quieres que repita
    />
    <Card {...white}  />
    <Card {...white2}  />
    <Card {...white3}  />

    <Card {...header}> Back to School Special</Card> 
    <Card {...tap} loop={true} controlsAnimate='play'> Tap to read</Card> 
    <Card {...logo}   /> 
    <Card {...button} loop={true} controlsAnimate='play' >Try Now</Card>
    </>
  )
}

export default Sip4