import React from "react";
import PopWave from "../../../../../src/component/effects/pop/PopWave";
import { arryaImageExample } from "../../../../../src/utils/arryaImageExample";

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

const portrait = {
  width: 50,
  height: 50,
  x: 50,
  y: 50,
  anchor: "middle",
};
const landscape = {
  width: 40,
  height: 40,
  x: 0,
  y: 0,
  anchor: "middle",
};

const defaultStyle = {
  transformOrigin: "center center" /* 🔑 rota desde el centro */,
};
const ExamplePopWave = () => {
  return (
    <div>
      <PopWave
        portrait={portrait}
        elements={elements}
        landscape={landscape}
        style={defaultStyle}
      />
    </div>
  );
};

export default ExamplePopWave;
