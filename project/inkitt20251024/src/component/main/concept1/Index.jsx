import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

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

const SlideImage = ({ image }) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      draggable: "false",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${image})`,
      borderRadius: "50px",
    }}
  />
);

const Video = ({
  backgroundColor = "#000",
  imageCarousel,
  ctaTextColor,
  logo,
  title,
  ctaText,
  ctaColor,
  text = null,
  video = null,
  mraid,
}) => {
  document.body.style.backgroundColor = backgroundColor;

  const orientation = useOrientation();
  const [index, setIndex] = useState(0);
  const [controller, setController] = useState("play");
  const finish = index === imageCarousel.length;

  const sfx = useAudio(audioCarousel);
  const soundtrack = useAudio(audioSountrack);
  useEffect(() => { soundtrack.automatic(); soundtrack.setLoop(true); }, [soundtrack]);
  useEffect(() => { if (!text && finish) soundtrack.stop(); }, [finish, text, soundtrack]);

  // 1) Animación estable (solo rotación para no pisar x base)
  const pendule = useMemo(() => animatePendule({ ampX: 0, emitX: false }), []);

  // 2) slides MEMO → evita recrear array en cada render
  const slides = useMemo(() => {
    const imgs = imageCarousel.map((image) => (
      <SlideImage key={image} image={image} />
    ));
    const tail = text ? (
      <AutoScrollBox
        key="text"
        style={{ color: "white", radius:"20px", width: "100%" }}
        reset={finish}
        speed={60}
        loop
        controlsMode="hidden"
        height={orientation === "portrait" ? "800px" : "745px"}
      >
        {text}
      </AutoScrollBox>
    ) : (
      <span key="video" style={{ display: "flex",  width: "100%", height: "100%" }}>
        <VideoToFramesPlayer
          style={{ objectFit: "cover",borderRadius:"30px",backgroundColor:backgroundColor }}
          portraitSrc={video?.srcPortrait}
          landscapeSrc={video?.srcLandscape}
          muted={!finish}
          pause={finish}
          loop={false}
          autoPlay
          reset={finish}
          noCard
        />
      </span>
    );
    return [...imgs, tail];
  }, [imageCarousel, text, video, finish, orientation]);

  // 3) onIndexChange con rAF (acelera y evita spam de estados)
  const rafRef = useRef(0);
  const onIndexChange = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      sfx.play();
      setIndex(e);
    });
  }, [sfx]);
  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  // 4) Configs MEMO para no reiniciar useProgresses en Card
  const configCarrousel = useMemo(() => ({
    style: {},
    portrait: { x: 50, y: 55, width: 50, height: 50, anchor: "middle", fontSize: 5 },
    landscape: { x: 10, y: 9, width: 30, height: 83, anchor: "left-top", fontSize: 3 },
  }), []);

  const confiWall = useMemo(() => ({
    style: { background: backgroundColor },
    portrait: { hidden: true },
    landscape: { x: 50, y: 50, width: 100, height: 100, anchor: "left" },
  }), []);

  const configLogo = useMemo(() => ({
    backgroundImage: logo,
    style: { backgroundSize: "95%" },
    portrait: { x: 50, y: 4, width: 32, height: 11, anchor: "top" },
    landscape: { x: 70, y: 18.5, width: 20, height: 21, anchor: "middle" },
  }), [logo]);

  const configTitle = useMemo(() => ({
    style: { color: "white", fontWeight: "bold", flexDirection: "column" },
    portrait: { x: 50, y: 21.5, width: 90, height: 0, anchor: "middle", fontSize: 6 },
    landscape: { x: 70.5, y: 51, width: 40, height: 40, anchor: "middle", fontSize: 3 },
  }), []);

  const configCta = useMemo(() => ({
    onPressStart: () => useRedirectMIPEvent(mraid), // mantén tu handler original
    style: { borderRadius:"15px", backgroundColor: ctaColor, fontWeight: "bold", color: ctaTextColor, zIndex: 50 },
    portrait: { x: 50, y: 94, width: 42, height: 6, anchor: "bottom", fontSize: 5, animate: pendule },
    landscape: { x: 70, y: 86, width: 27, height: 11, anchor: "middle", fontSize: 3, animate: pendule },
    loop: true,
    controlsAnimate: "play",
  }), [mraid, ctaColor, ctaTextColor, pendule]);

  // 5) Evita que Hand intercepte eventos (por si tapa al CTA en algún frame)
  const handStyle = useMemo(() => ({ pointerEvents: "none" }), []);

  return (
    <span>
      <Card {...configCarrousel} onPressStart={() => setController("stop")}>
        <CarouselMip
        style={{fontFamily:"novel"}}
          onTapSlide={() => {}}
          scaleMode="sides"
          sidesScale={0.56}
          onIndexChange={onIndexChange}
          slides={slides}
          slideWidthPct={1}
          gapPx={400}
          compensateGap={false}
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

      <Card {...confiWall} />
      <Card {...configLogo} />
      <Card {...configTitle}>{`‘‘${title}’’`}</Card>

      {/* Hand no debe bloquear clics */}
      <span style={handStyle}>
        <Hand controller={controller} />
      </span>

      <Card {...configCta}>{ctaText}</Card>
    </span>
  );
};

export default Video;
