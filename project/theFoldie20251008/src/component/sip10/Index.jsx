import React, { useEffect, useState } from 'react'
import Card from '../../../../../src/component/Card'
import useOrientation from '../../../../../src/hook/useOrientation'
import imageLogotipo from '../../../assets/image/logo.webp'
import image1 from '../../../assets/image/circle/1.webp'
import image2 from '../../../assets/image/circle/2.webp'
import image3 from '../../../assets/image/circle/3.webp'
import image4 from '../../../assets/image/circle/4.webp'
import image5 from '../../../assets/image/circle/5.webp'
import image6 from '../../../assets/image/circle/6.webp'
import image7 from '../../../assets/image/circle/7.webp'
import image8 from '../../../assets/image/circle/8.webp'
import image9 from '../../../assets/image/circle/9.webp'
import image10 from '../../../assets/image/circle/10.webp'
import image11 from '../../../assets/image/circle/11.webp'  
import image12 from '../../../assets/image/circle/12.webp'
import image13 from '../../../assets/image/circle/13.webp'
import image14 from '../../../assets/image/circle/14.webp'
import image15 from '../../../assets/image/circle/15.webp'
import image16 from '../../../assets/image/circle/16.webp'
import image17 from '../../../assets/image/circle/17.webp'
import image18 from '../../../assets/image/circle/18.webp'


import PopScale from '../../../../../src/component/effects/pop/PopScale'
import CarouselDefault from '../../../../../src/component/effects/carousel/CarouselDefault'
const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18];
import CTA from '../CTA'
const Index = () => {
  const device=useOrientation()
  const [hidden,setHidden]=useState(false)

    useEffect(() => {
       setTimeout(() =>setHidden(true), 500);
  },[]);
  

  const configCarrousel=(elements,y=100,x,direction="right")=>({
    elements,
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "bold",
    },
    portrait: {
      x: 50,
      y,
      fontSize: 5,
      width: 200,
      height: 23,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x,
      y: 50,
      width: 20,
      height: 200,
      scale: 1,
      fontSize: 5,
      anchor: "middle",
      
    },
    sptepDuration: 2000  ,
    direction:device==="portrait"?direction:direction==="left"?"top":"bottom"
  });

  const configLogotipo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 50,
      y: 46,
      width: 30,
      height: 10,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 50,
      y: 65,
      width: 21,
      height: 60,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
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
      x: 50,
      y: 49,
      fontSize: 6,
      width: 90,
      height: 50,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 90,
      height: 50,
      scale: 1,
      fontSize: 2.6,
      anchor: "middle",
    },
  };

  const elementPopUp = [
    <span>BUY 1 GET 1 FOR FREE</span>,
    <span>BOGO Offer!</span>,
  ];


  // 👇 Ajuste clave: la imagen escala por ALTO y el ancho es AUTO (sin deformar)
  const sytleImage = {
    boxSizing: "border-box",
    display: "block",
    height: "100%",     // ocupa todo el alto del item (igual al Card)
    maxHeight: "100%",  // nunca más alto que el Card
    width: "auto",      // mantiene proporción
  };

const elementCarrousel = images.map((src, i) => (
  <img
    key={i}
    src={src}
    style={sytleImage}
    alt={`${i + 1}`}
    loading="eager"
    decoding="async"
  />
));

const confiBlank={
  style: {
    background:"#FFF"
  },
  portrait: {
    x: 50,
    y: 50,
    fontSize: 6,
    width: 500,
    height: 5000,
    anchor: "middle",
    rotate: 0,
    scale: 1,
    hidden
  },
  landscape: {
    x: 50,
    y: 50,
    width: 5000,
    height: 5000,
    scale: 1,
    fontSize: 2.8,
    anchor: "middle",
    hidden
  },
}

  return (
    <>
      {/* 👇 Llamada ajustada: fitHeight + widthAuto. No pasamos itemsPerView. */}
      <CarouselDefault {...configCarrousel(elementCarrousel,-3.3, 8, "left")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel,15.9, 26, "right")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel,59, 73, "right")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel,78, 91, "left") }  />


      <PopScale {...configPopUp} elements={elementPopUp} intervalChange={3000} scale={0.8} />
      <Card {...configLogotipo} />
      <CTA xLandscape={50} yLandscape={65} xPortrait={50} yPortrait={61} />
      <Card {...confiBlank} />
    </>
  );
};

export default Index;
