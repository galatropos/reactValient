import React, { useEffect, useState } from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip1.css";
import imageLogotipo from "../../../assets/image/logo.webp";
import CTA from "./CTA";
import Face from "./Face";
import installPoppins from "../../../../../src/assets/font/Poppins/installPoppins";


const Start = ({setActive}) => {


  useEffect(()=>{
    installPoppins({ global: true, waitLoad: true });
  },[])

  const [index,setIndex]=useState(0);

  const logo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 8,
      y: 6,
      width: 14,
      height: 7.5,
      anchor: "left-top",
    },
    landscape: {
      x: 26,
      y: 36.5,
      width: 15,
      height: 25,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };

  const configP1 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontWeight: 500,
      flexDirection: "column",
      lineHeight: 1.3,
    },
    portrait: {
      x: 50,
      y: 18,
      width: 90,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 7.5,
      lineHeight: 4.5,
    },
    landscape: {
      x: 3.3,
      y: 10,
      fontSize: 3,
      width: 45,
      height: 10,
      anchor: "left-top",
      scale: 1,
    },
    children: (
      <>
        <span className="blod">50 veces más barato </span>
        que un tutor real
      </>
    ),
  };
  const configP2 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
     flexDirection: "column",
      fontWeight: 500,
      lineHeight: 1.1,

    },
    portrait: {
      x: 50,
      y: 30,
      width: 80,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
      fontSize: 6,
    },
    landscape: {
      x: 5.9,
      y: 96,
      fontSize: 3,
      width: 40,
      height: 22,
      anchor: "left-bottom",
      scale: 1,
    },
    children: (
      <>
        <span className="blod">videochat con</span> profesores 100% reales!
      </>
    ),
  };
  const main = {
    style: {
      borderRadius: "20px",
      border: "1px solid #fff",
      backgroundColor: "#fff",
      color: "#3561AE",
      flexDirection: "column",
      justifyContent: "start",
      lineHeight: 1,
      fontWeight: 400,
    },
    portrait: {
      x: 0,
      y: 41,
      width: 99,
      height: 100,
      anchor: "left-top",
      fontSize:9.7
    },
    landscape: {
      x: 99,
      y: 10,
      width: 50,
      height: 80,
      anchor: "right-top",
      fontSize:5
    },
    children:<> <span className="marginTop">Elige tu</span> <span  className="blod"> profesor de IA</span></>
  };
const onIndex=(index)=>{
  setIndex(index)
}

  return (
    <>
      <Card {...configP1} />
      <Card {...configP2} />
      <Card {...logo} />
      <Card {...main} />
      <CTA xLandscape={73} yLandscape={81} xPortrait={50} yPortrait={92.5} setActive={setActive}/>
      <Face xLandscape={57} yLandscape={40} xPortrait={20} yPortrait={62} index={0} onIndex={onIndex} active={index===0}  />
      <Face xLandscape={74} yLandscape={40} xPortrait={50} yPortrait={62} index={1} onIndex={onIndex} active={index===1}/>
      <Face xLandscape={91} yLandscape={40} xPortrait={80} yPortrait={62} index={2} onIndex={onIndex} active={index===2}/>
      <Face xLandscape={57} yLandscape={63} xPortrait={20} yPortrait={77.2} index={3} onIndex={onIndex} active={index===3}/>
      <Face xLandscape={74} yLandscape={63} xPortrait={50} yPortrait={77.2} index={4} onIndex={onIndex} active={index===4}/>
      <Face xLandscape={91} yLandscape={63} xPortrait={80} yPortrait={77.2} index={5} onIndex={onIndex} active={index===5}/>

    </>
  );
};

export default Start;
