import React from 'react'
import { arryaImageExample } from '../../../../../src/utils/arryaImageExample';
import PopTicker from '../../../../../src/component/effects/pop/PopTicker';

const ExamplePopTicker = () => {
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
      
        return (<PopTicker elements={elements}  landscape={landscape} portrait={portrait}  />)
}

export default ExamplePopTicker