import { useState } from "react";
import Card from "../../src/component/Card";
import ExamplePopSlotMachine from "./src/component/pop/ExamplePopSlotMachine";
import ExamplePopWave from "./src/component/pop/ExamplePopWave";
import ExamplePopDefault from "./src/component/pop/ExamplePopDefault";
import ExamplePopTicker from "./src/component/pop/ExamplePopTicker";
import ExampleCarouselDefault from "./src/component/carousel/ExampleCarouselDefault";

const pop=
[
  {name:"pop-PopDefault",element:<ExamplePopDefault />},
  {name:"Ticker-PopTicker",element:<ExamplePopTicker />},
  {name:"Slot Machine-PopSlotMachine",element:<ExamplePopSlotMachine />},
  {name:"Wave-PopWave",element:<ExamplePopWave />},
  {name:"2",element:"2"},
  {name:"3",element:"3"},
];
const carousel=
[
  {name:"carousel-CarouselDefault",element:<ExampleCarouselDefault />},
  {name:"2",element:"2"},
  {name:"3",element:"3"},
];

function Index() {
const  [hidden, setHidden] = useState(true)
const  [hiddenEffect, setHiddenEffect] = useState(true)
const [select, setSelect] = useState({name:"Selecione una categoría",elements:[]})
const [effect, setEffect] = useState({name:"Categoria no seleccionada",elements:[]})


const menu={

    style: {
      border: "1px solid black",
      overflow: "scroll",
      backgroundColor: "white",
      zIndex: 10,
      },
    landscape: {
      height: 10,
      width: 42,
      fontSize: 3.5,
      anchor: "middle",
      x: 70,
      y: 20,
    },
    portrait: {
      height: 90,
      width: 100,
      fontSize: 6,
      anchor: "left-top",
      x: 0,
      y: 10,
    },
}
const buttonEffect = {
  style: {
    border: "1px solid black",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
    transition: "transform 1s ease", // transición suave de 0.3 segundos
    transformOrigin: "center center", // la escala se hace desde el centro
    fontWeight: "100",
  },
  landscape: {
    height: 12,
    width: 30,
    fontSize: 3,
    anchor: "middle",
    x: 70,
    y: 70,
  },
  portrait: {
    height: 6,
    width: 47,
    fontSize: 4,
    anchor: "right-top",
    x: 98,
    y: 1,
  },
};

const button = {
    style: {
      border: "1px solid black",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "10px",
      transition: "transform 1s ease", // transición suave de 0.3 segundos
      transformOrigin: "center center", // la escala se hace desde el centro
      fontWeight: "100",
    },
    landscape: {
      height: 12,
      width: 30,
      fontSize: 3,
      anchor: "middle",
      x: 70,
      y: 70,
    },
    portrait: {
      height: 6,
      width: 47,
      fontSize: 4,
      anchor: "left-top",
      x: 2,
      y: 1,
    },
  };

const list=
    {

      "Pop":pop,
      "Carousel":carousel,
    };

  return (
<>
  <Card {...button} onClick={()=>
  { 
    console.log(effect)
    if(effect.elements.length){
      
      setHidden(e=>!e)
      setHiddenEffect(true)
    }
    else{
      setHiddenEffect(e=>!e)
      setHidden(true)

    }
  }
  }
    >{select.name}
    </Card>
  <Card {...buttonEffect} onClick={()=>
    {

      setHiddenEffect((e)=>!e)
      setHidden(true)
    }
    }>{effect.name}</Card>

<Card  {...menu} hidden={hidden}>
 <ul>
  {effect.elements.map((item,index)=>(
    <li onClick={()=>
    {
      setSelect({name:item.name,element:item.element})
      setHidden(true)

    }
    } key={index}>
        {item.name||"seleccione un efecto"}
    </li>
  ))
}
 </ul>
</Card>

<Card  {...menu} hidden={hiddenEffect}>
 <ul>
  {Object.keys(list).map((item,index)=>(
    <li onClick={()=>
    {
      setHiddenEffect(true)
      setHidden(false)
      setEffect({name:item,elements:list[item]})
    }
    } key={index}>
        {item||"seleccione un efecto"}
    </li>
  ))}
 </ul>
</Card>
 {select.element}

</>
)
}

export default Index;