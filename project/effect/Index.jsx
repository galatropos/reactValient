import { PopSlotMachine } from "../../src/component/effects/pop/PopSlotMachine";
import image1 from "./assets/image/1.webp";

function Index() {
const elements=[
  <img src={image1} alt="Pop Slot Machine" />,
]
  
  return (
    <>
    <div>hola</div>
    <PopSlotMachine elements={[elements]}/>
    
    </>
  )
}

export default Index;