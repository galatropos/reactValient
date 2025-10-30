import face1 from "../../../assets/image/sip1/face1.webp";
import face2 from "../../../assets/image/sip1/face2.webp";
import face3 from "../../../assets/image/sip1/face3.webp";
import face4 from "../../../assets/image/sip1/face4.webp";
import face5 from "../../../assets/image/sip1/face5.webp";
import face6 from "../../../assets/image/sip1/face6.webp";
import Card from "../../../../../src/component/Card";
import {  useCallback, useState } from "react";
const imageFace=[face1,face2,face3,face4,face5,face6];

const Face=({index=0,xPortrait,yPortrait,xLandscape,yLandscape,onIndex,active=false}) => {
    const [control,setControl]=useState(false); 
    const [getActive,setActive]=useState(active); 

const animate=[
    [{ scale: 0.1 }, 100],
    [{ scale: 0 }, 100],
    [{ scale: -0.1 }, 100],
]

  const configFace = {
    style: {
      backgroundImage: `url(${imageFace[index]})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: active ? "none" : "grayscale(100%)",
    },
    portrait: {
      x:xPortrait,
      y: yPortrait,
      width: 23,
      height: 15,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      animate
    },
    landscape: {
      x: xLandscape,
      y: yLandscape,
      width: 12,
      height: 20,
      anchor: "middle",
      scale: 1,
    },
    loop: true,
    controlsAnimate: control?"play":"stop",
  };

    const handleStepChange = useCallback(
      (stepIdx) => {
        if(stepIdx===1)
            setActive(true);
        if(stepIdx===2)
            setControl(false);
      },
      []
    );
    const handleIndexChange =(index)=>  onIndex(index)

    
  return (<Card {...configFace} onClick={()=>{
    setControl(!control)
    handleIndexChange(index)
}}  
  onStepChange={handleStepChange}
        />)
}

export default Face;