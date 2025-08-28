import Card from "../../src/component/Card";
import VideoToFramesPlayer from "../../src/component/VideoToFramesPlayer";
import portrait from "./assets/video/GAME_sip_CONCEPT_03_en_play_768x1024.mp4";
import landscape from "./assets/video/GAME_sip_CONCEPT_03_en_play_1024x768.mp4";
function Index() {
  document.body.style.backgroundColor = "black";

const cardVideo={
  style: {
    backgroundColor: "black",
  },
  landscape: {
    height: 100,
    width: 100,
    fontSize: 3.5,
    anchor: "middle",
    x: 50,
    y: 50,
  },
  portrait: {
    height: 100,
    width: 100,
    fontSize: 6,
    anchor: "middle",
    x: 50,
    y: 49.3,
  },
}
  return (
    <>
    <Card {...cardVideo}>
    <VideoToFramesPlayer
landscape={landscape}
portrait={portrait}
    fps={24}                   // Ajusta el muestreo
    loop={true}               // true si quieres que repita
    
    repeat=
    {
      [
        [6100,5000,300],
      ]
    }
    />
    </Card>
    </>
  )
}

export default Index;