import React from 'react'
import Card from '../../../../../../src/component/Card';
import audioClick from "../../../../assets/audio/click.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

const Response=({xp,yp,xl,yl,text,setNext,colorActive,})=>{
  const defaultNotActive=`2px solid #36363D`;
  const defaultActive=`5px solid ${colorActive}`;
   const myRef=React.useRef(null);
    const startClick=useAudio(audioClick);
    const [active,setActive]=React.useState(false);
    const configQuiz = {
        style: {
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          background:"#191A22",
          border:active?defaultActive:defaultNotActive
        },
        portrait: {
          x:xp,
          y:yp,
          width: 90,
          height: 6,
          anchor: "top",
          fontSize: 5,
        },
        landscape: {
          x:xl,
          y: yl,
          fontSize: 2.3,
          width: 40,
          height: 8,
          anchor: "left-top",
          rotate: 0,
          scale: 1,
        },
    onPressEndInside:()=>
    {
      setActive(false)

      startClick.play();
      setNext()
    },
    onPressEndOutside:()=>
    {
      startClick.play();
      setActive(false)
    },

    onPressStartLeave:()=>{
      startClick.play();
      setActive(false)
    },
    onPressStart:()=>
    {
      startClick.play();
      setActive(true)
    },
    onPressMoveLeave:()=>
    {
      startClick.play();
      setActive(false)
    },
    onPressMoveEnter:()=>
    {
      startClick.play();
      setActive(true)

    },
   
      };


      
      return (
        <>
        <Card {...configQuiz} ref={myRef}>{text}</Card>
        </>
      )
    
}



const Quiz = ({quest,text,title,setNext,colorQuest,colorActive,backgrounColor}) => {

    const configQuestion = {
        style: {
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          background:colorQuest,
          border:"1px solid #36363D",
          flexDirection:"column",
          fontWeight:900,
        },
        portrait: {
          x:50,
          y:55,
          width: 90,
          height: 9,
          anchor: "top",
          fontSize: 5,
        },
        landscape: {
          x:55,
          y: 29,
          width: 40,
          height: 13,
          anchor: "left-top",
          rotate: 0,
          scale: 1,
          fontSize: 2.3,
        },
      };

      const configBlur={
        style:{
          background:backgrounColor,
          pointerEvents:"none",
        },
        portrait: {
          x:50,
          y:50,
          width: 100,
          height: 100,
          anchor: "middle",
          backdropBlur:0, 
          blur:0,
          opacity:0,
        },
        landscape: {
          x:55,
          y: 29,
          width: 40,
          height: 13,
          anchor: "left-top",
          rotate: 0,
          scale: 1,
          fontSize: 2.3,
          opacity:0,
        },
        loop:true,
    }

const yl=4
  return (
  <>
  <Card {...configQuestion} >
    <span >
    {title}
    </span>
    <span style={{fontSize:30,fontWeight:500}}>
    {text}

    </span>

  </Card>
  <Response key={1} xp={50} yp={64+2} xl={55} yl={46+yl}  text={quest[0]} setNext={setNext} colorActive={colorActive}    />
  <Response key={2} xp={50} yp={72+2} xl={55} yl={58+yl} text={quest[1]}  setNext={setNext} colorActive={colorActive} />
  <Response key={3} xp={50} yp={80+2} xl={55} yl={70+yl} text={quest[2]}  setNext={setNext} colorActive={colorActive} />
  <Response key={4} xp={50} yp={88+2} xl={55} yl={82+yl} text={quest[3]}  setNext={setNext} colorActive={colorActive} />
  <Card {...configBlur} />
 
  </>

  )
}

export default Quiz