// installPoppins.js
let installed = false;
let styleEl = null;
let cleanupPreloads = [];

// IMPORTS: MISMO DIRECTORIO QUE ESTE ARCHIVO
//import Thin from "./Poppins-Thin.ttf";
//import ThinItalic from "./Poppins-ThinItalic.ttf";
//import ExtraLight from "./Poppins-ExtraLight.ttf";
//import ExtraLightItalic from "./Poppins-ExtraLightItalic.ttf";
//import Light from "./Poppins-Light.ttf";
//import LightItalic from "./Poppins-LightItalic.ttf";
//import Regular from "./Poppins-Regular.ttf";
//import Italic from "./Poppins-Italic.ttf";
import Medium from "./Poppins-Medium.ttf";
//import MediumItalic from "./Poppins-MediumItalic.ttf";
//import SemiBold from "./Poppins-SemiBold.ttf";
//import SemiBoldItalic from "./Poppins-SemiBoldItalic.ttf";
import Bold from "./Poppins-Bold.ttf";
//import BoldItalic from "./Poppins-BoldItalic.ttf";
import ExtraBold from "./Poppins-ExtraBold.ttf";
//import ExtraBoldItalic from "./Poppins-ExtraBoldItalic.ttf";
//import Black from "./Poppins-Black.ttf";
//import BlackItalic from "./Poppins-BlackItalic.ttf";

/**
 * Inyecta @font-face de Poppins (100..900, normal/italic) y fuerza su uso.
 * Usa opciones por defecto: { global: true, waitLoad: true, family: "Poppins" }.
 */
export default function installPoppins(opts = {}) {
  if (installed) return;
  if (typeof document === "undefined") return; // evita SSR sin DOM
  installed = true;

  const family = opts.family || "Poppins";
  const global = opts.global !== false;     // default true
  const waitLoad = opts.waitLoad !== false; // default true

  // 1) Preload para minimizar FOUT
  const preloadUrls = [
//    Thin, ThinItalic,
 //   ExtraLight, ExtraLightItalic,
   // Light, LightItalic,
 //   Regular, Italic,
   // Medium, MediumItalic,
  //  SemiBold, SemiBoldItalic,
  //  Bold, BoldItalic,
  //  ExtraBold, ExtraBoldItalic,
  //  Black, BlackItalic,
  ];

  cleanupPreloads = preloadUrls.map((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.href = url;
    link.type = "font/ttf";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
    return () => link.parentNode && link.parentNode.removeChild(link);
  });

  // 2) @font-face (todos los pesos/estilos)
  const faces = [
 //   { w: 100, s: "normal", url: Thin },
   // { w: 100, s: "italic", url: ThinItalic },
  //  { w: 200, s: "normal", url: ExtraLight },
   // { w: 200, s: "italic", url: ExtraLightItalic },
  //  { w: 300, s: "normal", url: Light },
    //{ w: 300, s: "italic", url: LightItalic },
    //{ w: 400, s: "normal", url: Regular },
   // { w: 400, s: "italic", url: Italic },
    { w: 500, s: "normal", url: Medium },
    //{ w: 500, s: "italic", url: MediumItalic },
  //  { w: 600, s: "normal", url: SemiBold },
    //{ w: 600, s: "italic", url: SemiBoldItalic },
    { w: 700, s: "normal", url: Bold },
 //   { w: 700, s: "italic", url: BoldItalic },
    { w: 800, s: "normal", url: ExtraBold },
 //   { w: 800, s: "italic", url: ExtraBoldItalic },
   // { w: 900, s: "normal", url: Black },
    //{ w: 900, s: "italic", url: BlackItalic },
  ];

  const fontFacesCss = faces.map(
    f => `
@font-face{
  font-family:"${family}";
  src:url("${f.url}") format("truetype");
  font-weight:${f.w};
  font-style:${f.s};
  font-display:swap;
}
`.trim()
  ).join("\n");

  const baseVarCss = `
:root{ --font-sans: "${family}", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
`.trim();

  // Forzado global con !important
  const applyGlobalCss = `
html,body,*{ font-family: var(--font-sans) !important; }
`.trim();

  // Clase que activamos cuando las fuentes ya están cargadas
  const loadedClassCss = `
html.fonts-poppins-loaded, html.fonts-poppins-loaded body, html.fonts-poppins-loaded *{
  font-family: var(--font-sans) !important;
}
`.trim();

  const css = `${fontFacesCss}\n${baseVarCss}\n${applyGlobalCss}\n${waitLoad ? loadedClassCss : ""}`;

  styleEl = document.createElement("style");
  styleEl.id = "poppins-fonts-style";
  styleEl.type = "text/css";
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  // 3) Marca cuando realmente cargó (FontFaceSet)
  if (waitLoad && document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load(`1em "${family}"`, " "),
      document.fonts.load(`700 1em "${family}"`, " "),
      document.fonts.load(`300 1em "${family}"`, " "),
    ]).then(() => {
      document.documentElement.classList.add("fonts-poppins-loaded");
    }).catch(() => {
      document.documentElement.classList.add("fonts-poppins-loaded");
    });
  } else {
    document.documentElement.classList.add("fonts-poppins-loaded");
  }
}

/** Desinstalar (opcional) */
export function uninstallPoppins() {
  installed = false;
  if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
  styleEl = null;
  cleanupPreloads.forEach((fn) => fn && fn());
  cleanupPreloads = [];
}

// ⚡ Auto-instalación directa con { global:true, waitLoad:true }
if (typeof window !== "undefined") {
  try {
    installPoppins({ global: true, waitLoad: true });
  } catch (e) {
    console.error("[installPoppins] no se pudo instalar:", e);
  }
}
