import { useEffect, useState } from "react";
import Card from "../../src/component/Card";
import ExamplePopSlotMachine from "./src/component/pop/ExamplePopSlotMachine";
import ExamplePopWave from "./src/component/pop/ExamplePopWave";
import ExamplePopDefault from "./src/component/pop/ExamplePopDefault";
import ExamplePopTicker from "./src/component/pop/ExamplePopTicker";
import ExampleCarouselDefault from "./src/component/carousel/ExampleCarouselDefault";


const pop = [
  { name: "pop-PopDefault", element: <ExamplePopDefault /> },
  { name: "Ticker-PopTicker", element: <ExamplePopTicker /> },
  { name: "Slot Machine-PopSlotMachine", element: <ExamplePopSlotMachine /> },
  { name: "Wave-PopWave", element: <ExamplePopWave /> },
  { name: "2", element: "2" },
  { name: "3", element: "3" },
];
const carousel = [
  { name: "carousel-CarouselDefault", element: <ExampleCarouselDefault /> },
  { name: "2", element: "2" },
  { name: "3", element: "3" },
];
const listArray = {
pop,
carousel  
};




function Index() {
  const [menuHidden, setMenuHidden] = useState(true);
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectEffect, setSelectEffect] = useState(null);
  const [list,setList] = useState([]);

  const selectMenu=(type)=>{
    setMenuHidden(e=>!e)
    if(type==="category"){
      setList(Object.keys(listArray).map((name)=>({name,type:"category"})))
    }
    if(type==="effect"){
      setList(listArray[selectCategory].map(({name})=>({name,type:"effect"})))
    }
  }
  
  const selectLi=({name,type,index})=>{
    if(type==="category"){
      setSelectCategory(name)
      setSelectEffect(null)
    }
    else if(type==="effect")

      setSelectEffect(listArray[selectCategory][index])
    setMenuHidden(true)


  }
  
  

  const menu = {
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
      hidden:menuHidden
    },
  };
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
      hidden:!selectCategory
    },
    onClick:()=>selectMenu("effect") 
  };

  const buttonCategory = {
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
    onClick:()=>selectMenu("category") 
  };
  return (
    <>
      <Card {...buttonCategory}>{selectCategory||'Seleccione una categoría'}</Card>
      <Card {...buttonEffect}>{selectEffect?.name||'Seleccione un efecto'}</Card>

      <Card {...menu}>
        <ul>
          {list.map((item, index) => (
            <li key={index} onClick={() =>( selectLi({...item,index}))}>
              {item.name}
            </li>
          ))}
        </ul>
      </Card>


      {selectEffect?.element}
    </>
  );
}

export default Index;
