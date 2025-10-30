import { useCallback, useState } from "react";
import face1 from "../../../assets/image/sip1/face1.webp";
import face2 from "../../../assets/image/sip1/face2.webp";
import face3 from "../../../assets/image/sip1/face3.webp";
import face4 from "../../../assets/image/sip1/face4.webp";
import face5 from "../../../assets/image/sip1/face5.webp";
import face6 from "../../../assets/image/sip1/face6.webp";
import Card from "../../../../../src/component/Card";
import useAudio from "../../../../../src/hook/useAudio";
import audioClick from "../../../assets/audio/sip1/click.mp3";
const imageFace = [face1, face2, face3, face4, face5, face6];

const Face = ({
  index = 0,
  xPortrait,
  yPortrait,
  xLandscape,
  yLandscape,
  onIndex,
  active = false,
}) => {
  const { play } = useAudio(audioClick);

  const [control, setControl] = useState(false);
  const [getActive, setActive] = useState(false);

  const animate = [
    [{ scale: 0.1 }, 100],
    [{ scale: 0 }, 100],
    [{ scale: -0.1 }, 100],
  ];
  let filter="grayscale(100%) "
  if(active) filter= filter="none"
  else if (getActive) filter="grayscale(100%) brightness(0.5)"


  const configFace = {
    style: {
      backgroundImage: `url(${imageFace[index]})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: filter,
      
    },
    portrait: {
      x: xPortrait,
      y: yPortrait,
      width: 24,
      height: 16,
      anchor: "middle",
      rotate: 0,
      scale: 1,
      animate,
    },
    landscape: {
      x: xLandscape,
      y: yLandscape,
      width: 12,
      height: 20,
      anchor: "middle",
      scale: 1,
    },
    loop: false,
    controlsAnimate: control ? "play" : "stop",
  };

  const handleStepChange = useCallback((stepIdx) => {
    if (stepIdx === 2) setControl(false);
  }, []);
  const handleIndexChange = (index) => onIndex(index);
//  handleIndexChange(index);

  return (
    <Card
      {...configFace}
      onClick={() => {
      }}

      onPressStart={() => 
{

  setActive(true);
}
      }
      onPressEndInside={() => 
 {

  play();
  setControl(!control);
   handleIndexChange(index)
   setActive(false);
  }
        

      }  // solo se dispara si sueltas dentro
      onPressEndOutside={() => {
  setActive(false);

      }} // solo se dispara si suelta fuera
    

      onStepChange={handleStepChange}
    />
  );
};

export default Face;
