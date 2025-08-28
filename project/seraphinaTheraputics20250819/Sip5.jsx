import React from "react";
import imageSrc from "./assets/image/sip5.webp";
import Card from "../../src/component/Card";
import { useCyclicCounter } from "../../src/hook/useCyclicCounter";
import "./assets/style/sip5.css";


const Sip2 = () => {
    const scale=useCyclicCounter({
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
        x:0,
        y:0,
      width: 100,
      height: 100,
    },
    portrait: {
        x:0,
        y:0,
      width: 100,
      height: 100,
    },
  };
  const button = {
    style: {
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
      height: 7,
      width: 18,
      fontSize: 1.5,
      anchor: "middle",
      x: 50,
      y: 87,
  },
  portrait: {
    height: 6,
      width: 35,
      fontSize: 4,
      anchor: "middle",
    x: 50,
    y: 88,
  },
  };
  const save = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#151C4B",
      borderRadius: "20px",
      fontWeight: "bold",
    },
    landscape: {
        height: 10,
        width: 30,
        fontSize: 2.4,
        anchor: "middle",
        x: 50,
        y: 75,
    },
    portrait: {
      height: 10,
      width: 90,
      fontSize: 8,
      anchor: "middle",
      x: 50,
      y: 76,
    },
  };



  return (
    <Card>
            <Card {...image}></Card>
      <Card>

          <Card {...button}>Shop Now</Card>
      </Card>
      <Card {...save}>Save an extra 15% off your first 90-day supply</Card>
    </Card>
  );
};

export default Sip2;
