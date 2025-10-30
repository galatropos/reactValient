import React, { Children, useEffect, useState } from 'react'
import Card from '../../../../../src/component/Card'
import imageLogotipo from '../../../assets/image/logo.webp'
import PopScale from '../../../../../src/component/effects/pop/PopScale'
import imagetop1 from '../../../assets/image/image3/1-open.webp'
import imagetop2 from '../../../assets/image/image3/2-open.webp'
import imagetop3 from '../../../assets/image/image3/3-open.webp'
import imagetop4 from '../../../assets/image/image3/4-open.webp'
import imagetop5 from '../../../assets/image/image3/5-open.webp'
import imagebrand1 from '../../../assets/image/image3/1-frontT.webp'
import imagebrand2 from '../../../assets/image/image3/2-frontT.webp'
import imagebrand3 from '../../../assets/image/image3/3-frontT.webp'
import imagebrand4 from '../../../assets/image/image3/4-frontT.webp'
import imagebrand5 from '../../../assets/image/image3/5-frontT.webp'
import imageCel1 from '../../../assets/image/image3/1-top.webp'
import imageCel2 from '../../../assets/image/image3/2-top.webp'
import imageCel3 from '../../../assets/image/image3/3-top.webp'
import imageCel4 from '../../../assets/image/image3/4-top.webp'
import imageCel5 from '../../../assets/image/image3/5-top.webp'
import imageFront1 from '../../../assets/image/image3/1-cel.webp'
import imageFront2 from '../../../assets/image/image3/2-cel.webp'
import imageFront3 from '../../../assets/image/image3/3-cel.webp'
import imageFront4 from '../../../assets/image/image3/4-cel.webp'  
import imageFront5 from '../../../assets/image/image3/5-cel.webp'
import StreamMoveVertical from '../../../../../src/component/effects/stream/StreamMoveVertical'
import StreamOpacityX from '../../../../../src/component/effects/stream/StreamOpacityX'
import CTA from '../CTA'

const image1 = [imagetop1,   imagetop2,   imagetop3,   imagetop4,   imagetop5];
const image2 = [imagebrand1, imagebrand2, imagebrand3, imagebrand4, imagebrand5];
const image4 = [imageCel1,   imageCel2,   imageCel3,   imageCel4,   imageCel5];
const image3 = [imageFront1, imageFront2, imageFront3, imageFront4, imageFront5];
const imagesStreams = ({array = {},rotate=0,width=500,height=500,x,y}) =>
  array.map((src, i) => (
   

    <img
      key={i}
      src={src}
      alt={`stream-${i}`}
      loading="eager"
      decoding="async"
      style={{
        
        width,              // tamaño REAL en PX (no porcentual)
        height,
        transform:`rotate(${rotate}deg)`,
      }}
      />
  ));

const Index = () => {

  
  const configLogotipo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 18,
      y: 43,
      width: 25,
      height: 9,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 65,
      y: 1,
      width: 15,
      height: 16,
      anchor: "top",
    },
  };

  const configPopUp = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "bold",
      textAlign:"left",
    },
    portrait: {
      x: 5,
      y: 54,
      width: 40,
      fontSize:8,
      height: 10,
      anchor: "left",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 52,
      y: 23,
      width: 50,
      scale: 1,
      height: 60,
      anchor: "left",
      fontSize:5
    },
    children:"Buy 1, Get 1 Free!"
  };


  const elementPopUp = [
    <span>BUY 1 GET 1 FOR FREE</span>,
    <span>BOGO Offer!</span>,
  ];

  const configCard1 = {
    style: {
      background: "#F1F1F1",

    },
    portrait: {
      x: 50,
      y: 8,
      rotate: 0,
      scale: 1,
      width: 95,
      anchor: "top",
      height: 29.5,
      
    },
    landscape: {
      x: 29,
      y: 2,
      width: 53,
      height: 50,
      anchor: "top",
    },
  };
  const configCard2 = {
    style: {

    },
    portrait: {
      x: 101,
      y: 50,
      anchor: "right",
      rotate: 0,
      scale: 1,
      width: 55,
      height: 20,
      opacity:1,
    },
    landscape: {
      opacity:1,
      x: 55,
      y: 89,
      width: 30,
      height: 34,
      anchor: "right-bottom",
    },
  };
  const configCard3 = {
    style: {
      background: "#F1F1F1",

    },
    portrait: {
      
      x: 72.5,
      y:62,
      rotate: 0,
      scale: 1,
      width: 50,
      height: 34,
      anchor:"top"
    },
    landscape: {
      x: 80,
      y:95,
      width: 35,
      height: 43,
      anchor:"bottom"
    },
  };
  const configCard4 = {
    style: {

    },
    portrait: {

      x: -5,
      y: 84,
      anchor: "left",
      rotate: 0,
      scale: 1,
      width: 55,
      height: 30,
      opacity:1,

    },
    landscape: {
      x: 28,
      y: 90,
      opacity:1,
      width: 25,
      height: 41,
      anchor: "right-bottom",
    },
  };

const configLine={  
  style: {
    borderBottom: "5px solid black",
  },
  portrait: {
    x: 2.5,
    y: 0,
    height: 4,
    width: 73,
    anchor: "left-top",
  },
  landscape: {
    x: 11,
    y: 95,
    width: 40,
    height: 60,
    anchor: "left-bottom",
  },
};
const configLogo2 = {
  style: {
    backgroundImage: `url(${imageLogotipo})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  portrait: {
    x: 97,
    y: -2.5,
    width: 20,
    height: 11,
    anchor: "right-top",
    rotate: 0,
    scale: 1,
  },
  landscape: {
    x: 11,
    y: 86,
    width: 10,
    height: 16,
    anchor: "right-top",
  },
};

  return (
    <>
      {/* 👇 Llamada ajustada: fitHeight + widthAuto. No pasamos itemsPerView. */}
      <StreamMoveVertical key={"stream3"} invert={true}   {...configCard3} elements={imagesStreams({array:image2,height:440,width:450,})}         />
      <StreamMoveVertical key={"stream1"}  {...configCard1}elements={imagesStreams({array:image1,rotate:40,height:389,width:400})} />
      <StreamOpacityX key={"stream2"}      {...configCard2} elements={imagesStreams({array:image3,height:390, width:390})}                              />
      <StreamOpacityX key={"stream4"} invert={true}     {...configCard4} elements={imagesStreams({array:image4,width:400, height:394})}                  />



      <Card {...configPopUp} elements={elementPopUp} intervalChange={4000} scale={0.8}  />
      <Card {...configLogotipo} />
      <CTA xLandscape={67} yLandscape={37} xPortrait={23} yPortrait={69} scale={0.8}/>

    <Card {...configLine}/>
    <Card {...configLogo2}/>

    


    </>
  );
};

export default Index;



