import React, { useEffect, useState } from 'react'
import Card from '../../../../../src/component/Card'
import imageLogotipo from '../../../assets/image/logo.webp'
import transparent from '../../../assets/image/sip2/transparent.webp'
import PopScale from '../../../../../src/component/effects/pop/PopScale'
import CarouselDefault from '../../../../../src/component/effects/carousel/CarouselDefault'
import RandomImg from './RandomImg'
import CTA from '../CTA'
const Index = () => {
  const [hidden,setHidden]=useState(false)

    useEffect(() => {
       setTimeout(() =>setHidden(true), 300);
  },[]);
  

  const configCarrousel=(elements,y=100,x)=>({
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
      height: 30,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x:50,
      y: x,
      width: 200,
      height: 50,
      scale: 1,
      fontSize: 5,
      anchor: "middle",
      
    },
    sptepDuration: 2000  ,
    direction:"left"
  });


  const configBoard = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "25px",

    },
    portrait: {
      x: 50,
      y: 50,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      width: 80,
      opacity: 0.8,
      backdropBlur: 2000,
      blur:0.1,
      height: 45,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 40,
      opacity: 0.8,
      backdropBlur: 3000,
      height: 60,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
  };

  const configLogotipo = {
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
      height: 11,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 50,
      y: 62,
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
      y: 50,
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
      fontSize: 3.3,
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
  
  
  const elementCarrousel = [
    <RandomImg intervalMs={2120} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={1310} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={2606} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={1802} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={1210} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={1140} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
  ];
  
  const elementCarrousel2 = [
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={2390} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={1100} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={1500} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={1401} />,
    <img src={transparent} style={sytleImage} alt="transparent" loading="eager" decoding="async" />,
    <RandomImg intervalMs={2030} />,
  ];

  return (
    <>

      {/* 👇 Llamada ajustada: fitHeight + widthAuto. No pasamos itemsPerView. */}
      <CarouselDefault {...configCarrousel(elementCarrousel2,-20, -40, "left")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel,0, -10, "left")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel2,20, 20, "left")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel,40, 50, "left")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel2,60,70, "left")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel,80, 100, "left")}/>
      <CarouselDefault {...configCarrousel(elementCarrousel2,100, 130, "left")}/>


      <Card {...configBoard} />
      <PopScale {...configPopUp} elements={elementPopUp} intervalChange={8000} scale={0.8} />
      <Card {...configLogotipo} />
      <CTA xLandscape={50} yLandscape={69} xPortrait={50} yPortrait={64}/>
 
      <Card {...confiBlank} />
    </>
  );
};

export default Index;
