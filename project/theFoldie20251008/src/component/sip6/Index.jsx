import React from 'react'
import Card from '../../../../../src/component/Card'
import "./../../../assets/style/sip5.css"
import imageLogotipo from '../../../assets/image/logo.webp'
import image11 from '../../../assets/image/image2/11t.webp'
import image12 from '../../../assets/image/image2/12t.webp'
import image21 from '../../../assets/image/image2/21t.webp'
import image22 from '../../../assets/image/image2/22t.webp'
import image31 from '../../../assets/image/image2/31t.webp'
import image32 from '../../../assets/image/image2/32t.webp'
import image41 from '../../../assets/image/image2/41t.webp'
import image42 from '../../../assets/image/image2/42t.webp'
import image51 from '../../../assets/image/image2/51t.webp'
import image52 from '../../../assets/image/image2/52t.webp'
import imageReview from '../../../assets/image/image2/review.webp'
import imageAvailable from '../../../assets/image/image2/available.webp'
import imageFree from '../../../assets/image/image2/free.webp'
import PopWave from '../../../../../src/component/effects/pop/PopWave'
import CTA from '../CTA'

const imagesStreams1=[image51,image31,image41,image21,image11];
const imagesStreams2=[image12,image22,image32,image42,image52];


const imagesStreams=(array)=>array.map((src, i) => (
  <img
    key={i}
    src={src}
    style={{
      objectFit: "cover",
      height: "100%",
      width: "fit-content",
      

    }}
    alt={`random-${i}`}
    loading="eager"
    decoding="async"

  />
));

const Index = () => {

  const configLogotipo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter:" brightness(0) invert(1)" /* vuelve todo blanco */
    },
    portrait: {
      x: 50,
      y: 0,
      width: 40,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 78,
      y: 30,
      width: 18,
      height: 10,
      anchor: "top",
    },
  };
  const configStream1 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",

    },
    portrait: {
      x: 70,
      y: 58,
      anchor: "middle",
      width: 70,
      height: 60,
    },
    landscape: {
      x: 45,
      y: 75,
      anchor: "middle",
      width: 100,
      height: 80,
    },
  };

  const configStream2 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",

    },
    portrait: {
      x: 28,
      y: 36,
      anchor: "middle",
      width: 90,
      height: 60,
    },
    landscape: {
      x: 20,
      y: 45,
      anchor: "middle",
      width: 100,
      height: 80,
    },
  };

  const configReview = {
    style: {
      backgroundImage: `url(${imageReview})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",

    },
    portrait: {
      x: 80,
      y: 38,
      anchor: "middle",
      width: 40,
      height: 60,
    },
    landscape: {
      x: 35,
      y: 60,
      width: 15,
      height: 30,
      anchor: "left-bottom",
    },
  };
  const configFree = {
    style: {
      backgroundImage: `url(${imageFree})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",

    },
    portrait: {
      x: 20,
      y: 50,
      anchor: "middle",
      width: 40,
      height: 50,
    },
    landscape: {
      x: 12,
      y: 79,
      width: 15,
      height: 30,
      anchor: "left-bottom",
    },
  };
  const configAvailable = {
    style: {
      backgroundImage: `url(${imageAvailable})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",

    },
    portrait: {
      x: 30,
      y: 82,
      anchor: "middle",
      width: 42,
      height: 100,
    },
    landscape: {
      x: 5,
      y: 107,
      width: 25,
      height: 42,
      anchor: "left-bottom",
    },
  };
  const configPopUp = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "600",
    },
    portrait: {
      x: 50,
      y: 18,
      fontSize: 10,
      width: 90,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 25,
      y: 23,
      width: 90,
      height: 50,
      scale: 1,
      fontSize: 5,
      anchor: "middle",
    },
    children:"Buy 1, Get 1 Free!"
  };

  const configCta = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      background: "#E36530",
      borderRadius: "15px",
      fontWeight: "400",
    },
    portrait: {
      x: 50,
      y: 12,
      width: 50,
      height: 5,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 4,
    },
    landscape: {
      x: 25,
      y: 6,
      width: 23,
      fontSize: 1.7,
      height: 7.5,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
    loop:true,
    controlsAnimate: "play",
  };
  const elementPopUp = [
    <span>Buy 1, Get 1 Free!</span>,
    <span>BOGO Offer!</span>,
  ];

  return (
    <>
      {/* 👇 Llamada ajustada: fitHeight + widthAuto. No pasamos itemsPerView. */}
    <Card {...configLogotipo} elements={top} intervalChange={3000}  direction='top'/>
    <Card {...configPopUp} elements={elementPopUp} intervalChange={3000} scale={0.8} />

      <PopWave {...configStream2} elements={imagesStreams(imagesStreams2)} timeWave={1800} intervalChange={3000} />
      <PopWave {...configStream1} elements={imagesStreams(imagesStreams1)} timeWave={1800} intervalChange={3000}    />
      <Card {...configLogotipo} />
    <Card {...configReview} />
    <Card {...configFree}     />
    <Card {...configAvailable}/>
    <Card {...configCta} >Can't Decide? Take Both! </Card>
    <CTA xLandscape={78} yLandscape={65} xPortrait={50} yPortrait={97}/>
    </>
  );
};

export default Index;



