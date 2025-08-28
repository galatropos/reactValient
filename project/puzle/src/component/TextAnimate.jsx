import React, { useState } from 'react'
import Animation from '../../../../src/component/animate/Animate';
import Card from '../../../../src/component/Card';
import { PopSlotMachine } from '../../../../src/component/effects/pop/PopSlotMachine';

const TestAnimate = () => {
    const [status, setStatus] = useState("stop");
    const [values, setValues] = useState({});

    return (
        <>
        <Card
        landscape={
            {
                width: 20,
                height: 20,
                x: 600,
                y: 0,
                anchor: "left-top",
                fontSize: 2.1,
            }
        }
        >
        <pre>{JSON.stringify(values, null, 2)}</pre>
            

        </Card>

        <Card
        landscape={
{
            width: 20,
            height: 20,
            x: 20,
            y: 0,
            anchor: "left-top",
            fontSize: 2.1,
}    
        }
        >

        <button onClick={() => setStatus("play")}>Play</button>
        <button onClick={() => setStatus("pause")}>Pause</button>
        <button onClick={() => setStatus("stop")}>Stop</button> 
        <Animation
        loop={true}
        sequence={
            [  
                {  time: 500 ,scale:2 }, 
                {  time: 500 ,scale:1 },
                {  time: 100 ,scale:2 }, 
                {  time: 100 ,scale:1 },
                {moveY:100, moveX:100, time:100} 
 
            ]
        }

        status={status}
        onUpdate={(vals) => setValues(vals)} // capturamos los valores actuales
      >

          <div style={{ width: "80px", height: "80px", background: "tomato" }} >
            1
            </div>
        </Animation>
      </Card>
      </>
    
    );
}

export default TestAnimate




