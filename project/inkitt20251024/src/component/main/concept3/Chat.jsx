import React, { useEffect } from "react";
import Card from "../../../../../../src/component/Card";
import imageChat from "../../../../assets/image/concept3/chat.webp";
import WaitMessage from "../../../../../../src/component/WaitMessage";
import useOrientation from "../../../../../../src/hook/useOrientation";

const configHeader = {
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
    y: 100,
    width: 25,
    height: 110,
    anchor: "left-bottom",
  },
};

const animatePortrait1 = [
  [{}, 400],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{ y: -10.5 }, 500],
  [{}, 1000],
  [{ y: -10.5 }, 500],
  [{}, 1000],
  [{ y: -16 }, 500],
  [{}, 1000],
  [{ y: -15.3 }, 500],
  [{}, 1000],
];
const animatePortrait20 = [
  [{}, 1900],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{ opacity: -1 }, 100],
];
const animatePortrait2 = [
  [{}, 2900],
  [{ opacity: 1 }, 100],
  [{ x: -58, y: -12, scale: 0.9 }, 500],
  [{}, 1000],
  [{ y: -14.5 }, 500],
  [{}, 1000],
  [{ y: -12 }, 500],
  [{}, 1000],
];

const animatePortrait3 = [
  [{}, 3400],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{ y: -10.5 }, 500],
  [{}, 1000],
  [{ y: -10.5 }, 500],
  [{}, 1000],
];
const animatePortrait4 = [
  [{}, 4900],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{ x: -55, y: -10.5 }, 500],
  [{}, 1000],
];
const animatePortrait5 = [
  [{}, 6900],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{}, 1000],
];

const animateLandscape1 = [
  [{}, 400],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{ y: -14.5 }, 500],
  [{}, 1000],
  [{ y: -14.5 }, 500],
  [{}, 1000],
  [{ y: -20 }, 500],
  [{}, 1000],
  [{ y: -19.3 }, 500],
  [{}, 1000],
];
const animateLandscape20 = [
  [{}, 1900],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{ opacity: -1 }, 100],
];
const animateLandscape2 = [
  [{}, 2900],
  [{ opacity: 1 }, 100],
  [{ x: -41.5, y: -16, scale: 0.9 }, 500],
  [{}, 1000],
  [{ y: -14.5 }, 500],
  [{}, 1000],
  [{ y: -17.5 }, 500],
  [{}, 1000],
];

const animateLandscape3 = [
  [{}, 3400],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{ y: -14.5 }, 500],
  [{}, 1000],
  [{ y: -14.5 }, 500],
  [{}, 1000],
];
const animateLandscape4 = [
  [{}, 4900],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{ x: -41.5, y: -14.5 }, 500],
  [{}, 1000],
];
const animateLandscape5 = [
  [{}, 6900],
  [{ opacity: 1 }, 100],
  [{}, 1000],
  [{}, 1000],
];
const configWall = {
  style: {
    background: "white",
    fontWeight: "bold",
    color: "black",
  },
  portrait: {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    anchor: "middle",
  },
  landscape: {
    x: 0,
    y: 100,
    width: 100,
    height: 110,
    anchor: "left-bottom",
  },
};

const BubbleMe = ({
  children,
  control,
  backgroundColor,
  textColor,
  direction = "left",
  xp = 50,
  yp = 50,
  xl = 100,
  yl = 100,
  wp = 100,
  wl = 100,
  animatePortrait = [],
  animateLandscape = [],
}) => {
  const configMessage = {
    style: {
      background: backgroundColor,
      borderRadius: "20px",
      fontWeight: "bold",
      color: textColor,
    },
    portrait: {
      x: xp,
      y: yp,
      fontSize: 4,
      width: wp,
      height: 7,
      anchor: "middle",
      animate: animatePortrait,
      opacity: 0,
    },
    landscape: {
      x: xl,
      y: yl,
      width: wl,
      height: 12.3,
      anchor: "middle",
      animate: animateLandscape,
      fontSize: 3,
      opacity: 0,
    },
    loop: false,
    controlsAnimate: control,
    children,
    className: `bubble${direction} bubble--${direction}`,
  };




  return (
    <>
      <Card key="message" {...configMessage} />
    </>
  );
};

const Chat = ({ ctaColor, finish, imageAvatar, setNext }) => {
  useOrientation();
  useEffect(()=>{
    if(finish==="play"){

      setTimeout(()=>{
        setNext((e) => e + 1)
      },8500)
    }
  },[finish])

  const configChat = {
    style: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "black",
    },
    portrait: {
      x: 67,
      y: 75,
      width: 26,
      height: 17.5,
      animate: animatePortrait2,
      opacity: 0,
      scale: 0.1,
    },
    landscape: {
      animate: animateLandscape2,
      x: 90,
      y: 65,
      width: 13,
      height: 13,
      anchor: "right-top",
      fontSize: 3,
      opacity: 0,
    },
    loop: false,
    controlsAnimate: finish,
  };

  const configAvatar = {
    style: {
      backgroundImage: `url(${imageAvatar})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "50px",
    },
    portrait: {
      x: 50,
      y: 5,
      width: 30,
      height: 20,
      anchor: "top",
    },
    landscape: {
      x: 2,
      y: 40,
      width: 20,
      height: 30,
      anchor: "left",
    },
  };
  const configEvent = {
    style: {},
    portrait: {
      x: 50,
      y: 50,
      width: 300,
      height: 300,
      anchor: "middle",
    },
    landscape: {
      x: 50,
      y: 50,
      width: 300,
      height: 300,
      anchor: "middle",
    },
    onPressEndInside: () => setNext((e) => e + 1),
  };
  return (
    <>
      <style>{`
 .bubbleleft{
 background:#ccc; 
 --bubble-bg:#ccc; 
 --tail-size:25px; --radius:14px;
  }

  .bubbleright{
 background:${ctaColor}; 
 --bubble-bg:${ctaColor}; 
 --tail-size:25px; --radius:14px;
  }
  .bubbleleft::after{
 content:""; position:absolute;
 width:calc(var(--tail-size)*1.4);
 height:calc(var(--tail-size)*1.4);
 background:var(--bubble-bg);
 transform:rotate(20deg);
  }

  .bubbleright::after{
 content:""; position:absolute;
 width:calc(var(--tail-size)*1.4);
 height:calc(var(--tail-size)*1.4);
 background:var(--bubble-bg);
 transform:rotate(20deg);
  }
  .bubble--left::after{
 left:calc(-1 * var(--tail-size));
 top:85px;
 transform:rotate(65deg);
 left:5px;
  }
  .bubble--right::after{
 right:calc(-1 * var(--tail-size));
 top:84px;
 right:4px;
  }
`}</style>
      <Card {...configWall} />
      <Card {...configHeader} />
      <Card {...configAvatar} />

      <BubbleMe
        control={finish}
        textColor={"white"}
        direction="right"
        animatePortrait={animatePortrait1}
        animateLandscape={animateLandscape1}
        wp={40}
        wl={30}
        xp={77}
        yp={83}
        xl={83}
        yl={72}
        children={
          <WaitMessage controller={finish} base="" finish={1000}>
            Sure, why not?
          </WaitMessage>
        }
      />
      <BubbleMe
        control={finish}
        textColor={"white"}
        direction="right"
        animatePortrait={animatePortrait20}
        animateLandscape={animateLandscape20}
        wp={40}
        wl={30}
        xp={77}
        yp={83}
        xl={83}
        yl={72}
        children={
          <WaitMessage base="" controller={finish} finish={4500}></WaitMessage>
        }
      />
      <Card {...configChat}>
        <WaitMessage base="" controller={finish} finish={2500}>
          <img
            src={imageChat}
            alt="chat"
            style={{ width: "100%", height: "100%",objectFit:"contain" }}
          />
        </WaitMessage>{" "}
      </Card>
      <BubbleMe
        control={finish}
        textColor={"white"}
        direction="right"
        animatePortrait={animatePortrait3}
        animateLandscape={animateLandscape3}
        wp={60}
        wl={40}
        xp={67}
        yp={83}
        xl={78}
        yl={72}
        children={
          <WaitMessage base="" controller={finish} finish={4500}>
            Didn´t see that comming :)
          </WaitMessage>
        }
      />
      <BubbleMe
        control={finish}
        textColor={"white"}
        direction="left"
        animatePortrait={animatePortrait4}
        animateLandscape={animateLandscape4}
        wp={40}
        wl={30}
        xp={77}
        yp={83}
        xl={83}
        yl={72}
        children={
          <WaitMessage base="" controller={finish} finish={6000}>
            I'm full of surprises
          </WaitMessage>
        }
      />
      <BubbleMe
        control={finish}
        textColor={"white"}
        direction="right"
        animatePortrait={animatePortrait5}
          animateLandscape={animateLandscape5}
        wp={40}
        wl={30}
        xp={77}
        yp={83}
        xl={83}
        yl={72}
        children={
          <WaitMessage base="" controller={finish} finish={7500}>
            That´s scary !!!
          </WaitMessage>
        }
      />

      <Card
        {...configEvent}
        onPressEndInside={() => setNext((e) => e + 1)}
      ></Card>
    </>
  );
};

export default Chat;
