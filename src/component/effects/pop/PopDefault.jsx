import React, { useEffect, useState } from 'react'
import Card from '../../Card'

const PopDefault = ({elements=[],intervalChange=2000,portrait,landscape,style}) => {
    const [index, setIndex] = useState(0)
  const [element, setElement] = useState(elements[0])
    useEffect(() => {
          // Creamos el intervalo
          const id = setInterval(() => {
        setIndex((c) => (c + 1) % elements.length);
          }, intervalChange);
      
          // Limpieza: cuando el componente se desmonta, eliminamos el intervalo
          return () => clearInterval(id);
        }, []); // [] asegura que solo se cree una vez

        useEffect(() => {
          // Cuando el index cambia, actualizamos la rotación
          setElement(elements[index])
        }, [index]);
  return (
    <Card children={elements[index]} portrait={portrait} landscape={landscape} style={style}>

      {element}
    </Card>
  )
}

export default PopDefault