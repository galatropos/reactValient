import React from 'react'
import Card from '../../../../../../src/component/Card';

const found = ({footerColor,finish,ico,ctaText,logo,footerText,ctaColor}) => {
    const configFooter = {
        style: {
          color: "white",
          fontWeight: "bold",
          flexDirection: "column",
          background: footerColor,
          zIndex:100,

        },
        portrait: {
          x: 50,
          y: 90,
          width: 300,
          height: 300,
          anchor: "top",
          opacity:finish?0:1,
        },
        landscape: {
          x: 30,
          y: 80,
          width: 400,
          height: 20,
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
          zIndex:100,
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
          color: ctaColor,
          fontWeight: 800,
          flexDirection: "column",
          background: "white",
          zIndex:100,
          borderRadius: "20px",
        },
        portrait: {
          x: 95.8,
          y: 92,
          width: 30,
          height: 6,
          anchor: "right-top",
          fontSize: 3.7,
        },
        landscape: {
          x: 95.4,
          y: 84.8,
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
          filter: "brightness(0) saturate(1) invert(1) ",
            backgroundSize: "contain",
            zIndex:100,
          },
        portrait: {
          x: 14,
          y: 98,
          width: 14,
          height: 5,
          anchor: "bottom",
        },
        landscape: {
          x: 13,
          y: 98.6,
          width: 11,
          height: 13,
          anchor: "bottom",
        },  
      };
    
      const configFooterText = {
        style: {
          flexDirection: "row",
          justifyContent: "left",
          zIndex:100,
        },
        portrait: {
          x: 23.2,
          y: 94,
          width: 40,
          height: 5.3,
          anchor: "bottom",
          fontSize: 3.5,
        },
        landscape: {
          x: 16.5,
          y: 89.4,
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
    <span style={{display:finish?'none':'block'}}>
    <Card key={"card1"} {...configFooter} />
    <Card key={"card2"} {...configIco} />
    <Card key={"card3"} {...configCta} />
    <Card key={"card4"} {...configLogotipo} />
    <Card key={"card5"} {...configFooterText} />
    </span>
  )
}

export default found