import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "../../Card";

const DEFAULT_STYLE = { border: "1px solid black" };
const DEFAULT_PORTRAIT_BASE = { width: 10, height: 10, anchor: "middle" };
const DEFAULT_LANDSCAPE_BASE = { width: 10, height: 10, anchor: "middle" };

export default function CarouselDefault({
  elements = [],
  start = 0,
  end = 100,
  itemWidth = 10,
  stepDuration = 1000,
  y = 50,
  style = DEFAULT_STYLE,
  portraitBase = DEFAULT_PORTRAIT_BASE,
  landscapeBase = DEFAULT_LANDSCAPE_BASE,
}) {
  const len = elements.length;
  if (!len) return null;

  if (itemWidth <= 0) itemWidth = 10;
  if (end < start) [start, end] = [end, start];

  // # de posiciones visibles (incluye extremos)
  const slots = useMemo(
    () => Math.floor((end - start) / itemWidth) + 1,
    [start, end, itemWidth]
  );
  const lastPosVisible = slots - 1;

  // contador global de creaciones: garantiza 0,1,2,3... sin saltos
  const createdCountRef = useRef(slots);

  // estado: cada ítem conserva su contenido (elemIndex) toda su vida
  const [items, setItems] = useState(() => {
    const now = Date.now();
    return Array.from({ length: slots }, (_, i) => ({
      id: `init-${now}-${i}`,
      pos: i,                // 0..lastPosVisible
      elemIndex: i % len,    // contenido fijo por ítem
      step: 0,               // contador para re-montar y reanimar
    }));
  });

  // si cambia la cantidad de slots (o len), realinea el contador de creación
  useEffect(() => {
    createdCountRef.current = slots;
  }, [slots]);

  const makeNewAtPos = (pos) => {
    const seq = createdCountRef.current++;       // 0,1,2,3...
    return {
      id: `c-${seq}-${Math.random().toString(36).slice(2)}`,
      pos,
      elemIndex: seq % len, // contenido NUEVO, fijo para este ítem
      step: 0,
    };
  };

  // reloj global: avanza TODOS 1 paso; elimina los que salen; crea nuevos a izquierda
  useEffect(() => {
    const iv = setInterval(() => {
      setItems((prev) => {
        // 1) avanza pos y step de todos
        const advanced = prev.map((it) => ({ ...it, pos: it.pos + 1, step: it.step + 1 }));

        // 2) separa visibles y overflow
        const staying = [];
        let overflow = 0;
        for (const it of advanced) {
          if (it.pos > lastPosVisible) overflow++;
          else staying.push(it);
        }

        // 3) calcula el pos mínimo visible para apilar nuevos a su izquierda
        const minPos = staying.length
          ? staying.reduce((m, it) => (it.pos < m ? it.pos : m), staying[0].pos)
          : 0;

        // 4) crea exactamente 'overflow' nuevos: pos = minPos-1, minPos-2, ...
        const newcomers = [];
        for (let i = 0; i < overflow; i++) {
          newcomers.push(makeNewAtPos(minPos - (i + 1)));
        }

        // 5) devuelve nuevos + visibles (el orden del array da igual; manda 'pos')
        return [...newcomers, ...staying];
      });
    }, stepDuration);
    return () => clearInterval(iv);
  }, [stepDuration, lastPosVisible, len]);

  // props de animación: cada render el Card ve animate de un paso
  const portraitFor = (pos) => ({
    ...portraitBase,
    x: start + pos * itemWidth,
    y,
    animate: [[{ x: itemWidth, y: 0 }, stepDuration]],
  });

  const landscapeFor = (pos) => ({
    ...landscapeBase,
    x: start + pos * itemWidth,
    y,
    animate: [[{ x: itemWidth, y: 0 }, stepDuration]],
  });

  return (
    <>
      {items.map((it, idx) => (
        <Card
          key={`${it.id}:${it.step}`}              // remonta el MISMO ítem → reanimación sin “heredar” contenido
          className={`carousel-card idx-${idx}`}  // depuración
          data-idx={idx}
          portrait={portraitFor(it.pos)}
          landscape={landscapeFor(it.pos)}
          controlsAnimate="play"
          style={style}
          setSecuenceFinish={() => {}}            // usamos reloj global
        >
          {elements[it.elemIndex]}                 {/* contenido fijo por ítem */}
        </Card>
      ))}
    </>
  );
}
