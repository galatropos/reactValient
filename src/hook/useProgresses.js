// src/hook/useProgresses.js
import { useEffect, useMemo, useRef, useState } from "react";
import { useProgress } from "./useProgress";

const lerp = (t, a, b) => a + (b - a) * t;

function buildRanges({ default: def, animate }) {
  const keys = new Set(Object.keys(def || {}));
  for (const [delta] of animate) {
    if (delta) Object.keys(delta).forEach((k) => keys.add(k));
  }

  const acc = {};
  keys.forEach((k) => (acc[k] = typeof def?.[k] === "number" ? def[k] : 0));

  const ranges = [];
  for (const [delta] of animate) {
    const prev = {};
    keys.forEach((k) => (prev[k] = acc[k]));

    keys.forEach((k) => {
      const step = (delta && typeof delta[k] === "number") ? delta[k] : 0;
      acc[k] = acc[k] + step;
    });

    const entry = {};
    keys.forEach((k) => (entry[k] = [prev[k], acc[k]]));
    ranges.push(entry);
  }
  return ranges;
}

export function useProgresses({
  default: defaultValue = {},
  animate = [],
  action = "stop",
  onStepUpdate,
  onSequenceFinish,
  loop = false,
  repeat = null,          // número de repeticiones
  onStepChange,           // (stepIndex) => void  ✅ NUEVO
}) {
  // Solo valores numéricos para interpolación
  const defaultValueFinish = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(defaultValue).filter(([, v]) => typeof v === "number")
      ),
    [defaultValue]
  );

  const ranges = useMemo(
    () => buildRanges({ default: defaultValueFinish, animate }),
    [defaultValueFinish, animate]
  );
  const times = useMemo(() => animate.map((a) => a?.[1] ?? 0), [animate]);

  const [section, setSection] = useState(0);
  const [internal, setInternal] = useState("stop");
  const [sequenceValue, setSequenceValue] = useState(defaultValueFinish);
  const [cycleCount, setCycleCount] = useState(0); // contador de ciclos

  const effectiveAction = action === "pause" ? "pause" : internal;

  // Notificar cambio de paso (solo cuando realmente cambie)
  const prevSectionRef = useRef(section);
  useEffect(() => {
    if (prevSectionRef.current !== section) {
      prevSectionRef.current = section;
      onStepChange?.(section);
    }
  }, [section, onStepChange]);

  // Responder a action externa
  useEffect(() => {
    if (action === "stop") {
      setInternal("stop");
      setSection(0);
      setSequenceValue(defaultValueFinish);
      setCycleCount(0);
      onStepChange?.(0); // opcional: notifica reset al paso 0
    } else if (action === "play") {
      setInternal((prev) => (prev === "finish" ? "finish" : "play"));
    }
  }, [action, defaultValueFinish, onStepChange]);

  // Mantener play activo cuando cambia de sección y no está “finish”
  useEffect(() => {
    if (action === "play" && internal !== "finish") {
      setInternal("play");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  // Motor de avance por paso
  useProgress({
    initial: 0,
    finish: 1,
    time: times[section] ?? 0,
    action: effectiveAction,
    onUpdate: (s) => {
      const r = ranges[section] || {};
      const current = {};
      for (const key in r) {
        const [i, f] = r[key];
        current[key] = lerp(s.progress, i, f);
      }

      // Copiar claves NO numéricas del delta del paso (p.ej. anchor)
      const stepDelta = animate[section]?.[0] || null;
      if (stepDelta) {
        for (const k of Object.keys(stepDelta)) {
          const v = stepDelta[k];
          if (typeof v !== "number") current[k] = v;
        }
      }

      setSequenceValue(current);
      onStepUpdate?.({ ...s, section, value: current });

      if (action === "pause") return;

      if (s.status === "finish") {
        const last = section >= animate.length - 1;

        if (last) {
          // ciclo completo
          setCycleCount((c) => {
            const newCount = c + 1;

            // repeat definido y alcanzado
            if (repeat !== null && newCount >= repeat) {
              setInternal("finish");
              onSequenceFinish?.();
              return newCount;
            }

            // loop infinito
            if (loop && action === "play") {
              setInternal("stop");
              setSection(0); // disparará onStepChange(0)
              return newCount;
            }

            // repeat definido y aún quedan ciclos
            if (repeat !== null && newCount < repeat) {
              setInternal("stop");
              setSection(0); // disparará onStepChange(0)
              return newCount;
            }

            // sin repeat ni loop → terminar
            setInternal("finish");
            onSequenceFinish?.();
            return newCount;
          });
          return;
        }

        // Avanza a la siguiente sección (paso del animate)
        setInternal("stop");
        setSection((idx) => idx + 1); // disparará onStepChange(idx+1)
      }
    },
  });

  return {
    sequenceValue,
    section,                   // índice actual del paso
    stepIndex: section,        // alias claro
    stepCount: animate.length, // total de pasos
    status: effectiveAction,
    cycleCount,
  };
}
