import React from 'react'
import Card from '../../../../../src/component/Card';
import imageHand from "../../../assets/image/sip4/hand.webp";
const Hand = () => {
const animateHandPortrait = [
        [{ y: 9,x:-10 }, 1000], //the
        [{    }, 1000],
        [{ y: -5,x:25   }, 1000], //sheep
        [{    }, 1000],
        [{ y: 11,x:-29   }, 1000],//are
        [{    }, 1000],
        [{ y: -11,x:-8   }, 1000],//eating
        [{    }, 1000],
        [{ y:5 ,x:58   }, 1000],//in
        [{    }, 1000],
        [{ y:-5 ,x:-6   }, 1000],//the
        [{    }, 1000],
        [{ y:5 ,x:-57   }, 1000],//pasture
        [{    }, 1000],
]
const animateHandLandscape = [
    [{ y: 15,x:-6 },  1000], //the
    [{  }, 1000],
    [{ y: -8,x:13 },  1000], //the
    [{  }, 1000],
    [{ y: 17,x:-15 }, 1000], //are
    [{  }, 1000],
    [{ y: -17,x:-3 }, 1000], //eating
    [{  }, 1000],
    [{ y: 8,x:29 },   1000], //    in
    [{  }, 1000],
    [{ y: -8,x:-3 },  1000], //    the
    [{  }, 1000],
    [{ y: 8,x:-30 },  1000], //    pasture
    
    [{  }, 1000],
]
/*
the
sheep
are
eating
in
the pasture
the
sheep
are
eating
in
*/
  const configHand = {
    style: {
      backgroundImage: `url(${imageHand})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: {
      x: 54,
      y: 66,
      width: 15,
      height: 8,
      anchor: "middle",
      rotate:220,
      animate: animateHandPortrait,
    },
    landscape: {
      x: 70,
      y: 54,
      rotate:220,
      width: 7,
      height: 7,
      anchor: "top",
      scale: 1,
      animate: animateHandLandscape,

    },
    loop: true,
    controlsAnimate: "play",
  };
    return (
    <Card {...configHand} />
  )
}

export default Hand