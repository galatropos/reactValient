import { useEffect, useState } from "react";

export function useOrientation() {
  const [orientation, setOrientation] = useState(
    window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape"
  );

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const handler = (e) => {
      setOrientation(e.matches ? "portrait" : "landscape");
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return orientation;
}

export default function App() {
  const orientation = useOrientation();

  return <h1>Ahora está en {orientation}</h1>;
}
