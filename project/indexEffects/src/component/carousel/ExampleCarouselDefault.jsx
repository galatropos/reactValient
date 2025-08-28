import React from 'react'
import CarouselDefault from '../../../../../src/component/effects/carousel/CarouselDefault'

const ExampleCarouselDefault = () => {
    const elements = Array.from({ length: 10 }, (_, i) => <div key={i}>{i}</div>);
  return (    <CarouselDefault
    elements={elements}
    start={0}
    end={100}         // tope en x
    itemWidth={10}    // ancho/paso para apilar y avanzar
    stepDuration={800} // cada card avanza +10 en 800ms
    y={50}
    style={{ border: "1px solid black" }}
  />
  )
}

export default ExampleCarouselDefault