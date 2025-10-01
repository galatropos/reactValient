import React from 'react'
import Card from '../../../../../src/component/Card'
const animate=[
    [{ y: 0 }, 120],
    [{ y: -4 }, 1700],
    [{ y: 0 }, 120],
    [{ y: 4 }, 1700],
]
const Result = () => {
    const result = {
        style: {
            backgroundColor: "#B6B6B6",
            transformOrigin: "center",
            flexDirection: "column",
            gap: 11,
            color: "black",
            borderRadius: "39px",
        },
        portrait: {
            fontSize: 4.5,
            height: 43,
            width: 32,
            anchor: "left-top",
            x: 55,
            y: 32,
            rotate: 0,
            opacity: 1,
            animate,
            scale: 1,
        },
        landscape: {
            fontSize: 3,
            height: 95,
            width: 20,
            anchor: "right",
            scale: 0.8,
            opacity: 1,
            animate,
            x: 50,
            y: 50,
        },
        controlsAnimate: "play",
        loop: true,
    }
    const styleResult={
        border: "6px solid white",
        borderRadius: "33px",
        padding: "1px",
        fontWeight: "700",
        width: "180px",
        fontSize: 65,
    }
    const button={
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "500",
        backgroundColor: "#DF6A73",
        borderRadius: "20px",
        width: "210px",
        height: "100px",
        fontSize: "28px",
        marginBottom: "20px",
        marginTop: "16px",
    }
    const unidades = {
        fontSize: 30,
        fontWeight: "500",
    }
    const title={
        fontSize: 50,
        fontWeight: "400",
    }
  return (
    <Card {...result}>
        <span style={title}>Altura</span>
        <span style={styleResult}>6`2``</span>
        <span style={title}>Peso</span>
        <span style={styleResult}>212<span style={unidades}>lbs</span></span>
        <span style={title}>Años</span>
        <span style={styleResult}>47</span>
        <span className="flash-button" style={button}>MOSTRAR RESULTADOS</span>
    </Card>
  )
}

export default Result