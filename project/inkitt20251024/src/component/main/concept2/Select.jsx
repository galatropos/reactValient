import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import Card from "../../../../../../src/component/Card";
import audioClick from "../../../../assets/audio/click.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

function Select({
  anchor = "middle",
  xp = 52,
  yp = 52,
  xl = 20,
  yl = 10,
  handleOn = "select",
  br = 0,
  bl = 0,
  bt = 0,
  bb = 0,
  setActive,
  setActiveReady,
  id,
}) {
  const startClick = useAudio(audioClick);
  const [activado, setActivado] = useState(false);

  // Sincroniza el array de "ready" con este id
  useEffect(() => {
    setActiveReady((arr) => {
      const next = Array.isArray(arr) ? arr.slice() : [];
      next[id] = activado;
      return next;
    });
  }, [activado, id, setActiveReady]);

  // Gate anti rebote
  const pressGateRef = useRef(false);
  const releaseGate = () => {
    (typeof queueMicrotask === "function" ? queueMicrotask : (fn) => setTimeout(fn, 0))(() => {
      pressGateRef.current = false;
    });
  };

  const handlePressEndInside = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      if (pressGateRef.current) return;
      pressGateRef.current = true;

      startClick.play();
      setActivado((prev) => !prev);
      setActive(false);

      releaseGate();
    },
    [setActive, startClick]
  );

  const borderRadius = `${br}px ${bl}px ${bt}px ${bb}px`;

  const configSelect = {
    style: {
      color: "white",
      fontWeight: "bold",
      flexDirection: "column",
      outline: "8px solid white",
      backgroundColor: `rgba(255,255,255,${activado ? 0.5 : 0})`,
      zIndex: 5,
      borderRadius,
    },
    portrait: { x: xp, y: yp, width: 32.5, height: 15.9, anchor },
    landscape: { x: xl, y: yl, width: 13.2, height: 23, anchor, fontSize: 3.5 },
  };

  // ¿Quién maneja el gesto?
  const selectGetsHandler = handleOn === "select" || handleOn === "both";

  return (
    <Card {...configSelect} onPressEndInside={selectGetsHandler ? handlePressEndInside : undefined}>
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          background: "#46B5FF",
          outline: "3px solid white",
          width: 50,
          height: 50,
          borderRadius: "100%",
          display: activado ? "block" : "none",
          pointerEvents: "none",
        }}
      />
    </Card>
  );
}

export default memo(Select, (a, b) =>
  a.id === b.id &&
  a.xp === b.xp &&
  a.yp === b.yp &&
  a.xl === b.xl &&
  a.yl === b.yl &&
  a.anchor === b.anchor &&
  a.br === b.br &&
  a.bl === b.bl &&
  a.bt === b.bt &&
  a.bb === b.bb
);
