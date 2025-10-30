import Project from "../project/inkitt20251024/Index";
import ScaledContainer from "./component/container";
import  ElementProvider from "./context/ContextElement";



function App() {




  return (
    <ElementProvider>
      <ScaledContainer>
        <Project />
      </ScaledContainer>
    </ElementProvider>
  );
}

export default App;

/*
left-top
top
right-top
right
right-bottom
bottom
left-bottom
left
middle
*/
