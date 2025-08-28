import React from "react";

import { PopSlotMachine } from "../../../../../src/component/effects/pop/PopSlotMachine";
import { arryaImageExample } from "../../../../../src/utils/arryaImageExample";
import Card from "../../../../../src/component/Card";

const ExamplePopSlotMachine = () => {
  const [controls, setControls] = React.useState("continue");
  const elements = arryaImageExample.map((item, index) => (
    <img
      src={item}
      key={index}
      width={"100%"}
      style={{
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  ));
  const stye = {
    border: "1px solid black",
    borderRadius: "30px",
  };
  const portrait = {
    width: 30,
    height: 10,
    x: 20,
    y: 20,
    anchor: "middle",
  };
  const landscape = {
    width: 40,
    height: 40,
    x: 0,
    y: 0,
    anchor: "middle",
  };


  return (
    <>
      <Card
        style={stye}
        portrait={portrait}
        landscape={landscape}
        onClick={() => setControls("pause")}
      >
        pausar
      </Card>
      <PopSlotMachine
        elements={elements}
        controls={controls}
        setControls={setControls}
        interval={100}
        timeOutContinue={2000}
        timeOutPause={2000}
      />
    </>
  );
};

export default ExamplePopSlotMachine;
