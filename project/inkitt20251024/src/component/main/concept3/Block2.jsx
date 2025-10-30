import React, {  useEffect } from 'react'
import Video from './Video';
import Image from './Image';
import Found from './found';
import Card from '../../../../../../src/component/Card';
import imageAvatar from "../../../../assets/image/concept3/avatar.webp";
import imageChat from "../../../../assets/image/concept3/chat.webp";
import audioSpin from "../../../../assets/audio/click.mp3";
import useAudio from "../../../../../../src/hook/useAudio";


const Block2 = ({logo,video,ctaText,image,ctaColor,footerColor,opacity,ico,footerText,backgroundLast,mraid,sountrack,backgroundColor,text}) => {
  const startSpin=useAudio(audioSpin);

    const [finish, setFinish] = React.useState(false);
    const configHeader={
      style: {
        background: "#E5E5E5",
      },
      portrait: {
          x: 50,
          y: 15,
          width: 100,
          height: 100,
          anchor: "bottom",
      },
      landscape: {
        x: 0,
        y: 50,
        width: 25,
        height: 100,
        anchor: "left",
      },
  }

  const configAvatar={
    style: {
      backgroundImage: `url(${imageAvatar})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 50,
      y: 5,
      width: 30,
      height: 20,
      anchor: "top",
    },
    landscape: {
      x: 0,
      y: 40,
      width: 24.2,
      height: 30,
      anchor: "left",
    },
  }
const configChat={
  style: {
    backgroundImage: `url(${imageChat})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  portrait: {
    x: 50,
    y: 53,
    width: 100,
    height: 75,
    anchor: "middle",
  },
  landscape: {
    x: 100,
    y: 0,
    width: 44,
    height: 81,
    anchor: "right-top",
  },
}
const configWhite={
  style: {
    background: "#F6F7FB",
  },
  portrait: {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    anchor: "middle",
  },
  landscape: {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    anchor: "middle",
  },
}
    const configEvent={
        style: {

        },
        portrait: {
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            anchor: "middle",
        },
        landscape: {
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          anchor: "middle",
        },
    }
    const configfoundLast={
        style: {
          background: backgroundLast,
        },
        portrait: {
          x: 50,
          y: 50,
          width: 400,
          height: 400,
          anchor: "middle",
          opacity:finish?1:0,
        },
        landscape: {
          x: 50,
          y: 50,
          width: 400,
          height: 400,
          anchor: "middle",
          opacity:finish?1:0,
    
        },
      };

useEffect(()=>{
  if(video&&finish){
    startSpin.play();
    sountrack.stop();
  
  }
},[finish])

  return (
    <>
    {
      <span style={{display:finish?'none':'block'}}>
    <Card {...configWhite}/>
    <Card {...configChat}/>
    <Card {...configHeader}/>
    <Card {...configAvatar}/>

            <Found
          footerColor={footerColor}
          opacity={opacity}
          finish={finish}
          ico={ico}
          ctaText={ctaText}
          logo={logo}
          footerText={footerText}
          ctaColor={ctaColor}
          
        />
     </span>
        
      }
<Card {...configfoundLast}/>  

    <Card {...configEvent} onPressEndInside={() => setFinish(true)}></Card>

    {

        video?<Video mraid={mraid} finish={finish} logo={logo} {...video} cta={ctaText}  ctaColor={ctaColor} backgroundColor={backgroundColor}  />:
    <Image mraid={mraid} finish={finish} logo={logo} {...image} cta={ctaText}  ctaColor={ctaColor} backgroundColor={backgroundColor} text={text}  />
    }
    </>
  )
}

export default Block2