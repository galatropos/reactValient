import React, { useEffect, useMemo, useState } from "react";
import Card from "../../Card";

const PopScale = ({
  portrait,
  landscape,
  style,
  elements = [],
  intervalChange = 2000,
  scale = 1,
  initial = 1000, // ms a esperar antes de la PRIMERA animación
}) => {
  const [index, setIndex] = useState(0);
  const [element, setElement] = useState(elements[0]);
  const [control, setControl] = useState(false);
  const [started, setStarted] = useState(initial <= 0); // si initial=0, arranca de inmediato

  const animate = useMemo(
    () => [
      [{ scale: 0.2,  }, 100],
      [{   }, 100],
      [{ scale: -0.3,  }, 100],
      [{ scale: 0.2,  }, 100],
      [{ scale: 0.1,  }, 100],
      [{ scale: -0.2,  }, 100],
      [{  }, 10000],
    ],
    []
  );

  // Mantengo tu asignación (aunque muta props)
  portrait.animate = animate;
  landscape.animate = animate;

  // 1) Espera "initial" y luego inicia el ciclo (primer cambio + intervalo)
  useEffect(() => {
    if (!elements.length) return;

    let startId;
    let intervalId;

    const startCycle = () => {
      setStarted(true);
      // Primer cambio (esto detonará la animación en el efecto de [index])
      setIndex((c) => (c + 1) % elements.length);

      // Intervalo regular
      intervalId = setInterval(() => {
        setIndex((c) => (c + 1) % elements.length);
      }, intervalChange);
    };

    if (initial > 0) {
      startId = setTimeout(startCycle, initial);
    } else {
      startCycle();
    }

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [elements.length, intervalChange, initial]);

  // 2) Al cambiar index, disparar animación + swap de elemento
  useEffect(() => {
    if (!elements.length) return;
    if (!started) return; // ⬅️ clave: NO animar hasta que pase "initial"

    const t1 = setTimeout(() => {
      portrait.scale = scale;
      setControl(true);
            
      const t3 = setTimeout(() => {
        setElement(elements[index]);
      }, 250); // tu ventana de 400 ms para el swap

      
      const t2 = setTimeout(() => {
        setControl(false);
      }, 600); // tu ventana de 400 ms para el swap

      return () => clearTimeout(t2);
    }, 100);

    return () => clearTimeout(t1);
  }, [index, elements, portrait, scale, started]);

  return (
    <Card
      portrait={portrait}
      landscape={landscape}
      style={style}
      loop={true}
      controlsAnimate={control ? "play" : "stop"}
    >
      {element}
    </Card>
  );
};

export default PopScale;
