import Card from "../../src/component/Card";
import Loading from "../../src/component/Loading";
import TheClassic01 from "../../src/component/loading/theClassic/TheClassic01";

function Index() {
  
  
  const styleCard = {
    border: "1px solid blue",
    fontSize: "50px",
  };


  return (
  <TheClassic01 >


    <Card
    portrait={{ width: 50, height: 50, x: 0, y: 0,anchor:"middle" }}
    landscape={{ width: 100, height: 100, x: 20, y: 10 }}
    style={styleCard}
    >
    hola
  </Card>    
    </TheClassic01>

    
  )
}

export default Index;