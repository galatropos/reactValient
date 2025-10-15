import Card from '../../../../../src/component/Card';
import cta from '../../../assets/image/cta.webp'


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
    x: 30,
    y: 45,
    width: 35,
    height: 35,
    anchor: "middle",
    rotate:0,
    scale:1,
    animate: animateCTA,
    perspective: 800
  },
  landscape: {
    x: 70,
    y: 50,
    width: 30,
    height: 30,
    anchor: "middle",
    animate: animateCTA,

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