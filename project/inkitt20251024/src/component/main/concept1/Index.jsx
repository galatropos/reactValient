import React, { useEffect, useRef, useState, useCallback, memo } from "react";

import Card from "../../../../../../src/component/Card";
import CarouselMip from "../../../../../../src/component/effects/carousel/CarouselMip";
import AutoScrollBox from "../../../../../../src/component/AutoScrollBox";
import VideoToFramesPlayer from "../../../../../../src/component/VideoToFramesPlayer";
import useOrientation from "../../../../../../src/hook/useOrientation";
import animatePendule from "../../../../../../src/utils/animate/animatePendule";
import Hand from "./Hand";
import { useRedirectMIPEvent } from "../../../../../../src/hook/useRedirectMIP";
import audioCarousel from "../../../../assets/audio/carousel.mp3";
import audioSountrack from "../../../../assets/audio/sountrack1.mp3";
import useAudio from "../../../../../../src/hook/useAudio";

// ---------- Constantes fuera del render (no se recrean) ----------
const NOOP = () => {};
const PENDULE = animatePendule({ ampX: 0, emitX: false });
const ANIMATE_LOADING = [
  [{}, 500],
  [{ opacity: -1 }, 100],
];

const SLIDE_IMG_STYLE = {
  height: "100%",
  width: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  borderRadius: "50px",
};

const HAND_WRAPPER_STYLE = { pointerEvents: "none" };

// ---------- Subcomponente simple ----------
const SlideImage = memo(function SlideImage({ image }) {
  return <div style={{ ...SLIDE_IMG_STYLE, backgroundImage: `url(${image})` }} />;
});

function Video({
  backgroundColor = "#000",
  imageCarousel = [],
  ctaTextColor,
  logo,
  title,
  ctaText,
  ctaColor,
  text = null,
  video = null,
  mraid,
}) {
  const orientation = useOrientation();
  const [index, setIndex] = useState(0);
  const [controller, setController] = useState("play");
  const total = imageCarousel.length || 0;
  const finish = index === total;

  // Fondo del body solo cuando cambia backgroundColor
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, [backgroundColor]);

  // Audio
  const sfx = useAudio(audioCarousel);
  const soundtrack = useAudio(audioSountrack);
  useEffect(() => {
    soundtrack.automatic();
    soundtrack.setLoop(true);
  }, [soundtrack]);
  useEffect(() => {
    if (!text && finish) soundtrack.stop();
  }, [finish, text, soundtrack]);

  // Construcción de slides (simple y directa)
  const slides = (() => {
    const imgs = imageCarousel.map((src) => <SlideImage key={src} image={src} />);
    const tail = text ? (
      <AutoScrollBox
        key="text"
        style={{ color: "white", radius: "20px", width: "100%" }}
        reset={finish}
        speed={60}
        loop
        controlsMode="hidden"
        height={orientation === "portrait" ? "800px" : "745px"}
      >
        {text}
      </AutoScrollBox>
    ) : (
      <span key="video" style={{ display: "flex", width: "100%", height: "100%" }}>
        <VideoToFramesPlayer
          style={{ objectFit: "cover", borderRadius: "30px", backgroundColor }}
          portraitSrc={video?.srcPortrait}
          landscapeSrc={video?.srcLandscape}
          muted={!finish}
          pause={finish}
          loop
          autoPlay
          reset={finish}
          noCard
        />
      </span>
    );
    return [...imgs, tail];
  })();

  // onIndexChange con rAF para suavizar y evitar múltiples setState
  const rafRef = useRef(0);
  const onIndexChange = useCallback(
    (i) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        sfx.play();
        setIndex(i);
      });
    },
    [sfx]
  );
  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  // Configs (claros y compactos)
  const configCarousel = {
    style: {},
    portrait: { x: 50, y: 57, width: 55, height: 49.4, anchor: "middle", fontSize: 4 },
    landscape: { x: 10, y: 50, width: 30, height: 83, anchor: "left", fontSize: 2 },
  };

  const configWall = {
    style: { background: backgroundColor },
    portrait: { hidden: true },
    landscape: { x: 50, y: 50, width: 100, height: 100, anchor: "left" },
  };

  const configLogo = {
    backgroundImage: logo,
    style: { backgroundSize: "95%" },
    portrait: { x: 50, y: 4, width: 32, height: 11, anchor: "top" },
    landscape: { x: 73, y: 19, width: 20, height: 21, anchor: "middle" },
  };

  const configTitle = {
    style: { color: "white", fontWeight: "bold", flexDirection: "column" },
    portrait: { x: 50, y: 21.5, width: 90, height: 0, anchor: "middle", fontSize: 6 },
    landscape: { x: 73, y: 55, width: 40, height: 50, anchor: "middle", fontSize: 3 },
  };

  const configCta = {
    onPressStart: () => useRedirectMIPEvent(mraid),
    style: {
      borderRadius: "15px",
      backgroundColor: ctaColor,
      fontWeight: "bold",
      color: ctaTextColor,
      zIndex: 50,
    },
    portrait: { x: 50, y: 96, width: 42, height: 6, anchor: "bottom", fontSize: 5, animate: PENDULE },
    landscape: { x: 73, y: 86.4, width: 27, height: 11, anchor: "middle", fontSize: 3, animate: PENDULE },
    loop: true,
    controlsAnimate: "play",
  };

  const configLoading = {
    style: { backgroundColor, fontWeight: "bold", pointerEvents: "none" },
    portrait: { x: 50, y: 55, width: 110, height: 60, anchor: "middle", animate: ANIMATE_LOADING },
    landscape: { x: 73, y: 86.4, width: 27, height: 11, anchor: "middle", animate: ANIMATE_LOADING },
    loop: false,
    controlsAnimate: "play",
  };

  return (
    <>
      <Card {...configCarousel} onPressStart={() => setController("stop")}>
        <CarouselMip
          style={{ fontFamily: "novel" }}
          scaleMode="sides"
          sidesScale={0.56}
          onIndexChange={onIndexChange}
          slides={slides}
          slideWidthPct={1}
          gapPx={400}
          sideOuterGapPx={0}
          nudgeOnStart
          nudgeDelayMs={600}
          nudgeDuration={0.5}
          nudgePauseMs={1000}
          stopNudgeOnInteract
          resumeNudgeAfterMs={3000000}
          nudgeMode="left"
          nudgeLeftPx={60}
        />
      </Card>

      <Card {...configWall} />
      <Card {...configLogo} />
      <Card {...configTitle}>{`“${title}”`}</Card>

      {/* Hand no debe bloquear clics del CTA */}
      <span style={HAND_WRAPPER_STYLE}>
        <Hand controller={controller} />
      </span>

      <Card {...configCta}>{ctaText}</Card>
      <Card {...configLoading} />
    </>
  );
}

export default memo(Video);
