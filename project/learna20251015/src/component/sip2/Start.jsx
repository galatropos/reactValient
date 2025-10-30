import React, { Children } from "react";
import Card from "../../../../../src/component/Card";
import imageLogotipo from "../../../assets/image/logo.webp";
import imageflag from "../../../assets/image/sip2/flag.png";
import imageAvatar from "../../../assets/image/sip2/avatar.png";
import Request from "./Request";
const Start = ({setActive}) => {

  const configLogo = {
    style: {
      backgroundImage: `url(${imageLogotipo})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 7,
      y: 4,
      width: 12.8,
      height: 6.6,
      anchor: "left-top",
    },
    landscape: {
      x: 6.5,
      y: 8,
      width: 6,
      height: 10,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };

  const ConfigProgress = {
    style: {
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 11.5,
      width: 89,
      height: 3.3,
      anchor: "top",
    },
    landscape: {
      x: 23,
      y: 20,
      width: 39,
      height: 4,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };
  const configFlag = {
    style: {
      backgroundImage: `url(${imageflag})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    portrait: {
      x: 95,
      y: 4.5,
      width: 8.5,
      height: 7.8,
      anchor: "right-top",
    },
    landscape: {
      x: 39.8,
      y: 10,
      width: 15,
      height: 8,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };

  const configSecuence = {
    style: {
      color: "#39A1FF",
      fontWeight: 500,
    },
    portrait: {
      x: 50,
      y: 3.5,
      width: 20,
      height: 10,
      fontSize: 7.4,
      anchor: "top",
    },
    landscape: {
      x: 22.9,
      y: 9,
      fontSize: 4,
      width: 15,
      height: 11,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
    children: "0/4",
  };
  const configAvatar = {
    style: {
      backgroundImage: `url(${imageAvatar})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 50,
      y: 16,
      width: 44,
      height: 25,
      anchor: "top",
    },
    landscape: {
      x: 22.6,
      y: 29,
      width: 35,
      height: 60,
      anchor: "top",
      rotate: 0,
      scale: 1,
    },
  };

  const configText1 = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "50px",
      background: "#F5F5F7",
      fontWeight: 500,
    },
    portrait: {
      x: 5,
      y: 55,
      width: 41,
      height: 8,
      anchor: "left-top",
      fontSize: 5,
    },
    landscape: {
      x: 50,
      y: 21,
      fontSize: 3.4,
      width: 30,
      height: 16,
      anchor: "left",
      rotate: 0,
      scale: 1,
    },
    children: "¡Empecemos!",
  };

  const configText2 = {
    style: {
      borderRadius: "50px",
      background: "#F5F5F7",
      fontWeight: 500,
    },
    portrait: {
      x: 5,
      y: 65,
      width: 67,
      height: 17,
      anchor: "left-top",
      fontSize: 5,
    },
    landscape: {
      x: 50,
      y: 50,
      width: 40,
      height: 25,
      anchor: "left",
      rotate: 0,
      scale: 1,
      fontSize: 3,
    },
    children: (
      <span
      style={{
        textAlign: "left",
        paddingLeft: "30px",
      }}
      
      >Completa este saludo: ‘‘<u className=" subrayar">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </u>&nbsp; morning! How are you today?’’</span>
    ),
  };


const configActive = {
  style: {
    background: "transparent",
  },
  portrait: {
    x: 50,
    y: 50,
    width: 110,
    height:110,
    anchor: "middle",
  },
  landscape: {
    x: 50,
    y: 50,
    width: 110,
    height:110,
    anchor: "middle",
  },
  onClick:()=>setActive(false) 
}
  return (
    <>
      <Card {...configLogo} />
      <Card {...configAvatar} />
      <Card {...configFlag} />
      <Card {...ConfigProgress}>
        <progress
          id="prog1"
          value="6"
          max="100"
          className="progress"
        ></progress>
      </Card>
      <Card {...configSecuence} />
      <Card {...configText1} />
      <Card {...configText2} />
      <Request content={"Good"} xLandscape={56.4} yLandscape={80} xPortrait={50} yPortrait={86} />
      <Request content={"Hello"} xLandscape={73.2} yLandscape={80} xPortrait={20} yPortrait={86} />
      <Request content={"Yes"} xLandscape={90} yLandscape={80} xPortrait={80} yPortrait={86} />
    <Card {...configActive} />
    </>
  );
};

export default Start;
