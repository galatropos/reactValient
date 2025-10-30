import React, { useCallback,  useMemo, useState } from "react";
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

  const animate = useMemo(
    () => [
      [{  }, intervalChange],
      [{ scale: 0.2,  }, 80],
      [{ scale: -0.2,  }, 80],
      [{   }, 50],
      [{ scale: 0.2,  }, 80],
      [{ scale: -1.3,  }, 100],
      [{   }, 0],
      [{ scale: 1.2,  }, 100],
      [{ scale: -0.4,  }, 80],
      [{ scale: 0.3,  }, 100],
      [{ scale: -0.1,  }, 200],
    ],
    []
  );

  // Mantengo tu asignación (aunque muta props)
  portrait.animate = animate;
  
  landscape.animate = animate;
  portrait.scale=1;

const handleStepChange = useCallback(
    (stepIdx) => {
      if (stepIdx === 6 && elements.length > 0) {
        setIndex((i) => (i + 1) % elements.length);
      }
    },)
  return (
    <Card
      portrait={portrait}
      landscape={landscape}
      style={style}
      loop={true}
      controlsAnimate={ "play"}
      onStepChange={handleStepChange}
    >
      {elements[index]}
    </Card>
  );
};

export default PopScale;
