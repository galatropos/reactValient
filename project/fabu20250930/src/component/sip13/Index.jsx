import React from 'react'
import portrait from "../../../assets/video/portrait.mp4";
import backgroundImg from "../../../assets/image/background2.webp";
import CTA from './CTA';
import VideoToFramesPlayer from '../../../../../src/component/VideoToFramesPlayer';
import Card from '../../../../../src/component/Card';
import "../../../assets/style/sip13.css";
import usePreloadBackground from '../../../../../src/hook/usePreloadBackground';

const Index = () => {

  usePreloadBackground(backgroundImg);

    const videoVariables={
        style: {     WebkitMaskImage: `
            linear-gradient(to right, transparent, red 5%, red 90%, transparent),
            linear-gradient(to bottom, transparent, red 5%, red 90%, transparent)
          `,
          WebkitMaskComposite: "destination-in",
          maskComposite: "intersect",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "cover",
        },
        portraitSrc: portrait,
        landscapeSrc: portrait,
        objectFit:"cover",
        portrait: {
          height: 100,
          width: 100,
          anchor: "middle",
          x: 50,
          y: 50,
        },
        // LANDSCAPE (fondo a toda el área)
        landscape: {
          height: 100,
          width: 37,
          anchor: "middle",
          x:25,
          y: 50,
        },
      }
      
      const background = {
        style: {
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -11,
        },
        landscape: {
          x: 24,
          y: 45,
          width: 410,
          height: 410,
          anchor: "middle",
        },
        portrait: {
          x: 49,
          y: 46,
          width: 600,
          height: 600,
          anchor: "middle",
        },
      };
  return (
    <>
    {

            <VideoToFramesPlayer {...videoVariables}  />
    }
    {

        <Card {...background}/>
    }



    <CTA/>
    </>
  )
}

export default Index