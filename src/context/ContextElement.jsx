import { createContext, useContext, useState } from "react";

// 1️⃣ Crear el contexto
const ElementContext = createContext();

// 2️⃣ Hook para usarlo en cualquier componente
export function useElement() {
  return useContext(ElementContext);
}

// 3️⃣ Proveedor
export default function ElementProvider({ children }) {
  const [element, setElement] = useState(null); // o [] si quieres un array
const [hydrate, setHydrate] = useState(0)
  return (
    <ElementContext.Provider value={{ element, setElement,hydrate,setHydrate }}>
      {children}
    </ElementContext.Provider>
  );
}
