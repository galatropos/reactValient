import React, { useEffect, useRef, useState } from "react";
import Card from "../../Card";
import { getRandomArrayIndex } from "../../../utils/random";

const defaultPortait = {
  width: 70, height: 40, x: 50, y: 50, anchor: "middle",
  fontSize: 10, rotate: 0, opacity: 1, scale: 1,
};
const defaultLandscape = {
  width: 40, height: 40, x: 0, y: 0, anchor: "left-top",
  fontSize: 10, rotate: 0, opacity: 1, scale: 1,
};

/**
 * controls: "continue" | "pause"
 * setControls: React.Dispatch<React.SetStateAction<"continue" | "pause">>
 */
export const PopSlotMachine = ({
  elements = [],
  portrait = defaultPortait,
  landscape = defaultLandscape,
  style ,
  interval = 200,          // cambio de imagen continuo
  timeOutContinue = 5000,  // estando en "continue", tras este tiempo pasa a "pause"
  timeOutPause = 2000,     // estando en "pause", tras este tiempo pasa a "continue"
  controls = "continue",   // <-- CONTROLADO: "continue" | "pause"
  setControls,             // <-- CONTROLADO: setter provisto por el padre
}) => {
  const [index, setIndex] = useState(0);
  const len = elements.length;

  // refs para timers/intervalos
  const intervalRef = useRef(null);
  const continueTimerRef = useRef(null);
  const pauseTimerRef = useRef(null);

  // Intervalo que NUNCA se detiene; solo avanza si controls === "continue"
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (controls === "continue") {
        setIndex((i) => (i + 1) % len);
      }
    }, Math.max(1, interval));

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [interval, len, controls]);

  // Orquestación automática según controls
  useEffect(() => {
    // Limpia cualquier timer previo
    if (continueTimerRef.current) { clearTimeout(continueTimerRef.current); continueTimerRef.current = null; }
    if (pauseTimerRef.current)    { clearTimeout(pauseTimerRef.current);    pauseTimerRef.current = null; }

    if (!setControls) return; // por si se usa sin control externo

    if (controls === "continue") {
      // programa pasar a "pause" tras timeOutContinue
      continueTimerRef.current = setTimeout(() => {
        // fija una imagen aleatoria al entrar en pausa
        setIndex(getRandomArrayIndex(elements));
        setControls("pause");
      }, Math.max(0, timeOutContinue));
    } else {
      // controls === "pause": programa volver a "continue"
      pauseTimerRef.current = setTimeout(() => {
        setControls("continue");
      }, Math.max(0, timeOutPause));
    }

    return () => {
      if (continueTimerRef.current) { clearTimeout(continueTimerRef.current); continueTimerRef.current = null; }
      if (pauseTimerRef.current)    { clearTimeout(pauseTimerRef.current);    pauseTimerRef.current = null; }
    };
  }, [controls, timeOutContinue, timeOutPause, setControls, elements]);

  // Evitar desbordes si cambia la lista
  useEffect(() => {
    if (index >= len) setIndex(0);
  }, [len, index]);

  return (
    <Card portrait={portrait} landscape={landscape} style={style}>
      {elements[index]}
    </Card>
  );
};
