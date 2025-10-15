import React from 'react'
import Card from '../../../../../src/component/Card'
import imageLogotipo from '../../../assets/image/logo.webp'
import animatePulse from '../../utils/animatePulse'
import image11 from '../../../assets/image/image2/11.webp'
import image21 from '../../../assets/image/image2/22.webp'
import image31 from '../../../assets/image/image2/31.webp'
import image41 from '../../../assets/image/image2/41.webp'
import image51 from '../../../assets/image/image2/51.webp'


const image1=[image11,image21,image31,image41,image51]



const Index = () => {

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
      width: 40,
      height: 10,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 80,
      y: 5,
      width: 22,
      height: 10,
      anchor: "top",
    },
  };


  const configCta = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      border: "1px solid black",
      color: "white",
      background: "#1F2937",
      borderRadius: "60px",
      zIndex:999
    },
    portrait: {

      x: 30,
      y: 58,
      width: 28,
      fontSize:3,
      height: 6,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      animate:animatePulse
    },
    landscape: {
      x: 80,
      y: 40,
      width: 18,
      height: 12,
      anchor: "middle",
      fontSize:2.4,
      scale: 1,
      animate:animatePulse
    },
    loop:true,
    controlsAnimate: "play",
  };

  const configStream1={
    elements:image1,
    intervalChange:3000,
    direction:'top',
    style:{
      border:"1px solid black",
    },
    portrait:{
      width:50,
      height:50,
      x:50,
      y:50,
      anchor:"middle",
      scale:1,
    },
    landscape:{
      width:50,
      height:50,
      x:50,
      y:50,
      anchor:"middle",
      scale:1,
    },
  }
  return (
    <>
      {/* 👇 Llamada ajustada: fitHeight + widthAuto. No pasamos itemsPerView. */}
      <PopSloteMachine />
      <Card {...configLogotipo} />
      <Card {...configCta}>BUY <span style={{ fontWeight: 'bold' }}>&nbsp; NOW</span></Card>
    </>
  );
};

export default Index;



