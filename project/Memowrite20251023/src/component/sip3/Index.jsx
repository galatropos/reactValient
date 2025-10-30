import React, { useEffect, useMemo } from "react";
import Card from "../../../../../src/component/Card";
import "../../../assets/style/sip3.css";
import imageBackground from "../../../assets/image/sip3/background.jpg";
import { useCounter } from "../../../../../src/hook/useCounter";
import animateHeartbeat from "../../../../../src/utils/animate/animateHeartbeat";
import installPoppins from "../../../../../src/assets/font/Poppins/installPoppins";

const Index = () => {
  // Carga de fuente: una sola vez
  useEffect(() => {
    installPoppins();
  }, []);


  const count = useCounter({
    from: 0,
    to: 64,
    step: 1,
    refreshMs: 20,
    autostart: true,
  });

  // Animación de “shake + scale” — estable
  const animateValue = useMemo(
    () => [
      [{ rotate: +10, scale: +0.089 }, 100],
      [{ rotate: -10, scale: -0.089 }, 100],
      [{ rotate: +6, scale: +0.059 }, 80],
      [{ rotate: -6, scale: -0.059 }, 80],
      [{ rotate: +3, scale: +0.029 }, 60],
      [{ rotate: -3, scale: -0.029 }, 60],
      [{}, 1000],
    ],
    []
  );

  // Heartbeat — estable (si necesitas parámetros, inclúyelos en deps)
  const heartbeat = useMemo(() => animateHeartbeat(), []);

  // —— CONFIGS MEMOIZADOS (sin children para mantener identidad) ——

  const configBackground = useMemo(
    () => ({
      style: {},
      backgroundImage: imageBackground,
      portrait: { x: 45, y: 39, width: 332, height: 190, anchor: "middle" },
      landscape: { x: 48, y: 39, width: 115, height: 207, anchor: "middle" },
    }),
    []
  );

  const configPercentage = useMemo(
    () => ({
      style: { color: "#5C0800", fontWeight: "800" },
      portrait: {
        x: 62,
        y: 13,
        width: 90,
        height: 20,
        anchor: "middle",
        scale: 1,
        fontSize: 16,
        rotate: 20,
      },
      landscape: {
        x: 54.2,
        y: 10.7,
        rotate: 20,
        width: 34,
        height: 60,
        anchor: "middle",
        fontSize: 5.3,
        scale: 1,
      },
    }),
    []
  );

  const configValue = useMemo(
    () => ({
      style: { color: "#5C0800", fontWeight: "800" },
      portrait: {
        x: 49.9,
        y: 72,
        width: 30,
        height: 30,
        anchor: "middle",
        scale: 1,
        fontSize: 25,
        animate: animateValue,
      },
      landscape: {
        x: 50,
        y: 75.5,
        width: 34,
        height: 60,
        anchor: "middle",
        scale: 1,
        fontSize: 6,
        animate: animateValue,
      },
      controlsAnimate: "play",
      loop: true,
    }),
    [animateValue]
  );

  const configCTA = useMemo(
    () => ({
      style: {
        background: "black",
        color: "white",
        borderRadius: "100px",
        fontWeight: "500",
      },
      portrait: {
        x: 50,
        y: 90,
        width: 85,
        height: 7,
        anchor: "middle",
        animate: heartbeat,
        scale: 1,
        fontSize: 5,
      },
      landscape: {
        x: 50,
        y: 93.5,
        fontSize: 2,
        width: 39,
        height: 11,
        anchor: "middle",
        animate: heartbeat,
        scale: 0.3,
      },
      controlsAnimate: "play",
      loop: true,
    }),
    [heartbeat]
  );

  return (
    <>
      <Card {...configBackground} />

      {/* percentage usando count sin meterlo dentro del objeto config */}
      <Card {...configPercentage}>
        <span>{count}</span>
      </Card>

      {/* valor animado */}
      <Card {...configValue}>
        <span>$57</span>
      </Card>

      {/* CTA heartbeat */}
      <Card {...configCTA}>
        <>
          <span className="circle">➜ </span>&nbsp; Order now
        </>
      </Card>
    </>
  );
};

export default Index;
