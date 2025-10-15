declare const mraid: any;

export const registerOpenOnClick = (url) => {
  const handleClick = () => {
    if (typeof mraid !== "undefined" && typeof mraid.open === "function") {
      mraid.open(url || ""); // si quieres pasarle url aunque esté vacío
      console.log("mraid");
    }

    // solo abre ventana si hay url no vacío
    if (url && url.trim() !== "") {
//      window.open(url, "_blank");
    }
  };

  window.addEventListener("click", handleClick);

  // función de limpieza
  return () => {
    window.removeEventListener("click", handleClick);
  };
};
