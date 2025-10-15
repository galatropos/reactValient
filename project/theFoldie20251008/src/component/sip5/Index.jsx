import React, { useEffect, useState } from 'react'
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
import imageFront1 from '../../../assets/image/image3/1-brand.webp'
import imageFront2 from '../../../assets/image/image3/2-brand.webp'
import imageFront3 from '../../../assets/image/image3/3-brand.webp'
import imageFront4 from '../../../assets/image/image3/4-brand.webp'  
import imageFront5 from '../../../assets/image/image3/5-brand.webp'
import StreamMoveVertical from '../../../../../src/component/effects/stream/StreamMoveVertical'
import StreamOpacityX from '../../../../../src/component/effects/stream/StreamOpacityX'
import CTA from '../CTA'

const image1 = [imagetop1,   imagetop2,   imagetop3,   imagetop4,   imagetop5];
const image2 = [imagebrand1, imagebrand2, imagebrand3, imagebrand4, imagebrand5];
const image3 = [imageCel1,   imageCel2,   imageCel3,   imageCel4,   imageCel5];
const image4 = [imageFront1, imageFront2, imageFront3, imageFront4, imageFront5];
const imagesStreams = ({array = {},rotate=0,width=500,height=500}) =>
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
  const [hidden,setHidden]=useState(false)

    useEffect(() => {
       setTimeout(() =>setHidden(true), 500);
  },[]);
  
  const configLogotipo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 30,
      y: 42,
      width: 48,
      height: 10,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 80,
      y: 1,
      width: 20,
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
    },
    portrait: {
      x: 30,
      y: 51,
      width: 50,
      fontSize:4.5,
      height: 10,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 80,
      y: 23,
      width: 40,
      scale: 1,
      height: 60,
      anchor: "middle",
      fontSize:2.8
    },
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
      y: 7,
      rotate: 0,
      scale: 1,
      width: 102,
      anchor: "top",
      height: 25,
      
    },
    landscape: {
      x: 25,
      y: -4,
      width: 54,
      height: 42,
      anchor: "top",
    },
  };
  const configCard2 = {
    style: {

    },
    portrait: {
      x: 105,
      y: 50,
      anchor: "right",
      rotate: 0,
      scale: 1,
      width: 50,
      height: 30,
      opacity:1,
    },
    landscape: {
      opacity:1,
      x: 55,
      y: 85,
      width: 30,
      height: 50,
      anchor: "right-bottom",
    },
  };
  const configCard3 = {
    style: {
      background: "#F1F1F1",


    },
    portrait: {
      
      x: 60,
      y: 70,
      rotate: 0,
      scale: 1,
      width: 40,
      height: 30,
    },
    landscape: {
      x: 78,
      y:95,
      width: 45,
      height: 50,
      anchor:"bottom"
    },
  };
  const configCard4 = {
    style: {
      overflow: "hidden",

    },
    portrait: {

      x: 0,
      y: 84,
      anchor: "left",
      rotate: 0,
      scale: 1,
      width: 50,
      height: 30,
      opacity:1,

    },
    landscape: {
      x: 17,
      y: 85,
      opacity:1,
      width: 20,
      height: 45,
      anchor: "right-bottom",
    },
  };

const configLine={  
  style: {
    borderBottom: "5px solid black",
  },
  portrait: {
    x: 0,
    y: 0,
    height: 4,
    width: 68,
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
    x: 98,
    y: -1,
    width: 30,
    height: 10,
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
      <StreamMoveVertical key={"stream3"} invert={true}   {...configCard3} elements={imagesStreams({array:image2,height:400,width:400})}         />
      <StreamMoveVertical key={"stream1"}  {...configCard1}elements={imagesStreams({array:image1,rotate:40,height:389,width:400})} />
      <StreamOpacityX key={"stream2"}      {...configCard2} elements={imagesStreams({array:image3,height:490})}                              />
      <StreamOpacityX key={"stream4"} invert={true}     {...configCard4} elements={imagesStreams({array:image4})}                  />



      <PopScale {...configPopUp} elements={elementPopUp} intervalChange={4000} scale={0.8} />
      <Card {...configLogotipo} />
      <CTA xLandscape={80} yLandscape={37} xPortrait={30} yPortrait={64}/>

    <Card {...configLine}/>
    <Card {...configLogo2}/>


    </>
  );
};

export default Index;



