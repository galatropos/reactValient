import React, { useMemo, useRef, useCallback } from "react";
import Card from "../../../../../../src/component/Card";
import AutoScrollBox from "../../../../../../src/component/AutoScrollBox";
import VideoToFramesPlayer from "../../../../../../src/component/VideoToFramesPlayer";
import animatePendule from "../../../../../../src/utils/animate/animatePendule";
import { useRedirectMIPEvent } from "../../../../../../src/hook/useRedirectMIP";

const Block2 = ({ children, ctaColor, ctaText, video, finish = true, logo, mraid,backgroundColor,title }) => {
  const configLogo = {
    style: {
      backgroundImage: `url(${logo})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    },
    portrait: { x: 50, y: 4.4, width: 40, height: 9, anchor: "top" },
    landscape: { x: 72.5, y: 6, width: 20, height: 13, anchor: "top", rotate: 0, scale: 1 },
  };



  // ✅ 1) animación estable (no re-crear en cada render)
  const pendule = useMemo(() => animatePendule({ ampX: 0, emitX: false }), []);

  // ✅ 2) handler con gate + stopPropagation (sin cambiar lógica)
  const firedRef = useRef(false);
  const handleCtaStart = useCallback((e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (firedRef.current) return;
    firedRef.current = true;
    useRedirectMIPEvent(mraid);
    // liberar gate al siguiente micro-turno
    queueMicrotask
      ? queueMicrotask(() => { firedRef.current = false; })
      : setTimeout(() => { firedRef.current = false; }, 0);
  }, [mraid]);

  const configCta = {
    onPressStart: handleCtaStart, // ⬅️ antes llamaba directo a useRedirectMIPEvent(mraid)
    style: {
      background: ctaColor,
      color: "white",
      fontWeight: "700",
      borderRadius: "15px",
    },
    portrait: {
      width: 43, height: 6,  fontSize: 5, animate: pendule, 
      x: 50,
      y: 91.5,
      anchor: "middle",
      scale: 1,
      hidden: !finish,
    },
    landscape: {
      x: 72.5,
      y: 93.5,
      width: 25,
      height: 10,
      anchor: "bottom",
      fontSize: 2.5,
      animate: pendule,     // ⬅️ usar la secuencia memoizada
      hidden: !finish,
    },
    loop: true,
    controlsAnimate: "play",
  };

  const configContent = {
    style: {
      fontFamily: "novel",
      color: backgroundColor,
      flexDirection: "column",
      borderRadius:"40px",
    },
    portrait: { x: 50, y: 57, width: 65, height: 55, anchor: "middle", scale: 1, fontSize: 4 },
    landscape: { x: 30, y: 50, width: 30, height: 82, anchor: "middle", scale: 1, fontSize: 3 },
  };
  const configTitle={
    style:{
      color:"white",
      fontWeight:"bold",
      flexDirection:"column",
      borderRadius:"30px",      
    },
    portrait:{
      x:50,
      y:20,
      width:90,
      height:12,
      hidden: !finish,
      anchor:"middle",
      fontSize:7,
    },
    landscape:{
      x:72,
      y:50,
      fontSize:4,
      width:45,
      height:20,
      hidden: !finish,
      anchor:"middle",
    }
  }


  return (
    <>
      <Card {...configLogo} />
      <Card {...configCta}>{ctaText}</Card>
      <Card {...configTitle}>{title}</Card>

      {video ? (
        <VideoToFramesPlayer
          {...configContent}
          portraitSrc={video.srcPortrait}
          landscapeSrc={video.srcLandscape}
          muted={!finish}
          reset={finish}
          autoPlay={true}
          loop={true}
        />
      ) : (
        <Card {...configContent}>
          <AutoScrollBox
            height="100vh"
            speed={50}
            loop={true}
            pauseOnHover
            controlsMode={"hidden"}
            style={{color:"white"}}
            fitParent
          >
            {children}
          </AutoScrollBox>
        </Card>
      )}
    </>
  );
};

export default Block2;
