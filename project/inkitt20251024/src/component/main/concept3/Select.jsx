import React from "react";
import Card from "../../../../../../src/component/Card";
import audioCard from "../../../../assets/audio/card.mp3";
import audioSpin from "../../../../assets/audio/flipCard.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

// Z-index base
const Z_BASE_CARD = 10;            // Cards: 10 + index
const Z_BASE_TITLE = -10;          // Titles: base negativo (invertido con length)
const Z_SELECTED_CARD  = 2_000_000;
const Z_SELECTED_TITLE = Z_BASE_CARD - 1; // 9 -> debajo de cualquier card

const Select = ({
  image,
  title,
  index,
  backgroundColor,
  setAcceptDenied,
  setNext,
  setControllerHand,
  setDirection,
  setContNext,
  length,
}) => {
  // Audio
  const startCard = useAudio(audioCard);
  const startSpin = useAudio(audioSpin);

  // Abanico inicial
  const baseRotate = 13 * (index - (length / 2));
  const [rot, setRot] = React.useState(baseRotate);
  React.useEffect(() => setRot(baseRotate), [baseRotate]);

  // ===== CARD (SIN CAMBIOS) =====
  const [controller, setController] = React.useState("stop");
  const [animateSelect, setAnimateSelect] = React.useState([]); // vacío durante drag
  const [select, setSelect] = React.useState(false);

  const [controlCard, setControlCard] = React.useState(false); // drag en curso
  const [isAnimating, setIsAnimating] = React.useState(false); // animación post-suelta
  const [isHidden, setIsHidden] = React.useState(false);       // ocultar carta tras negación

  const nextAfterAnimRef = React.useRef(null);
  const hideOnFinishRef = React.useRef(false);

  const animateLeft = [
    [{ rotate: -45, x: -20, y: -3,  scale: +0.05, scaleX: +0.04, scaleY: +0.54 }, 220],
    [{ rotate: -45, x: -20, y: -5,  scale: -0.02,                  scaleY:  0.52 }, 200],
    [{ rotate: -45, x: -15, y: -7,  scale: -0.03, blur: +2 },                       260],
    [{ rotate: -45, x: -25, y: -9,  scale: -0.04, opacity: -0.5, blur: +2 },        360],
    [{ rotate: -180, x: -100, y: -2, opacity: -0.5 }, 160],
  ];
  const animateRight = [
    [{ rotate: +45, x: +20, y:  -3, scale: +0.05, scaleX: +0.04, scaleY: +0.54 }, 220],
    [{ rotate: +45, x: +20, y:  -5, scale: -0.02,                  scaleY:  0.52 }, 200],
    [{ rotate: +45, x: +15, y:  -7, scale: -0.03, blur: +2                          }, 260],
    [{ rotate: +45, x: +25, y:  -9, scale: -0.04, opacity: -0.5, blur: +2          }, 300],
    [{ rotate:+180, x:+100, y:  -2, opacity: -0.5                                   }, 260],
  ];
  const animateCenter = [
    [{ rotateY: +90,  scaleX: -0.08, scaleY: +0.08, scale: +1.04, blur:  2 }, 250],
    [{ rotateY: +180, scaleX: +0.08, scaleY: -0.08, scale:  1.06, blur:  4 }, 250],
    [{ rotateY: +360, scaleX: -0.02, scaleY: +0.02, scale: +1.02, blur:  8 }, 250],
    [{ rotateY:   0,  scaleX:  0.00, scaleY:  0.00, scale:  1.00, blur:  0 }, 250],
  ];

  const configGlobal = {
    style: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "6%",
      zIndex: select ? Z_SELECTED_CARD : (Z_BASE_CARD + index),
    },
  };

  const currentOrigin = (controlCard || isAnimating) ? "center center" : "left bottom";

  const configCard = {
    ...configGlobal,
    portrait: {
      x: 58.5, y: 42.5, width: 47, height: 43, anchor: "middle",
      rotate: rot,
      animate: animateSelect,
      transformOrigin: currentOrigin,
      hidden: isHidden,
    },
    landscape: {
      x: 55, y: 47, width: 21, height: 50, anchor: "middle",
      rotate: rot,
      animate: animateSelect,
      transformOrigin: currentOrigin,
      hidden: isHidden,
    },
    loop: false,
    controlsAnimate: controller,
    setSecuenceFinish: () => {
      requestAnimationFrame(() => {
        setIsAnimating(false);
        setAnimateSelect([]);
        setController("stop");

        setControllerHand?.("stop");
        setDirection?.(null);

        if (hideOnFinishRef.current) {
          setIsHidden(true);
          hideOnFinishRef.current = false;
        }
        if (nextAfterAnimRef.current) {
          nextAfterAnimRef.current();
          nextAfterAnimRef.current = null;
        }
      });
    },
  };

  // ===== TITLE (motor igual que card, pero desmontable) =====
  const baseAnimateTitle = [[{ opacity: -1, blur: 10 }, 200]];
  const [titleAnimate, setTitleAnimate] = React.useState([]);
  const [titleController, setTitleController] = React.useState("stop");
  const [titleHidden, setTitleHidden] = React.useState(false);
  // Flag permanente: una vez fadeado, no se vuelve a renderizar
  const hasTitleFadedRef = React.useRef(false);

  // z-index del título (serie negativa invertida con length)
  const inverted = length ? (length - 1 - index) : 0;
  const zTitleBase = Z_BASE_TITLE - inverted;

  const configTitle = {
    style: {
      background: backgroundColor,
      zIndex: select ? Z_SELECTED_TITLE : zTitleBase,
      pointerEvents: "none",
      borderRadius: "10px",
      padding: "6px 10px",
      fontWeight: "bold",
    },
    portrait: {
      fontSize:8,x: 50, y: 7, width: 100, height: 10, anchor: "middle",
      animate: titleHidden ? [] : titleAnimate,
      
    },
    landscape: {
      x: 50, y: 6, width: 100, height: 10, anchor: "middle", fontSize: 3.5,
      animate: titleHidden ? [] : titleAnimate,
    },
    children: title,
    loop: false,
    controlsAnimate: titleHidden ? "stop" : titleController, // controller propio
    hidden: titleHidden,
    setSecuenceFinish: () => {
      // Oculta y marca "para siempre", luego desmontamos con el render condicional
      requestAnimationFrame(() => {
        setTitleHidden(true);
        hasTitleFadedRef.current = true;
        setTitleAnimate([]);
        setTitleController("stop");
      });
    },
  };

  // ===== Drag handler =====
  const onPressDrag = (e) => {
    const { status, directionFromCenter, deltaPercent } = e;
    const { horizontal } = directionFromCenter || {};
    const { x } = deltaPercent || { x: 0 };

    if (status === "start") {
      setControllerHand?.("stop");
      setDirection?.(null);
      startCard.play();

      setSelect(true);
      setController("stop");
      setAnimateSelect([]);
      setControlCard(true);
      setIsAnimating(false);
      setIsHidden(false);
      // ¡No reactivar título si ya fadeó!
      setRot(0);
      return;
    }

    if (status === "move") {
      setDirection?.(horizontal);
      return;
    }

    if (status === "leave") {
      setControllerHand?.("stop");
      setDirection?.(null);

      setControlCard(false);
      setIsAnimating(true);

      // CARD (igual que siempre)
      if (x < 1 && x > -1) {
        setRot(baseRotate);
        startSpin.play();
        setAnimateSelect(animateCenter);
        setAcceptDenied?.("accept");
        nextAfterAnimRef.current = () => setNext?.(1);
      } else if (horizontal === "right") {
        setRot(baseRotate);
        startCard.play();
        setAnimateSelect(animateRight);
        setAcceptDenied?.("accept");
        nextAfterAnimRef.current = () => setNext?.(1);
      } else {
        setRot(0);
        startCard.play();
        setAnimateSelect(animateLeft);
        setAcceptDenied?.("deny");
        nextAfterAnimRef.current = () => setContNext?.((e) => e + 1);
        hideOnFinishRef.current = true;  // ocultar card al terminar
      }

      // TITLE: solo si nunca ha fadeado (evita reapariciones)
      if (!hasTitleFadedRef.current) {
        setTitleAnimate(baseAnimateTitle.map(([d, t]) => [{ ...d }, t])); // ref nueva
        setTitleController("stop");
        requestAnimationFrame(() => setTitleController("play"));
      }

      // CARD play (como siempre)
      requestAnimationFrame(() => setController("play"));
    }
  };

  return (
    <>
      {!hasTitleFadedRef.current && <Card {...configTitle} />}  {/* ⬅️ DESMONTA para siempre */}
      <Card
        {...configCard}
        draggable
        onPressDrag={onPressDrag}
      />
    </>
  );
};

export default Select;
