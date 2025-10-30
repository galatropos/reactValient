import React from 'react'
import imageLogo from '../../assets/image/logo.webp'
import Card from '../../../../src/component/Card'
const Logo = ({xl=20,yl=6,xp=50,yp=5,style,scale=1,width=20,height=20}) => {
const configLogo = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "center center",
      backgroundImage: `url(${imageLogo})`,
      ...style
    },
    portrait: {
      x:xp,
      y:yp,
      width: 50,
      height: 20,
      anchor: "middle",
      scale,
    },
    landscape: {
      x: xl,
      y: yl,
      width,
      height,
      anchor: "middle",
        scale,
    },
  };

  return (
    <Card {...configLogo} />

  )
}

export default Logo