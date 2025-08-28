import React from 'react'
import PopDefault from '../../../../../src/component/effects/pop/PopDefault'
import { arryaImageExample } from '../../../../../src/utils/arryaImageExample';

const ExamplePopDefault = () => {
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
    
  return (<PopDefault elements={elements}  landscape={landscape} portrait={portrait} style={stye} />)
}

export default ExamplePopDefault