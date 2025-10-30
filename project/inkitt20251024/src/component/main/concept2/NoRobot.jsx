import React from 'react'
import Card from '../../../../../../src/component/Card'
import imageAccept from "../../../../assets/image/concept2/accept.png";
import audioNoRobot from "../../../../assets/audio/noRobot.mp3";
import useAudio from '../../../../../../src/hook/useAudio';

const NoRobot = ({setNext,ctaColor}) => {
  const startClickNoRobot=useAudio(audioNoRobot);

  const [controller,setController]=React.useState("stop");
    const animate=[
        [{ opacity:1,blur:-10}, 200],
        [{ }, 2200],

    ]

  const onPressEndInside=()=>{
    startClickNoRobot.play();
    setController("play")
    setTimeout(()=>{
      setNext(1)
    },500)
  };
  const configCta = {
    style: {
      background: ctaColor,
      color: "white",
      fontWeight: "300",
      borderRadius: "15px",
    },
    portrait: {
      x: 95,
      y: 90,
      anchor: "right-bottom",
      scale: 1,
      width: 43, height: 6, fontSize: 5 
    },
    landscape: {
      x: 75,
      y: 88,
      width: 25,
      height: 10,
      anchor: "middle",
      fontSize:2.5,
      scale: 1,
    },
  };

  const configAccept={
    backgroundImage:imageAccept,
    style:{
      backgroundSize: "contain",
    },
    portrait: {
      x: 58.5,
      y: 86.5,
      width: 5,
      height: 7,
      anchor: "middle",
      scale: 1,animate,
      opacity:0,
      blur:10,
    },
    landscape: {
      x: 67.5,y: 87.4,width: 10,height: 3,anchor: "middle",opacity:0,blur:10,animate
    },
    loop:true,
    controlsAnimate:controller,
  }

  return (
    <>
    <Card {...configCta} onPressEndInside={() => onPressEndInside()}>☐ I'm not a robot </Card>
    <Card {...configAccept} />
    </>

  )
}

export default NoRobot