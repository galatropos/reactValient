declare const mraid: any;

export const registerOpenOnClick = (url) => {
    const handleClick = () => {
      if (typeof mraid !== "undefined" && typeof mraid.open === "function") {
        mraid.open();
      }
      console.log("mraid");
      window.open(url, "_blank");
    };
  
    window.addEventListener("click", handleClick);
  
    // función de limpieza
    return () => {
      window.removeEventListener("click", handleClick);
    };
  };
  