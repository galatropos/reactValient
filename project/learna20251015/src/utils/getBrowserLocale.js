// getBrowserLocale.js
export function getBrowserLocale() {
    if (typeof navigator === "undefined") return null;
    // Ej.: ["es-MX","es","en-US","en"]
    const list = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language].filter(Boolean);
  
    // Normaliza a minúsculas/guiones
    return list.map(l => String(l).replace("_","-")).filter(Boolean);
  }
  