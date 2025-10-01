import ScaledContainer from "./component/container";
import Project from "../project/fabu20250930/Index";
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
