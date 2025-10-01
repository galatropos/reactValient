import { useEffect,  useState } from "react";
import { ScaleContext } from "../context/contextScale";

export default function ScaledContainer({ children }) {

  const [scaleData, setScaleData] = useState({
    x: 1,
    y: 1,
    min: 1,
    width: 0,
    height: 0,
  });

  const scaleContainer = () => {
const min=900;
const max=1600;

    const baseWidth = window.innerWidth <= window.innerHeight ? min : max;
    const baseHeight = window.innerWidth <= window.innerHeight ? max : min;

    const scaleX = window.innerWidth / baseWidth;
    const scaleY = window.innerHeight / baseHeight;
    const minScale = Math.min(scaleX, scaleY);


    setScaleData({
      x: scaleX,
      y: scaleY,
      min: minScale,
      width: baseWidth,
      height: baseHeight,
      media: window.innerWidth <= window.innerHeight ? "portrait" : "landscape",
    });
  };

  useEffect(() => {
    scaleContainer();
    window.addEventListener("resize", scaleContainer);
    return () => window.removeEventListener("resize", scaleContainer);
  }, []);

  const style = {
    width: `${scaleData.width}px`,
    height: `${scaleData.height}px`,
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) scale(${scaleData.min})`,
    transformOrigin: "center center",
  };

  return (
    <ScaleContext.Provider value={scaleData}>
      <div   className="container" style={style} id="container">
        {children}
      </div>
    </ScaleContext.Provider>
  );
}