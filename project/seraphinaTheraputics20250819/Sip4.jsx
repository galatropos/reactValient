import React, { useEffect, useState } from "react";
import vertical from "./assets/image/sip4/sip4.mp4";
import Card from "../../src/component/Card";
import { useCyclicCounter } from "../../src/hook/useCyclicCounter";
import "./assets/style/sip4.css";
import TheProgress01 from "../../src/component/loading/theProgress/TheProgress01";

// Función reusable para extraer frames de un video
const extractFrames = (videoSrc, fps = 5) =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    video.addEventListener("loadedmetadata", () => {
      const framesArray = [];
      const interval = 1 / fps;
      let currentTime = 0;

      const grabFrame = () => {
        if (currentTime > video.duration) {
          resolve(framesArray);
          return;
        }

        video.currentTime = currentTime;

        video.addEventListener(
          "seeked",
          () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            framesArray.push(canvas.toDataURL("image/png"));

            currentTime += interval;
            grabFrame();
          },
          { once: true }
        );
      };

      grabFrame();
    });
  });

const Sip4 = () => {
  const [frameVertical, setFrameVertical] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loading, setLoading] = useState(true);

  const strong = useCyclicCounter({ min: 1, max: 3, interval: 1000, timeOut: 3000, loop: true });
  const scale = useCyclicCounter({ min: 0, max: 1, interval: 500, timeOut: 1000, loop: true });

  // Cargar frames de ambos videos al iniciar
  useEffect(() => {
    const loadFrames = async () => {
      const verticalFrames = await extractFrames(vertical, 5);
      setFrameVertical(verticalFrames);
      setLoading(false);
    };

    loadFrames();
  }, []);

  // Animación de los frames según orientación
  useEffect(() => {
    const frames = frameVertical;
    if (!frames || frames.length === 0) return;
    const fps = 5;
    const interval = 1000 / fps;

    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, interval);

    return () => clearInterval(timer);
  }, [frameVertical]);




  const image = {
    landscape: {
      height: 77,
      width: 45,
      fontSize: 1.20,
      anchor: "top",
      x: 27,
      y: 5,
    },
    portrait: {
      x: 50,
      y: -7,
      width: 84,
      height: 84,
      anchor: "top",
    },
  };
  const button = {
    style: {
      border: "1px solid black",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#131B4D",
      color: "white",
      borderRadius: "10px",
      transform: `scale(${scale ? 1 : 1.2})`,
      transition: "transform 1s ease", // transición suave de 0.3 segundos
      transformOrigin: "center center", // la escala se hace desde el centro
      fontWeight: "100",
    },
    landscape: {

      height: 12,
      width: 30,
      fontSize: 3,
      anchor: "bottom",
      x: 73,
      y: 95,
    },
    portrait: {
      height: 6,
      width: 35,
      fontSize: 4,
      anchor: "middle",
      x: 50,
      y: 88,
    },
  };
  const save = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#121B4D",
      borderRadius: "20px",
      fontWeight: "bold",
    },
    landscape: {
      height: 10,
      width: 43,
      fontSize:3.5,
      anchor: "middle",
      x: 73,
      y: 70,
    },
    portrait: {
      height: 10,
      width: 80,
      fontSize: 6,
      anchor: "middle",
      x: 50,
      y: 78,
    },
  };

  const textTitle = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#8A98AE",
      borderRadius: "20px",
      fontWeight: "600",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 1,
      zIndex:4
    },
    landscape: {
      height: 10,
      width: 30,
      fontSize: 3.4,
      anchor: "middle",
      x: 73,
      y: 43,
    },
    portrait: {
      height: 11,
      width: 90,
      fontSize: 5.5,
      anchor: "top",
      x: 50,
      y: 59
    },
  };

  const indication = {
    style: {  
          color: "#121B4D",
      zIndex: 4,
      fontWeight: "500",
      border: "2px solid #121B4D",
    },
    landscape: {
      height: 10,
      width: 45,
      fontSize: 1.20,
      anchor: "bottom",
      x: 27,
      y: 95,
    },
    portrait: {
      height: 4,
      width: 75,
      fontSize: 2,
      anchor: "top",
      x: 50.3,
      y: 93,
    },
  };
  const logo = {
    style: {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      borderRadius: "20px",
      fontWeight: "bold",
      backgroundImage: `url(https://fatty15.com/cdn/shop/t/250/assets/fatty15.svg?v=6928381504520808931753303805)`,
      zIndex: 4,
      
    },
    landscape: {
      height: 20,
      width: 23,
      anchor: "top",
      x: 73,
      y: 5,
    },
    portrait: {
      height: 10,
      width: 70,
      anchor: "middle",
      x: 50,
      y: 7,
    },
  };

  
  return (
    <TheProgress01
      fillColor="#131B4D"
      backgroundColor="#C6DADA"
      loading={loading}
      text=""
      srcImage={
        "https://fatty15.com/cdn/shop/t/250/assets/fatty15.svg?v=6928381504520808931753303805"
      }
    >
      {/* Tus Card y constantes originales se mantienen tal cual */}

      {frameVertical.length > 0 && (
        <Card
          {...image}
          style={{
            ...image.style,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${frameVertical[currentFrame]})`,
          }}
        ></Card>
      )}

<Card {...logo}></Card>
      
      <Card {...button} style={{ ...button.style, transform: `scale(${scale ? 1 : 1.2})`, transformOrigin: "center center" }}>
        Get fatty15
      </Card>


      <Card {...textTitle}>
        <span className={`${strong === 1 ? "strong" : "normal"}`}>STRONGER CELLS.</span>
        <span className={`${strong === 2 ? "strong" : "normal"}`}> HEALTHIER YOU.</span>
        <span className={`${strong === 3 ? "strong" : "normal"}`}>FOR LONGER.</span>
      </Card>
      <Card {...save}>
        <p>Save an extra 15% off your first 90-day supply</p>
      </Card>
           <Card {...indication}>These statements have not been evaluated by the Food and Drug Administration.
              This product is not intended to diagnnose, treat, cure, or prevent any disease.
            </Card>
    </TheProgress01>
  );
};

export default Sip4;
