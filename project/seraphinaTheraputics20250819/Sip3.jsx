import React from "react";
import imageSrc from "./assets/image/sip3/sip3.webp";
import Card from "../../src/component/Card";
import { useCyclicCounter } from "../../src/hook/useCyclicCounter";
import "./assets/style/sip3.css";
import imageFondo from "./assets/image/sip3/fondo.webp";

const Sip3 = () => {
  const scale = useCyclicCounter({
    min: 0,
    max: 1,
    interval: 500,
    timeOut: 1000,
    loop: true,
  });
  const image = {
    style: {
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    landscape: {
      x: 23,
      y: 47,
      width: 120,
      height: 120,
      anchor: "middle",
    },
    portrait: {
      x: 4,
      y: 0,
      width: 80,
      height: 80,
    },
  };
  const fondo = {
    style: {
      backgroundImage: `url(${imageFondo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    landscape: {
      x: 50,
      y: 50,
      width: 500,
      height: 500,
      anchor: "middle",
    },
    portrait: {
      x: 50,
      y: 50,
      width: 500,
      height: 500,
      anchor: "middle",
    },
  };
  const button = {
    style: {
      border: "1px solid black",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#131B4D",
      color: "white",
      borderRadius: "10px",
      transform: `scale(${scale ? 1 : 1.2})`,
      transition: "transform 1s ease", // transición suave de 0.3 segundos
      transformOrigin: "center center", // la escala se hace desde el centro
      fontWeight: "100",
    },
    landscape: {

      height: 12,
      width: 30,
      fontSize: 3,
      anchor: "middle",
      x: 70,
      y: 70,
    },
    portrait: {
      height: 6,
      width: 35,
      fontSize: 4,
      anchor: "middle",
      x: 50,
      y: 86,
    },
  };
  const save = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      borderRadius: "20px",
      fontWeight: "bold",
      display: "flex",
      flexDirection: "row",
    },
    landscape: {
      height: 10,
      width: 50,
      fontSize: 4,
      anchor: "middle",
      x: 70,
      y: 45,
    },
    portrait: {
      height: 10,
      width: 80,
      fontSize: 7,
      anchor: "middle",
      x: 50,
      y: 73,
    },
  };

  const stronger = {
    style: {
      color: "white",
      borderRadius: "20px",
      fontWeight: "100",
      fontSpacing: "100px",
      lineHeight: "100px",
      
    },
    landscape: {
      height: 10,
      width: 40,
      fontSize: 6,
      anchor: "middle",
      x: 70,
      y: 15,
    },
    portrait: {
      height: 10,
      width: 90,
      fontSize: 12,
      anchor: "middle",
      x: 50,
      y: 10,
    },
  };

  const indication = {
    style: {
      color: "white",
      zIndex: 4,
      fontWeight: "500",
      border: "2px solid white",
    },
    landscape: {
      height: 10,
      width: 50,
      fontSize: 1.32,
      anchor: "middle",
      x: 70,
      y: 90,
    },
    portrait: {
      height: 4,
      width: 75,
      fontSize: 2,
      anchor: "top",
      x: 50.3,
      y: 93,
    },
  };

  return (
    <>
      <Card {...fondo}></Card>
      <Card {...image}></Card>

      <Card {...button}>Shop Now</Card>
      <Card {...stronger}>Stronger cells, slower aging.</Card>
      <Card {...save}>
        <span>
          Save an extra <span style={{ color: "#121B4D" }}>15% off</span> your
          first 90-day supply
        </span>
      </Card>
      <Card {...indication}>
        These statements have not been evaluated by the Food and Drug
        Administration. This product is not intended to diagnnose, treat, cure,
        or prevent any disease.
      </Card>
    </>
  );
};

export default Sip3;
