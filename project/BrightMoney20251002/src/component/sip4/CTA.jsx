import Card from '../../../../../src/component/Card';
import cta from '../../../assets/image/sip4/cta.webp'


const animateCTA = [
    [{x:-9  }, 1000],
    [{x:9  }, 1000],
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
    y: 25,
    width: 50,
    height: 50,
    anchor: "middle",
    rotate:0,
    scale:1,
    animate: animateCTA,
    perspective: 800
  },
  landscape: {
    x: 70,
    y: 50,
    width: 40,
    height: 40,
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