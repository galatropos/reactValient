import background from "./assets/image/sip1/background.webp";
import imageBottle from "./assets/image/sip1/bottle.webp";
import Card from "../../src/component/Card";
import { useCyclicCounter } from "../../src/hook/useCyclicCounter";
import "./assets/style/sip1.css";

const Sip2 = () => {
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
      linear-gradient(to bottom, rgba(101, 115, 103, 0.8), rgba(101, 115, 103, 0)), 
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
      y: 49,
      width: 700,
      height: 100,
      anchor: "middle",
    },
  };

  const bottle = {
    style: {
      backgroundImage: `url(${imageBottle})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    landscape: {
      x: 25,
      y: 38,
      width: 73,
      height: 73,
      anchor: "middle",
    },
    portrait: {
      anchor: "middle",
      x: 50,
      y: 48,
      width: 40,
      height: 36,
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
  const save = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#121B4D",
      borderRadius: "20px",
      fontWeight: "bold",
      display: "inline-block",
      textAlign: "center",
    },
    landscape: {
      height: 10,
      width: 42,
      fontSize: 3.5,
      anchor: "middle",
      x: 70,
      y: 58,
    },
    portrait: {
      height: 10,
      width: 100,
      fontSize: 7.5,
      anchor: "middle",
      x: 50,
      y: 76.5,
    },
  };
  const x3 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      borderRadius: "20px",
      fontWeight: "bold",
    },
    landscape: {
      height: 10,
      width: 26,
      fontSize: 8,
      anchor: "middle",
      x: 53,
      y: 10,
    },
    portrait: {
      height: 10,
      width: 10,
      fontSize: 15,
      anchor: "left-top",
      x: 15,
      y: 3,
    },
  };
  const more = {
    style: {
      color: "white",
      textAlign: "left",
    },
    landscape: {
      height: 10,
      width: 40,
      fontSize: 3,
      anchor: "left",
      x: 60,
      y: 10,
    },
    portrait: {
      height: 10,
      width: 70,
      fontSize: 6.5,
      anchor: "left",
      x: 30,
      y: 7.2,
    },
  };
  const a1 = {
    style: {
      color: "white",
      borderRadius: "33px",
      border: "3px solid white",
      fontWeight: "300",
      justifyContent: "left",
      alignItems: "center",
      paddingLeft: "30px",
    },
    landscape: {
      height: 7,
      width: 40,
      fontSize: 2.5,
      anchor: "middle",
      x: 70,
      y: 23,
    },
    portrait: {
      height: 3.5,
      width: 58,
      fontSize: 4.5,
      anchor: "middle",
      x: 50,
      y: 15,
    },
  };
  const a2 = {
    style: {
      color: "white",
      borderRadius: "33px",
      border: "3px solid white",
      fontWeight: "300",
      justifyContent: "left",
      paddingLeft: "30px",
      alignItems: "center",
    },
    landscape: {
      height: 7,
      width: 40,
      fontSize: 2.5,
      anchor: "middle",
      x: 70,
      y: 33,
    },
    portrait: {
      height: 3.5,
      width: 58,
      fontSize: 4.5,
      anchor: "middle",
      x: 50,
      y: 20,
    },
  };
  const a3 = {
    style: {
      color: "white",
      borderRadius: "33px",
      border: "3px solid white",
      fontWeight: "300",
      justifyContent: "left",
      alignItems: "center",
      paddingLeft: "30px",
    },
    landscape: {
      height: 7,
      width: 40,
      fontSize: 2.5,
      anchor: "middle",
      x: 70,
      y: 43,
    },
    portrait: {
      height: 3.5,
      width: 58,
      fontSize: 4.5,
      anchor: "middle",
      x: 50,
      y: 25,
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
      width: 45,
      fontSize: 1.20,
      anchor: "middle",
      x: 27,
      y: 88,
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
const styleMore={

    display:"flex",
    flexDirection: "row",
    justifyContent: "baseline",
    alignItems: "baseline",
    textAlign: "center",
    padding:"0px",
    paddingTop: "0px",

}
  return (
    <>
      <Card {...image}></Card>
      <Card {...bottle}></Card>
      <Card>
        <Card {...x3}>3X</Card>
        <Card {...more}> more cellular benefits than omega-3.</Card>
        <Card {...a1}><span className="circle" style={{...styleMore,paddingTop:"12px"}}> &nbsp;&nbsp;&nbsp;Healthier hair & skin</span></Card>
        <Card {...a2}><span className="circle" style={{...styleMore,paddingTop:"12px"}}> &nbsp;&nbsp;&nbsp;Balanced metabolism</span></Card>
        <Card id={"a3"} {...a3}><span className="circle circle-3" style={{...styleMore,paddingTop:"1px"}}> &nbsp;&nbsp;&nbsp;Deeper sleep</span></Card>

        <Card {...button}>Shop Now</Card>
      </Card>
    
      <Card {...save}>Save an extra 15% off your first 90-day supply</Card>
      <Card {...indication}>
        These statements have not been evaluated by the Food and Drug
        Administration. This product is not intended to diagnnose, treat, cure,
        or prevent any disease.
      </Card>
    </>
  );
};

export default Sip2;
