import React from 'react'
import Card from '../../../../../../src/component/Card'
import "../../../../assets/style/concept.css"
import Select from './Select';
import NoRobot from './NoRobot';
import Hand from './Hand';
const Block1 = ({title,setNext,imageMain,logo,ctaColor}) => {
const [active,setActive]=React.useState(true);


const configLogo = {
    style: {
      backgroundImage: `url(${logo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 3,
      width: 40,
      height: 9,
      anchor: "top",
    },
    landscape: {
      x: 15,
      y: 4.9,
      width: 20,
      height: 13,
      anchor: "left-top",
      rotate: 0,
      scale: 1,
    },
  };

  const configIndic = {
    style: {
      color: "white",
      fontWeight: "300",
      flexDirection: "row",
      justifyContent: "left",

    },
    portrait: {

      x: 5,
      y: 15,
      width: 60,
      height: 10,
      anchor: "left",
      scale: 1,
      fontSize: 5,
    },
    landscape: {

      x: 30,
      y: 45,
      fontSize: 3,
      width: 50,
      height: 10,
      anchor: "middle",
      scale: 1,
    },
  };
  const configTitle = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "row",
      justifyContent: "left",

    },
    portrait: {
      x: 5,
      y: 20,
      width: 100,
      height: 10,
      anchor: "left",
      scale: 1,
      fontSize: 8,
    },
    landscape: {
      x: 30,
      y: 55,
      fontSize: 5,
      width: 50,
      height: 10,
      anchor: "top",
      scale: 1,
    },
  };
  const configMain = {
    backgroundImage: `${imageMain}`,
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
      borderRadius:"60px",
    },
    portrait: {
      x: 50,
      y: 51.5,
      width: 99,
      height: 48,
      anchor: "middle",
      scale: 1,
      fontSize: 9,
    },
    landscape: {
      x: 74,
      y: 42,
      width: 42,
      height: 70,
      anchor: "middle",
      scale: 1,
      fontSize: 3.5,
    },
  }

const configWall={
  portrait:{
    x:50,
    y:50,
    width:100,
    height:100,
    anchor:"middle"
  },
  landscape:{
    x:50,
    y:50,
    width:100,
    height:100,
    anchor:"middle"
  }
}


  return (
    <>
    <Card key={"wall"} {...configWall}/>
    <Card key={"logo"} {...configLogo}></Card>
    <Card key={"title"} {...configTitle}>{title} </Card>
    <Card key={"indice"} {...configIndic}>Select all squares with</Card>
    <Card key={"main"} {...configMain}/>

    <NoRobot key={"noRobot"}  setNext={setNext} ctaColor={ctaColor} />
    <Select setActive={setActive} key={"s1"} xl={53} yl={7} xp={0.4}    yp={27} anchor='left-top' br={40}  />
    <Select setActive={setActive} key={"s2"} xl={73.5} yl={7} xp={49.4} yp={27} anchor='top' />
    <Select setActive={setActive} key={"s3"} xl={94} yl={7} xp={98.6}   yp={27} anchor='right-top' bl={40} />
    <Select setActive={setActive} key={"s4"} xl={53} yl={31} xp={0.4}    yp={43} anchor='left-top' />
    <Select setActive={setActive} key={"s5"} xl={73.5} yl={31} xp={49.4} yp={43} anchor='top' />
    <Select setActive={setActive} key={"s6"} xl={94} yl={31} xp={98.6}   yp={43} anchor='right-top'  />
    <Select setActive={setActive} key={"s7"} xl={53} yl={54} xp={0.4}    yp={59} anchor='left-top'bb={40} />
    <Select setActive={setActive} key={"s8"} xl={73.5} yl={54} xp={49.6} yp={59} anchor='top' />
    <Select setActive={setActive} key={"s9"} xl={94} yl={54} xp={98.4}   yp={59} anchor='right-top' bt={40} />
    <Hand key={"hand"} controller={active?"play":"stop"}/>

    </>
  )
}

export default Block1