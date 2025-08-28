// src/hook/useProgresses.js
import { useEffect, useMemo, useState } from "react";
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
  repeat = null, // 🔹 número de repeticiones
}) {
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
  const [cycleCount, setCycleCount] = useState(0); // 🔹 contador de ciclos

  const effectiveAction = action === "pause" ? "pause" : internal;

  useEffect(() => {
    if (action === "stop") {
      setInternal("stop");
      setSection(0);
      setSequenceValue(defaultValueFinish);
      setCycleCount(0); // reinicia el contador
    } else if (action === "play") {
      setInternal((prev) => (prev === "finish" ? "finish" : "play"));
    }
  }, [action, defaultValueFinish]);

  useEffect(() => {
    if (action === "play" && internal !== "finish") {
      setInternal("play");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

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
      setSequenceValue(current);
      onStepUpdate?.({ ...s, section, value: current });

      if (action === "pause") return;

      if (s.status === "finish") {
        const last = section >= animate.length - 1;

        if (last) {
          // 🔹 completamos un ciclo
          setCycleCount((c) => {
            const newCount = c + 1;

            // Caso 1: repeat definido y alcanzado
            if (repeat !== null && newCount >= repeat) {
              setInternal("finish");
              onSequenceFinish?.();
              return newCount;
            }

            // Caso 2: loop infinito
            if (loop && action === "play") {
              setInternal("stop");
              setSection(0);
              return newCount;
            }

            // Caso 3: repeat definido y todavía quedan ciclos
            if (repeat !== null && newCount < repeat) {
              setInternal("stop");
              setSection(0);
              return newCount;
            }

            // Caso 4: sin repeat ni loop → terminar
            setInternal("finish");
            onSequenceFinish?.();
            return newCount;
          });
          return;
        }

        // Avanza a la siguiente sección
        setInternal("stop");
        setSection((idx) => idx + 1);
      }
    },
  });

  return {
    sequenceValue,
    section,
    status: effectiveAction,
    cycleCount, // 🔹 lo exponemos por si quieres mostrar en UI
  };
}
