import Card from '../../../../../src/component/Card';
import cta from '../../../assets/image/sip2/cta.webp'


const animateCTA = [
    [{x:-10  }, 1000],
    [{x:10  }, 1000],
  ];

const CTA = () => {
  const ctaConfig={
  style: {
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${cta})`,
    transformOrigin: "center center",

  },
  portrait: {
    x: 50,
    y: 49,
    width: 70,
    height: 70,
    anchor: "middle",
    rotate:0,
    scale:1,
    animate: animateCTA,
    perspective: 800
  },
  landscape: {
    x: 75,
    y: 50,
    width: 35,
    height: 35,
    animate: animateCTA,
    anchor: "middle",
} ,
controlsAnimate: "play", 
loop:true
  }

  return (
    <>
      <Card {...ctaConfig}></Card>
    </>
  );
}

export default CTA