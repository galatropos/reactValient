import React from "react";
import imageBottle from "../../../assets/image/sip6/bottle.webp";
import Card from "../../../../../src/component/Card";

const Bottle = ({ getBottle, setBottle }) => {
  const bottle = {
    style: {
      backgroundImage: `url(${imageBottle})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    landscape: {
      x: 25,
      y: 40,
      width: 80,
      height: 80,
      anchor: "middle",
      animate: [[{height:-10, x:-10 }, 500]],


    },
    portrait: {
      anchor: "middle",
      x: 50,
      y: 60,
      width: 70,
      height: 60,
      animate: [[{width:-10, x: -20 }, 500]],
    },
  };
  return (
    <Card>
      <Card
        {...bottle}
        controlsAnimate={getBottle}
        loop={false}
        setSecuenceFinish={setBottle}
      />
    </Card>
  );
};

export default Bottle;
