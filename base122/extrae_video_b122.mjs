// extrae_base122_videos.mjs  (Node >= 18, ESM)
// Busca el primer literal JS que contenga ___base122___, lo extrae con soporte de ' " ` y decodifica base122.
// Escribe video.mp4 / video.webm (o video.bin). Muestra logs mínimos para diagnóstico.

import { readFileSync, writeFileSync } from "fs";

const HTML = process.argv[2] || "sip6.html";
const src = readFileSync(HTML, "utf8");

const MARK = "___base122___";

// 1) Ubicar el marcador
const markPos = src.indexOf(MARK);
if (markPos < 0) {
  console.error("No encontré ___base122___ en el HTML.");
  process.exit(2);
}

// 2) Detectar la comilla de apertura inmediatamente anterior (', ", `)
let qPos = markPos - 1;
while (qPos >= 0 && /\s/.test(src[qPos])) qPos--;
const quote = src[qPos];
if (quote !== "'" && quote !== '"' && quote !== "`") {
  console.error("No hallé comilla de apertura antes del marcador.");
  process.exit(3);
}

// 3) Retroceder hasta esa comilla “real” (por si había espacios)
let start = qPos;

// 4) Avanzar para encontrar la comilla de cierre, respetando escapes
let i = qPos + 1;
let esc = false;
let end = -1;
let hasTemplateInterp = false;

for (; i < src.length; i++) {
  const ch = src[i];
  if (esc) {
    esc = false;
    continue;
  }
  if (ch === "\\") { esc = true; continue; }

  if (quote === "`" && ch === "$" && src[i+1] === "{") {
    hasTemplateInterp = true; // no vamos a evaluar ${...}; abortamos luego
  }

  if (ch === quote) { end = i; break; }
}

if (end < 0) {
  console.error("No encontré la comilla de cierre del literal.");
  process.exit(4);
}

let literal = src.slice(qPos + 1, end);

// 5) Si es template literal y contiene ${...}, no lo evaluamos por seguridad
if (quote === "`" && hasTemplateInterp) {
  console.error("El template literal contiene ${...}. No lo evaluamos. Usa el método del navegador/Puppeteer.");
  process.exit(5);
}

// 6) Desescape manual del literal (sin eval)
function unescapeJs(body, q) {
  // Para backticks permitimos saltos de línea literales; para ' y " también por si acaso.
  // Soportamos escapes comunes: \n \r \t \\ \" \' \` \xHH \uHHHH
  let out = "";
  for (let k = 0; k < body.length; k++) {
    const c = body[k];
    if (c !== "\\") { out += c; continue; }
    k++;
    if (k >= body.length) break;
    const e = body[k];
    if (e === "n")      out += "\n";
    else if (e === "r") out += "\r";
    else if (e === "t") out += "\t";
    else if (e === "\\")out += "\\";
    else if (e === "'") out += "'";
    else if (e === '"') out += '"';
    else if (e === "`") out += "`";
    else if (e === "x") {
      const h = body.slice(k+1, k+3);
      if (/^[0-9a-fA-F]{2}$/.test(h)) { out += String.fromCharCode(parseInt(h,16)); k += 2; }
      else out += "x";
    } else if (e === "u") {
      const h4 = body.slice(k+1, k+5);
      if (/^[0-9a-fA-F]{4}$/.test(h4)) { out += String.fromCharCode(parseInt(h4,16)); k += 4; }
      else out += "u";
    } else {
      // escape desconocido: conservamos el carácter
      out += e;
    }
  }
  return out;
}

const full = unescapeJs(literal, quote);

// 7) Debe empezar con el marcador
if (!full.startsWith(MARK)) {
  console.error("El literal no empieza con ___base122___.");
  process.exit(6);
}
const b122 = full.slice(MARK.length);

// 8) Decoder base122 (variante común). Si tu bundle usa otra, avísame y la adapto.
function decodeBase122(str) {
  const out = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 122) {
      out.push(c);
    } else {
      if (++i >= str.length) throw new Error("truncated_escape");
      const nxt = str.charCodeAt(i);
      out.push(((c - 122) << 7) | (nxt & 0x7f));
    }
  }
  return Uint8Array.from(out);
}

let bytes;
try {
  bytes = decodeBase122(b122);
} catch (e) {
  console.error("Fallo decodeBase122:", e.message);
  process.exit(7);
}

// 9) Detectar tipo por magic bytes y escribir
let ext = "bin";
if (bytes.length > 4 && bytes[0] === 0x1A && bytes[1] === 0x45 && bytes[2] === 0xDF && bytes[3] === 0xA3) ext = "webm";
if (bytes.length > 8 && bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) ext = "mp4";

writeFileSync(`video.${ext}`, Buffer.from(bytes));
console.log(`OK -> video.${ext} (${bytes.length} bytes)`);
