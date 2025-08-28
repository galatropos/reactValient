import { useState } from "react";
import Card from "../../src/component/Card";
function Index() {
  const [action, setAction] = useState("");


  return (
    <div> 
      <button onClick={()=>setAction("pause")}>pausar</button><br/><br/><br/>
      <button onClick={()=>setAction("play")}>play</button><br/><br/><br/><br/>
      <button onClick={()=>setAction("stop")}>stop</button><br/><br/><br/><br/>
      <Card
      style={{
        border: "1px solid black", 


      }}
        landscape={{ 
          width: 30,
          height: 30,
          x: 600,
          y: 0,
          anchor: "left-top",
          fontSize: 2.1,
        }}
        portrait={{
          width: 10,
          height: 10,
          x: 10,
          y: 0,
          anchor: "left-top",
          fontSize: 2.1,
          opacity:1,
          scale:1,
          animate: [
            [{ opacity:-1,x:0,  y:20, rotate:90,scale:0.5}, 1000] ,
            [{ opacity:1, x:20, y:0,  rotate:90,scale:-0.5}, 1000] ,
            [{ opacity:-1,x:0,  y:-20, rotate:90,scale:0.5}, 1000] ,
            [{ opacity:1, x:-20,y:0,  rotate:90,scale:-0.5}, 1000] ,
          ],
        }}
        controlsAnimate={action}
        loop={true}
      >
        hola
      </Card>

    </div>
  );
}

export default Index;
