import React from "react";
import frasco from "./assets/image/sip2/frasco.webp";
import fondoimg from "./assets/image/sip2/fondo.webp";
import Card from "../../src/component/Card";
import { useCyclicCounter } from "../../src/hook/useCyclicCounter";
import "./assets/style/sip2.css";
import imageLogo from "./assets/image/fatty15.svg";

const Sip2 = () => {

  // Crear la imagen
  const img = document.createElement("img");
  img.src = fondoimg;

  // Aplicar estilos a la imagen
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  img.style.filter = "blur(2px)";
  img.style.zIndex = "-1"; // Para que quede de fondo

  // Insertar en el body
  //body.appendChild(img);

  const scale = useCyclicCounter({
    min: 0,
    max: 1,
    interval: 500,
    timeOut: 1000,
    loop: true,
  });
  const image = {
    style: {
      backgroundImage: `url(${frasco})`,
      backgroundSize: "contain",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat",
    },
    landscape: {
      x: 10,
      y: 0,
      width: 100,
      height: 100,
    },
    portrait: {
      x: 50,
      y:48,
      width: 51,
      height: 51,
      anchor: "middle",
    },
  };

  const fondo = {
    style: {
      backgroundImage: `url(${fondoimg})`,
      backgroundSize: "contain",
      backgroundPosition: "left",
      backgroundRepeat: "no-repeat",
      //...orilla,
    },
    landscape: {
      x: -50,
      y: -42,
      width: 220,
      height: 220,
      anchor: "left-top",
    },
    portrait: {
      x: 46,
      y: 51.3,
      width: 320,
      height: 320,
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
      fontWeight: "400",
    },
    landscape: {
      height: 12,
      width: 30,
      fontSize: 3,
      anchor: "middle",
      x: 70,
      y: 75,
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
      color: "#121B4D",
      borderRadius: "20px",
      fontWeight: "bold",
      lineHeight:"90px",
    },
    landscape: {
      height: 10,
      width: 50,
      fontSize: 3.7,
      anchor: "middle",
      x: 70,
      y: 58,
    },
    portrait: {
      height: 20,
      width: 45,
      fontSize: 9,
      anchor: "middle",
      x: 50,
      y: 20,
    },
  };

  const logo = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      borderRadius: "20px",
      fontWeight: "bold",
      backgroundImage: `url(${imageLogo})`,
      zIndex: 4,
      filter: " brightness(0) invert(1)",
    },
    landscape: {
      height: 20,
      width: 23,
      anchor: "middle",
      x: 74,
      y: 10,
    },
    portrait: {
      height: 10,
      width: 70,
      anchor: "middle",
      x: 50,
      y: 7,
    },
  };

  const reviews = {
    style: {
      color: "white",
      fontWeight: "bold",
      zIndex: 4,
    },
    landscape: {
      height: 10,
      width: 40,
      fontSize: 3,
      anchor: "middle",
      x: 70,
      y: 26,
    },
    portrait: {
      height: 8,
      width: 75,
      fontSize: 5.9,
      anchor: "middle",
      x: 50.3,
      y: 72,
    },
  };
  const future = {
    style: {
      color: "white",
      zIndex: 4,
      fontWeight: "500",
      lineHeight:"60px",
    },
    landscape: {
      height: 10,
      width: 75,
      fontSize: 3,
      anchor: "middle",
      x: 70,
      y: 40,
    },
    portrait: {
      height: 12,
      width: 75,
      fontSize: 6,
      anchor: "middle",
      x: 50,
      y: 79,
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
      <Card {...logo}></Card>
      <Card {...reviews}>5000+ ★ ★ ★ ★ ★ reviews</Card>
      <Card {...future}>
        <span>
          The <i>future</i> of essential fatty acids is here
        </span>
      </Card>
      <Card {...button}>Shop Now</Card>
      <Card {...save}>
        <span style={{ 
          display: "flex", gap: "0px", flexDirection: "column", alignItems: "center",


        }}>
          <span>Save an extra 15% </span>
          <span style={{ fontSize: "33px",marginTop:"-30px" }}>off your first 90-day supply</span>
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

export default Sip2;
