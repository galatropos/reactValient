import React, { useRef, useEffect, useState } from 'react'
import money1 from '../../assets/video/money1.webm'
import money2 from '../../assets/video/money2.webm'
import money3 from '../../assets/video/money1.webm'
import money4 from '../../assets/video/money2.webm'
import VideoToFramesPlayer from '../../../../src/component/VideoToFramesPlayer'

const tools= {}

const Sip = ({
  position = "true",
  x = 50,
  timeStart = 0,           // ms: CUÁNDO se renderiza
  sizePortrait = 100,
  sizeLandscape = 110,
  moneySize=true
}) => {
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(timeStart <= 0)

  // Montar el componente después de `timeStart`
  useEffect(() => {
    if (timeStart > 0) {
      const id = setTimeout(() => setVisible(true), timeStart)
      return () => clearTimeout(id)
    } else {
      setVisible(true)
    }
  }, [timeStart])

  const videoVariables = {
    style: {},
    objectFit:"cover",
    portrait: {
      height: sizePortrait,
      width: sizePortrait,
      anchor: "middle",
      x,
      y: 0,
      animate: [
        [{ y: 110 }, 6000],
        [{ y: 110 }, 0],
      ],
    },
    landscape: {
      height: sizeLandscape,
      width: sizeLandscape,
      anchor: "top",
      x,
      y: 0,
      animate: [
        [{ y: 110 }, 6000],
        [{ y: 0 }, 0],
      ],
    },
    loop: true,    
  }

  // Mientras no llegue el timeStart → no renderizamos nada
  if (!visible) return null
const moneyleft=moneySize?money1:money3
const moneyright=moneySize?money2:money4
  return (
    <VideoToFramesPlayer
      {...videoVariables}
      portraitSrc={position ? moneyleft : moneyright}
      landscapeSrc={position ? moneyleft : moneyright}
      {...tools}
      ref={videoRef}
    />
  )
}

export default Sip
