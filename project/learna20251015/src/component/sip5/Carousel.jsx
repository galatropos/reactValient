// App.jsx
import React from "react";
import "./styles.css";
import { VirtualizedPage } from "./VirtualizedPage";

import face1 from "../../../assets/image/sip5/face1.png";
import face2 from "../../../assets/image/sip5/face2.png";
import face3 from "../../../assets/image/sip5/face3.png";
import face4 from "../../../assets/image/sip5/face4.png";
import face5 from "../../../assets/image/sip5/face5.png";

const imageFace = [
  { src: face1, title: "Learna" },
  { src: face2, title: "Learna - X" },
  { src: face3, title: "Mateo" },
  { src: face4, title: "Darius" },
  { src: face5, title: "Hazel" },
];

const wrap = (i, n) => ((i % n) + n) % n;

export default function Carrousel() {
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 640, height: 500 }}>
        {/*
          gapPx: separación fija
          centerScale: escala SOLO del contenido del centro
          compensateGap: conserva el mismo espacio junto al centro
          sideOuterGapPx: abre un poco las orillas (|rel| >= 2)

          nudgeOnStart: ejecutar nudge al montar
          nudgePx / nudgeDuration / nudgePauseMs: parámetros del nudge
          stopNudgeOnInteract: detener nudge al tocar
          resumeNudgeAfterMs: si no hay interacción por este tiempo, reanudar nudge en bucle
        */}
        <VirtualizedPage
          gapPx={20}
          centerScale={1.25}
          compensateGap
          sideOuterGapPx={86}
          nudgeOnStart
          nudgePx={80}
          nudgeDelayMs={100}
          nudgeDuration={0.5}
          nudgePauseMs={1400}
          stopNudgeOnInteract
          resumeNudgeAfterMs={30000} // ⬅️ reanuda a los 30s sin interacción
        >
          {({ index }) => {
            const item = imageFace[wrap(index, imageFace.length)];
            return (
              <figure
                style={{
                  display: "grid",
                  gridTemplateRows: "1fr auto",
                  width: "100%",
                  height: "100%",
                  margin: 0,
                }}
              >
                <img
                  draggable={false}
                  alt={item.title}
                  title={item.title}
                  src={item.src}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
                <figcaption
                  style={{
                    textAlign: "center",
                    lineHeight: 1.2,
                    padding: "8px 0 4px",
                  }}
                >
                  {item.title}
                </figcaption>
              </figure>
            );
          }}
        </VirtualizedPage>
      </div>
    </div>
  );
}
