import Card from "../../../../src/component/Card";
import CTA from "./sip1/CTA";
import Percen from "./sip1/Percen";
import Background from "./sip1/Background";

/*
LIMITED-TIME OFFER
--------------
----------FANKA------------
40%
----------OFF------------
Selected items
*/
const card1 = {
  style: {},
  portrait: {
    fontSize: 5,
    height: 100,
    width: 100,
    anchor: "middle",
    x: 50,
    y: 10,
  },
  // LANDSCAPE: "LIMITED-TIME OFFER" arriba-izquierda
  landscape: {
    fontSize: 3,
    height: 8,
    width: 50,
    anchor: "right",
    x: 100,
    y: 10,
  },
};

const card3 = {
  style: { fontWeight: "700", gap: 15 },
  portrait: {
    fontSize: 8,
    height: 100,
    width: 100,
    anchor: "middle",
    x: 50,
    y: 32.2,
  },
  // LANDSCAPE: "— OFF —" debajo del 40%
  landscape: {
    fontSize: 8,
    height: 10,
    width: 50,
    anchor: "right",
    x: 100,
    y: 61,
  },
};

const card4 = {
  style: { fontWeight: "600" },
  portrait: {
    fontSize: 4,
    height: 100,
    width: 100,
    anchor: "middle",
    x: 50,
    y: 37,
  },
  // LANDSCAPE: "Selected items"
  landscape: {
    fontSize: 3,
    height: 8,
    width: 50,
    anchor: "right",
    x: 100,
    y: 72,
  },
};

const logo = {
  style: {
    backgroundImage: `url(https://www.fanka.com/cdn/shop/files/2134_x_604_a50a9518-3060-4686-8f8c-3784adfcd732.png?v=1680243132&width=500)`,
    backgroundSize: "auto 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    fontWeight: "600",
  },
  portrait: {
    height: 3,
    width: 100,
    fontSize: 3,
    anchor: "middle",
    x: 50,
    y: 14.5,
  },
  // LANDSCAPE: logo alineado con la columna izquierda
  landscape: {
    height: 8,
    width: 50,
    fontSize: 2,
    anchor: "right",
    x: 100,
    y: 20,
  },
};

const space = (n) =>
  Array.from({ length: n }, (_, i) => <span key={i}>&nbsp;</span>);
const styleguine = { fontSize: 28 };



const Sip1 = () => {

  return (
    <>
      <Background />
      <Card {...logo}>
        <span>
          <span>--------------</span>
          <span>{space(26)}</span>
          <span>--------------</span>
        </span>
      </Card>
      <Card {...card1}>LIMITED-TIME OFFER</Card>
      <Percen />
      <Card {...card3}>
        <span style={styleguine}>--------------</span>
        <span>OFF</span>
        <span style={styleguine}>--------------</span>
      </Card>
      <Card {...card4}>Selected items</Card>
      <CTA />

    </>
  );
};

export default Sip1;
