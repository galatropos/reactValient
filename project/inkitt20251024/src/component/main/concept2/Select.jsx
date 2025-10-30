// Select.jsx
import React, { useCallback, useRef, useState, useEffect } from "react";
import Card from "../../../../../../src/component/Card";
import audioClick from "../../../../assets/audio/click.mp3";
import useAudio from "../../../../../../src/hook/useAudio";


const Select = ({
  anchor = "middle",
  xp = 52, yp = 52, xl = 20, yl = 10,
  handleOn = "select",
  br=0,bl=0,bt=0,bb=0,
  setActive
}) => {
  const startClick = useAudio(audioClick);

  const [activado, setActivado] = useState(false);
  const [controller, setController] = useState("stop");
  const [runId, setRunId] = useState(0);      // fuerza re-mount del Card de la mano
  const [handShown, setHandShown] = useState(false); // 🔑 mostrar/ocultar mano por React
  const watchdogRef = useRef(null);

  // espejo del controller para lecturas síncronas
  const controllerRef = useRef(controller);
  useEffect(() => { controllerRef.current = controller; }, [controller]);




  // ---------------------------------------




  // ---------- Disparo seguro: re-mount + restart ----------
  const pressGateRef = useRef(false);
  const releaseGate = () => {
    if (typeof queueMicrotask === "function") queueMicrotask(() => { pressGateRef.current = false; });
    else setTimeout(() => { pressGateRef.current = false; }, 0);
  };

  const restartAnimation = () => {
    // Mostrar mano y re-montarla con key distinta
    setHandShown(true);
    setRunId((n) => n + 1);
    // Restart duro del controlador
    setController("stop");
    requestAnimationFrame(() => setController("play"));
  };

  const handlePressEndInside = useCallback((e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    if (pressGateRef.current) return;
    pressGateRef.current = true;

    startClick.play();

    // Toggle del overlay directamente por click (determinista)
    setActivado(prev => !prev);
    setActive(false);

    // Reinicio duro de la mano (evita freeze)
    restartAnimation();

    // Watchdog: si no llega el paso final, detenemos y ocultamos la mano
    clearTimeout(watchdogRef.current);
    watchdogRef.current = setTimeout(() => {
      setController("stop");
      setHandShown(false);  // 🔥 garantizamos que no quede visible
    }, 5600);

    releaseGate();
  }, [startClick]);
  // --------------------------------------------------------

  // Área seleccionable
  const configSelect = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
      outline: "8px solid white",
      backgroundColor: `rgba(255,255,255,${activado ? 0.5 : 0})`,
      zIndex: 5,
      borderRadius:br+"px "+bl+"px "+bt+"px "+bb+"px"
    },
    portrait: { x: xp, y: yp, width: 32.5, height: 15.9, anchor },
    landscape: { x: xl, y: yl, width: 13.2, height: 23, anchor, scale: 1, fontSize: 3.5 },
  };


  // Quién maneja el gesto
  const selectGetsHandler = handleOn === "select" || handleOn === "both";

  // ⚙️ Si el usuario puso handleOn="hand" pero la mano está oculta,
  //    redirigimos el gesto al select para no perder interacción.
  const effectiveSelectGetsHandler =
    selectGetsHandler || (!handShown && handleOn === "hand");

  return (
    <>
      <Card
        key="select"
        {...configSelect}
        onPressEndInside={effectiveSelectGetsHandler ? handlePressEndInside : undefined}
      >
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 10,
            background: "#46B5FF",
            outline: "3px solid white",
            width: "50px",
            height: "50px",
            borderRadius: "100%",
            display: activado ? "block" : "none",
            pointerEvents: "none",
          }}
        />
      </Card>


    </>
  );
};

export default Select;
