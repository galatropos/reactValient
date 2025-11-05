import React, { useState, memo } from "react";
import Card from "../../../../../../src/component/Card";
import "../../../../assets/style/concept.css";
import Select from "./Select";
import NoRobot from "./NoRobot";
import Hand from "./Hand";

function Block1({ title, setNext, imageMain, logo, ctaColor }) {
  const [active, setActive] = useState(true);
  const [activeReady, setActiveReady] = useState([]);

  const configLogo = {
    style: {
      backgroundImage: `url(${logo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: { x: 50, y: 4.3, width: 40, height: 9, anchor: "top" },
    landscape: { x: 75, y: 6, width: 20, height: 13, anchor: "top" },
  };

  const configIndic = {
    style: { color: "white", fontWeight: 300, flexDirection: "row", justifyContent: "left" },
    portrait: { x: 5, y: 18, width: 60, height: 10, anchor: "left", fontSize: 5 },
    landscape: { x: 86, y: 47.3, width: 50, height: 10, anchor: "middle", fontSize: 3 },
  };

  const configTitle = {
    style: { color: "white", fontWeight: "bold", flexDirection: "row", justifyContent: "left" },
    portrait: { x: 5, y: 23, width: 100, height: 10, anchor: "left", fontSize: 8 },
    landscape: { x: 82, y: 58, width: 50, height: 10, anchor: "middle", fontSize: 5 },
  };

  const xl = -48;
  const yl = 7;

  const configMain = {
    backgroundImage: imageMain,
    style: { color: "white", fontWeight: "bold", flexDirection: "column", borderRadius: "30px" },
    portrait: { x: 49.7, y: 57.3, width: 100, height: 49, anchor: "middle", fontSize: 9 },
    landscape: { x: 74 + xl, y: 42 + yl, width: 41, height: 72, anchor: "middle", fontSize: 3.5 },
  };

  const configWall = {
    portrait: { x: 50, y: 50, width: 100, height: 100, anchor: "middle" },
    landscape: { x: 50, y: 50, width: 100, height: 100, anchor: "middle" },
  };

  return (
    <>
      <Card {...configWall} />
      <Card {...configLogo} />
      <Card {...configTitle}>{title}</Card>
      <Card {...configIndic}>Select all squares with</Card>
      <Card {...configMain} />

      <NoRobot setNext={setNext} ctaColor={ctaColor} activeReady={activeReady} title={title} />

      {/* 9 selects */}
      <Select setActiveReady={setActiveReady} id={0} setActive={setActive} xl={53.7 + xl} yl={7 + yl} xp={0.3} yp={33} anchor="left-top" br={40} />
      <Select setActiveReady={setActiveReady} id={1} setActive={setActive} xl={74 + xl} yl={7 + yl} xp={49.6} yp={33} anchor="top" />
      <Select setActiveReady={setActiveReady} id={2} setActive={setActive} xl={94.2 + xl} yl={7 + yl} xp={99.3} yp={33} anchor="right-top" bl={40} />
      <Select setActiveReady={setActiveReady} id={3} setActive={setActive} xl={53.7 + xl} yl={31 + yl} xp={0.3} yp={49.3} anchor="left-top" />
      <Select setActiveReady={setActiveReady} id={4} setActive={setActive} xl={74 + xl} yl={31 + yl} xp={49.6} yp={49.3} anchor="top" />
      <Select setActiveReady={setActiveReady} id={5} setActive={setActive} xl={94.2 + xl} yl={31 + yl} xp={99.3} yp={49.3} anchor="right-top" />
      <Select setActiveReady={setActiveReady} id={6} setActive={setActive} xl={53.7 + xl} yl={54.9 + yl} xp={0.3} yp={65.7} anchor="left-top" bb={40} />
      <Select setActiveReady={setActiveReady} id={7} setActive={setActive} xl={74 + xl} yl={54.9 + yl} xp={49.6} yp={65.7} anchor="top" />
      <Select setActiveReady={setActiveReady} id={8} setActive={setActive} xl={94.2 + xl} yl={54.9 + yl} xp={99.3} yp={65.7} anchor="right-top" bt={40} />

      <Hand controller={active ? "play" : "stop"} />
    </>
  );
}

export default memo(Block1);
