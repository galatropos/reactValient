import React from "react";
import Card from "../../../../../src/component/Card";
import imageLogotipo from "../../../assets/image/logo.webp";
import animatePulse from "../../utils/animatePulse";
import imageBlack from "../../../assets/image/image2/black.webp";
import imageWhite from "../../../assets/image/image2/white.webp";
import imageBackground from "../../../assets/image/image2/background.webp";
import image11 from "../../../assets/image/image2/11t.webp";
import image21 from "../../../assets/image/image2/21t.webp";
import image31 from "../../../assets/image/image2/31t.webp";
import image41 from "../../../assets/image/image2/41t.webp";
import image51 from "../../../assets/image/image2/51t.webp";
import image61 from "../../../assets/image/image2/61t.webp";

const imagesStreams1 = [image11, image21, image31];
const imagesStreams2 = [image41, image51, image61];

const Row = ({ index, x1, x2, image }) => {
  const configRow = {
    style: {
      backgroundImage: `url(${image})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: x1,
      y: 40 + index * 18,
      width: 45,
      height: 45,
      anchor: "middle",
    },
    landscape: {
      x: x2,
      y: 20 + index * 30,
      width: 45,
      height: 45,
      anchor: "middle",
    },
  };
  return <Card {...configRow}></Card>;
};

const Index = () => {

  const configBackground = {
    style: {
      backgroundImage: `url(${imageBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 50,
      y:50,
      width: 230,
      height: 240,
      anchor: "middle",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 26,
      y: 37,
      width: 230,
      height: 200,
      anchor: "middle",
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
      y: 3,
      width: 40,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
    landscape: {
      x: 76,
      y: 10,
      width: 18,
      height: 10,
      anchor: "top",
    },
  };

  const configCta = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      background: "#2D3142",
      borderRadius: "15px",
      fontWeight: "bold",
    },
    portrait: {
      x: 50,
      y: 93,
      width: 50,
      height: 6,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
      fontSize: 4.8,
      animate: animatePulse,
    },
    landscape: {
      x: 76,
      y: 90,
      width: 25,
      fontSize: 1.7,
      height: 7.5,
      anchor: "bottom",
      rotate: 0,
      scale: 1,
      animate: animatePulse,
    },
    loop: true,
    controlsAnimate: "play",
  };

  const configTravel = {
    style: {
      fontWeight: "700",
      color: "#000100",
    },
    portrait: {
      x: 50,
      y: 23,
      width: 70,
      height: 10,
      anchor: "middle",
      fontSize: 8,
    },
    landscape: {
      x: 76,
      y: 50,
      width: 35,
      fontSize: 4,
      height: 7.5,
      anchor: "middle",
    },
  };

  const configBlack = {
    style: {
      backgroundImage: `url(${imageBlack})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      fontWeight: "700",
    },
    portrait: {
      x: 0,
      y: 52,
      width: 23,
      height: 23,
      anchor: "top", 
      rotate: 0,
      scale: 1,
      fontSize: 3.2,
      opacity: 0,
      animate:[
        [{ rotate:350,x:50,opacity:1 }, 1500],
        [{},100],
        ...Array.from({ length: 30 }).flatMap(() => [
          [{ scale: 0.2 }, 200],
          [{ scale: -0.4 }, 200],
          [{ scale: 0.2 }, 200],
          [{}, 2000],
        ]),
        [{},2000]
      ]
    },
    landscape: {

      x: -23,
      y: 50,
      width: 25,
      height: 25,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 2,
      opacity: 0,
      animate:[
        [{ rotate:350,x:50,opacity:1 }, 1500],
        [{},100],
        ...Array.from({ length: 30 }).flatMap(() => [
          [{ scale: 0.2 }, 200],
          [{ scale: -0.4 }, 200],
          [{ scale: 0.2 }, 200],
          [{}, 2000],
        ]),
        [{},2000]
      ]
    },
    loop: true,
    controlsAnimate: "play",
    children: (
      <>
      <span style={{
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div>PICK ANY</div>
        <div style={{fontWeight:900, scale:1.8}}>TWO</div>
        <div>COLORS</div>
      </span>
      </>
    ),
  };


  const configWhite = {
    style: {
      backgroundImage: `url(${imageWhite})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: "700",
    },
    portrait: {
      x: 100,
      y: 33,
      width: 23,
      height: 23,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 4.4,
      opacity: 0,
      animate:[
        [{ rotate:363,x:-50,opacity:1 }, 1500],
        [{},100],
        ...Array.from({ length: 30 }).flatMap(() => [
          [{ scale: 0.2 }, 200],
          [{ scale: -0.4 }, 200],
          [{ scale: 0.2 }, 200],
          [{}, 2000],
        ]),
        [{},2000]
      ]
    },
    landscape: {
      x: 77,
      y: 20,
      width: 25,
      height: 25,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 2.8,
      opacity: 0,
      animate: [
        [{ rotate:363,x:-50,opacity:1 }, 1500],
        [{},100],
        ...Array.from({ length: 30 }).flatMap(() => [
          [{ scale: 0.2 }, 200],
          [{ scale: -0.4 }, 200],
          [{ scale: 0.2 }, 200],
          [{}, 2000],
        ]),
        [{},2000]
      ]
    },
    loop: true,
    controlsAnimate: "play",
    children: (
      <>
      <span style={{
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div>BUY 1</div>
        <div >GET 1</div>
        <div style={{color:"red"}}>FREE</div>
      </span>
      </>
    ),
  };
  return (
    <>
      <Card {...configBackground} />

      {/* 👇 Llamada ajustada: fitHeight + widthAuto. No pasamos itemsPerView. */}
      {imagesStreams1.map((row, i) => (
        <Row image={row} index={i} key={i} x1={30} x2={15} />
      ))}
      {imagesStreams2.map((row, i) => (
        <Row image={row} index={i} key={"a" + i} x1={70} x2={40} />
      ))}

      <Card {...configLogotipo} />
      <Card {...configBlack} />
      <Card {...configWhite} />
      <Card {...configTravel}>
        Your Perfect Travel Bag is Only One Click Away!{" "}
      </Card>

      <Card {...configCta}>Get Yours Now </Card>
    </>
  );
};

export default Index;
