import React from 'react'
import Card from '../../../../../../src/component/Card';

const found = ({footerColor,opacity,finish,ico,ctaText,logo,footerText}) => {
    const configFooter = {
        style: {
          color: "white",
          fontWeight: "bold",
          flexDirection: "column",
          background: footerColor,
        },
        portrait: {
          x: 50,
          y: 90,
          width: 300,
          height: 300,
          anchor: "top",
          opacity
        },
        landscape: {
          x: 30,
          y: 80,
          width: 400,
          height: 400,
          anchor: "top",
          scale: 1,
          fontSize: 3.5,
          opacity:finish?0:1,
    
        },
      };
      const configIco = {
        style: {
          color: "white",
          fontWeight: "bold",
          flexDirection: "column",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        },
        backgroundImage: ico,
        portrait: {
          x: 50,
          y: 97,
          width: 15,
          height: 15,
          anchor: "bottom",
        },
        landscape: {
          x: 50,
          y: 90,
          width: 50,
          height: 20,
          anchor: "bottom",
          scale: 1,
          fontSize: 3.5,
        },
      };
      const configCta = {
        style: {
          color: "black",
          fontWeight: 800,
          flexDirection: "column",
          background: "#FFFFFF",
        },
        portrait: {
          x: 95,
          y: 91.5,
          width: 30,
          height: 6,
          anchor: "right-top",
          fontSize: 3.7,
        },
        landscape: {
          x: 95,
          y: 84,
          width: 17,
          height: 10,
          anchor: "right-top",
          scale: 1,
          fontSize: 2,
        },
        children:ctaText,
      };
      const configLogotipo = {
        backgroundImage: logo,
        style: {
            backgroundSize: "contain",
        },
        portrait: {
          x: 14,
          y: 98,
          width: 19.6,
          height: 5.3,
          anchor: "bottom",
        },
        landscape: {
          x: 13,
          y: 99,
          width: 11,
          height: 13,
          anchor: "bottom",
        },  
      };
    
      const configFooterText = {
        style: {
          flexDirection: "row",
          justifyContent: "left",
        },
        portrait: {
          x: 23,
          y: 93.8,
          width: 40,
          height: 5.3,
          anchor: "bottom",
          fontSize: 3.5,
        },
        landscape: {
          x: 16,
          y: 90,
          width: 25,
          height: 13,
          anchor: "bottom",
          rotate: 0,
          scale: 1,
          fontSize: 3,
        },  
        children:footerText,
      };
  return (
    <>
    <Card {...configFooter} />
    <Card {...configIco} />
    <Card {...configCta} />
    <Card {...configLogotipo} />
    <Card {...configFooterText} />
    </>
  )
}

export default found