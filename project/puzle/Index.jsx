import Card from "../../src/component/Card";
import Guide from "../../src/component/Guide";
import StartLine from "../../src/component/Line";
import TestAnimate from "./src/component/TextAnimate";

function Index() {
  const styleCard = {
    border: "1px solid blue",
  };
  return (
    <>
    <TestAnimate />
    <StartLine />
    {

      //<Guide  id={"hand"} />
    }
      <Card
      id={"hola"}
        style={styleCard}
        landscape={{
          width: 20,
          height: 50,
          x: 30,
          y: 30,
          anchor: "left-top",
          fontSize: 2.1,
        }}
        portrait={{
          width: 50,
          height: 25,
          x: 0,
          y: 100,
          anchor: "left-top",
        }}
      >
        "Hol"
      </Card>

      <Card
        style={styleCard}
        landscape={{
          width: 20,
          height: 20,
          x: 0,
          y: 0,
          anchor: "left-top",
          fontSize: 2.1,
        }}
        portrait={{
          width: 50,
          height: 25,
          x: 0,
          y: 100,
          anchor: "left-top",
        }}
        id={"a"}
      >
        a
      </Card>

      <Card
        style={styleCard}
        landscape={{
          width: 20,
          height: 20,
          x: 60,
          y: 10,
          anchor: "left-top",
          fontSize: 2.1,
        }}
        portrait={{
          width: 20,
          height: 20,
          x: 90,
          y: 10,
          anchor: "left-top",
        }}
        id={"b"}

      >
       b
      </Card>


      <Card
        style={styleCard}
        landscape={{
          width: 10,
          height: 42,
          x: 50,
          y: 75,
          anchor: "left-top",
          fontSize: 2.1,
        }}
        portrait={{
          width: 50,
          height: 25,
          x: 0,
          y: 100,
          anchor: "left-top",
        }}
        id={"c"}

      >
        c
      </Card>


      <Card
        style={styleCard}
        landscape={{
          width: 10,
          height: 42,
          x: 10,
          y: 75,
          anchor: "left-top",
          fontSize: 2.1,
        }}
        portrait={{
          width: 50,
          height: 25,
          x: 0,
          y: 100,
          anchor: "left-top",
        }}
        id={"d"}

      >
        d
      </Card>
    </>
  );
}

export default Index;
