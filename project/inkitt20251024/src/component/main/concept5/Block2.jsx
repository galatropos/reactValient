import React from 'react'
import Video from './Video';
import Image from './Image';
import Found from './found';
import Card from '../../../../../../src/component/Card';

const Block2 = ({logo,video,ctaText,image,ctaColor,footerColor,opacity,ico,footerText}) => {
    const [finish, setFinish] = React.useState(false);

    const configChat={
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
            width: 8,
            height: 14,
            anchor: "middle",
            scale: 1,
            fontSize: 3.5,
        },
    }
  return (
    <>
            <Found
          footerColor={footerColor}
          opacity={opacity}
          finish={finish}
          ico={ico}
          ctaText={ctaText}
          logo={logo}
          footerText={footerText}
        />
    <Card {...configChat} onPressEndInside={() => setFinish(true)}></Card>
    {

        video?<Video finish={finish} logo={logo} {...video} cta={ctaText}  ctaColor={ctaColor} />:
    <Image finish={finish} logo={logo} {...image} cta={ctaText}  ctaColor={ctaColor}  />
    }
    </>
  )
}

export default Block2