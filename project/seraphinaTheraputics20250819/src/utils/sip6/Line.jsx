import React, { useEffect, useState } from "react";
import Card from "../../../../../src/component/Card";

const Line = () => {
    const [get1, set1] = useState()
    const [get2, set2] = useState()
    const [get3, set3] = useState()
    const [get4, set4] = useState()
    const [get5, set5] = useState()

  const animation1 = [[{ width: 44.5 }, 500]];
  const animation2 = [[{ width: 44.5 }, 500]];
  const animation3 = [[{ width: 44.5 }, 500]];
  const animation4 = [[{ width: 44.5 }, 500]];
  const animation5 = [[{ width: 44.5 }, 500]];

  const animationL1 = [[{ width: 24 }, 500]];
  const animationL2 = [[{ width: 24 }, 500]];
  const animationL3 = [[{ width: 24 }, 500]];
  const animationL4 = [[{ width: 24 }, 500]];
  const animationL5 = [[{ width: 24 }, 500]];

  const styleLine = {
    borderBottom: "3px solid white",
  };
  const portraitLine = {
    height: 5.4,
    width: 0,
    fontSize: 3,
    anchor: "left-top",
    x: 44,
  };
  const landscapeLine = {
    height: 5.4,
    width: 0,
    fontSize: 3,
    anchor: "left-top",
    x: 22,
  };

  const line1 = {
    style: styleLine,
    landscape: {
      ...landscapeLine,
      animate: animationL1,
      y: 12,
    },
    portrait: {
      ...portraitLine,
      y: 39.5,
      animate: animation1,
    },
  };
  const line2 = {
    style: styleLine,
    landscape: {
      ...landscapeLine,
      y: 26,
      animate: animationL2,
    },
    portrait: {
      ...portraitLine,
      y: 47.6,
      animate: animation2,
    },
  };
  const line3 = {
    style: styleLine,
    landscape: {
      ...landscapeLine,
      y: 39,
      animate: animationL3,
    },
    portrait: {
      ...portraitLine,
      y: 55.7,
      animate: animation3,
    },
  };
  const line4 = {
    style: styleLine,
    landscape: {
      ...landscapeLine,
      y: 52.5,
      animate: animationL4,
    },
    portrait: {
      ...portraitLine,
      y: 63.5,
      animate: animation4,
    },
  };

  const line5 = {
    style: styleLine,
    landscape: {
      ...landscapeLine,
      y: 63,
      animate: animationL4,
    },
    portrait: {
      ...portraitLine,
      y: 71.8,
      animate: animation5,
    },
  };


  useEffect(() => {
    const timers = [];

    // Espera 1 segundo y empieza la cascada
    timers.push(
      setTimeout(() => set1("play"), 1500)
    );
    timers.push(
      setTimeout(() => set2("play"), 1500 + 250)
    );
    timers.push(
      setTimeout(() => set3("play"), 1500 + 250 * 2)
    );
    timers.push(
      setTimeout(() => set4("play"), 1500 + 250 * 3)
    );
    timers.push(
      setTimeout(() => set5("play"), 1500 + 250 * 4)
    );

    // Cleanup (si se desmonta el componente)
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);
  return (
    <Card>
      <Card {...line1}
        controlsAnimate={get1}
        loop={false}
        setSecuenceFinish={set1}></Card>
      <Card
        {...line2}
        controlsAnimate={get2}
        loop={false}
        setSecuenceFinish={set2}
      />
      <Card
        {...line3}
        controlsAnimate={get3}
        loop={false}
        setSecuenceFinish={set3}
      />
      <Card
        {...line4}
        controlsAnimate={get4}
        loop={false}
        setSecuenceFinish={set4}
      />
      <Card
        {...line5}
        controlsAnimate={get5}
        loop={false}
        setSecuenceFinish={set5}
      />
    </Card>
  );
};

export default Line;
