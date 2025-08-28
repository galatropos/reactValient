import background from "./assets/image/sip6/background.webp";
import Card from "../../src/component/Card";
import { useCyclicCounter } from "../../src/hook/useCyclicCounter";
import "./assets/style/sip6.css";
import Circle from "./src/utils/sip6/Circle";
import Line from "./src/utils/sip6/Line";
import Text from "./src/utils/sip6/Text";
import { useEffect, useState } from "react";
import logoSvg from "./assets/image/Fatty15 Logo.svg";
import Bottle from "./src/utils/sip6/Bottle";

const Sip6 = () => {
  const [circle, setCircle] = useState("stop")
  const [line, setLine] = useState("stop")
  const [text, setText] = useState("stop")
  const [bottle, setBottle] = useState("stop")
  const scale = useCyclicCounter({
    min: 0,
    max: 1,
    interval: 500,
    timeOut: 1000,
    loop: true,
  });

  const image = {
    style: {
      backgroundImage: `
      url(${background})`,
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -11,
    },
    landscape: {
      x: 10,
      y: 58,
      width: 700,
      height: 100,
      anchor: "middle",
    },
    portrait: {
      x: 10,
      y: 64,
      width: 700,
      height: 100,
      anchor: "middle",
    },
  };
  const logo = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      fontWeight: "bold",
      backgroundImage: `url("${logoSvg}")`,
      zIndex: 4,
      filter: " brightness(0) invert(1)",
    },
    landscape: {
      height: 22,
      width: 25,
      anchor: "middle",
      x: 74,
      y: 13,
    },
    portrait: {
      height: 15,
      width: 50,
      anchor: "middle",
      x: 50,
      y: 7,
    },
  };

  const button = {
    style: {
      backgroundColor: "#141B4D",
      color: "white",
      borderRadius: "10px",
      transform: `scale(${scale ? 1 : 1.2})`,
      transition: "transform 1s ease", // transición suave de 0.3 segundos
      transformOrigin: "center center", // la escala se hace desde el centro
      fontWeight: "700",
    },
    landscape: {
      height: 12,
      width: 30,
      fontSize: 3,
      anchor: "middle",
      x: 70,
      y: 88,
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
  const daily = {
    style: {
      color: "#141B4D",
      fontWeight: "bold",
      display: "inline-block",
      textAlign: "center",
    },
    landscape: {
      height: 10,
      width: 42,
      fontSize: 5,
      anchor: "middle",
      x: 70,
      y: 30,
    },
    portrait: {
      height: 10,
      width: 73,
      fontSize:7,
      anchor: "middle",
      x: 50,
      y: 20,
    },
  };

  const clinically = {
    style: {
      color: "white",
      fontWeight: "bold",
      display: "inline-block",
      textAlign: "center",
      lineHeight: "1.1",
    },
    landscape: {
      height: 10,
      width: 39,
      fontSize: 2.3,
      anchor: "middle",
      x: 70,
      y: 60,
    },
    portrait: {
      height: 14,
      width: 73,
      fontSize: 4,
      anchor: "middle",
      x: 50,
      y: 35.5,
    },
  };





  const indication = {
    style: {  
          color: "#141B4D",
      zIndex: 4,
      fontWeight: "500",
      border: "2px solid #141B4D",
    },
    landscape: {
      height: 10,
      width: 45,
      fontSize: 1.20,
      anchor: "bottom",
      x: 27,
      y: 95,
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

  useEffect(() => {
    const timer = setTimeout(() => {
        setBottle("play")
    }, 1000);

    // Cleanup: se limpia el timeout si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(bottle === true)setCircle("play")
  }, [bottle]);

  useEffect(() => {
    if(circle === true)setLine("play")
  }, [circle]);

  useEffect(() => {
    if(line === true)setText("play")
  }, [line]);


  return (
    <>
    {

      <Card {...image}/>
    }
      <Card>
        <Card {...logo}></Card>

        <Card {...button}>Learn More</Card>
      </Card>

      <Card {...daily}>AGE WITHOUT BREAKING</Card>
      <Card {...clinically}>
      The first and only C15:0 supplement, shown to strengthen cell membranes and reverse aging at the cellular level.

      </Card>

      <Bottle getBottle={bottle} setBottle={setBottle} />
      <Circle setCircle={setCircle} circle={circle} />
      <Line getLine={line} setLine={setLine}  />
      <Text getText={text} setText={setText} />

      <Card {...indication}>
        These statements have not been evaluated by the Food and Drug
        Administration. This product is not intended to diagnnose, treat, cure,
        or prevent any disease.
      </Card>
    </>
  );
};

export default Sip6;
