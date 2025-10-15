import React from "react";
import Card from "../../../../../src/component/Card";
import imageLogotipo from "../../../assets/image/logo.webp";
import image11 from "../../../assets/image/image2/14.webp";
import image13 from "../../../assets/image/image2/13.webp";
import image21 from "../../../assets/image/image2/24.webp";
import image23 from "../../../assets/image/image2/23.webp";
import image31 from "../../../assets/image/image2/34.webp";
import image33 from "../../../assets/image/image2/33.webp";
import image41 from "../../../assets/image/image2/44.webp";
import image43 from "../../../assets/image/image2/43.webp";
import image51 from "../../../assets/image/image2/54.webp";
import image53 from "../../../assets/image/image2/53.webp";
import PopDefault from "../../../../../src/component/effects/pop/PopDefault";
import CTA from '../CTA'

const imagesStreams1 = [image11, image21, image31, image41, image51];
const imagesStreams2 = [image13, image23, image33, image43, image53];

const imagesStreams = (array, text) =>
  array.map((src, i) =>
    text ? (
      <div
        style={{
          position: "relative",
          display: "inline-block",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          key={i}
          src={src}
          alt={`random-${i}`}
          loading="eager"
          decoding="async"
          style={{
            objectFit: "cover",
            height: "100%",
            width: "fit-content",
            display: "block",
          }}
        />

        {/* Texto centrado */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            pointerEvents: "none", // evita bloquear clics en la imagen
          }}
        >
          {text}
        </div>
      </div>
    ) : (
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
    )
  );

const Index = () => {
  const configLogotipo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 50,
      y: 3,
      width: 40,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 75,
      y: 10,
      width: 20,
      height: 11,
      anchor: "top",
    },
  };
  const configStream1 = {
    elements: imagesStreams(imagesStreams1),
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 50,
      y: 59,
      anchor: "middle",
      width: 90,
      height: 50,
    },
    landscape: {
      x: 25,
      y: 50,
      anchor: "middle",
      width: 120,
      height: 90,
    },
  };


  const configSold = {
    style: {
      fontWeight: "400",
      lineHeight:"90%",
    },
    portrait: {
      x: 50,
      y: 26,
      width: 10,
      height: 10,
      anchor: "middle",
      fontSize: 17,
    },
    landscape: {
      x: 75,
      y: 50,
      width: 25,
      fontSize: 6,
      height: 7.5,
      anchor: "middle",
    },
  };

  const config2X = {
    elements: imagesStreams(imagesStreams2, "2x"),
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "bold",
    },
    portrait: {
      x: 85,
      y: 30,
      anchor: "middle",
      width: 20,
      height: 11,
      rotate: -20,
      fontSize: 12,
    },
    landscape: {
      x: 84,
      y: 70,
      width: 14,
      height: 25,
      fontSize: 6,
      rotate: -15,
      anchor: "left-bottom",
    },
  };
  const configGet = {
    elements: imagesStreams(imagesStreams2, "Buy 1, Get 1 Free!"),
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "bold",
    },
    portrait: {
      x: 13,
      y: 23,
      anchor: "middle",
      width: 24,
      height: 13,
      rotate: 15,
      fontSize: 4,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 14,
      height: 25,
      fontSize: 2.4,
      rotate: 15,
      anchor: "left-bottom",
    },
  };

  return (
    <>
      {/* 👇 Llamada ajustada: fitHeight + widthAuto. No pasamos itemsPerView. */}

      <PopDefault {...configStream1} />
      <PopDefault {...config2X} />
      <PopDefault {...configGet} />


      <Card {...configSold}>BOGO Offer! </Card>
      <Card {...configLogotipo} />
      <CTA xLandscape={75} yLandscape={80} xPortrait={50} yPortrait={94}/>
    </>
  );
};

export default Index;
