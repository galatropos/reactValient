// decode.mjs (sin temporales, con inferencia de nombre/ext por contexto)
// Uso:
//   node decode.mjs                 # procesa todos los .html/.htm de ./input → ./output
//   node decode.mjs input output    # rutas personalizadas
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

// ---- base122 -> Uint8Array ----
function _base122ToArrayBuffer(s) {
  const ESC = [0, 10, 13, 34, 38, 92];
  const outCap = (1.75 * s.length) | 0;
  const out = new Uint8Array(outCap);
  let e = 0, r = 0, n = 0;
  function push7(v) {
    v <<= 1;
    e |= v >>> r;
    r += 7;
    if (r >= 8) {
      out[n++] = e & 255;
      r -= 8;
      e = (v << (7 - r)) & 255;
    }
  }
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    if (ch > 127) {
      const idx = (ch >>> 8) & 7;
      if (idx !== 7) push7(ESC[idx]);
      push7(ch & 127);
    } else {
      push7(ch);
    }
  }
  return new Uint8Array(out.buffer, 0, n);
}

// ---- base64 -> Uint8Array ----
function _base64ToArrayBuffer(str) {
  const buf = Buffer.from(str, "base64");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}

// ---- Unescape de string JS sin eval ----
function unescapeJsString(quote, s) {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch !== "\\") { out += ch; continue; }
    if (i + 1 >= s.length) { out += "\\"; break; }
    const n = s[++i];
    switch (n) {
      case "n": out += "\n"; break;
      case "r": out += "\r"; break;
      case "t": out += "\t"; break;
      case "b": out += "\b"; break;
      case "f": out += "\f"; break;
      case "v": out += "\v"; break;
      case "\\": out += "\\"; break;
      case "'": out += "'"; break;
      case '"': out += '"'; break;
      case "x": {
        const h1 = s[i+1], h2 = s[i+2];
        if (h1 && h2 && /[0-9A-Fa-f]/.test(h1) && /[0-9A-Fa-f]/.test(h2)) {
          out += String.fromCharCode(parseInt(h1 + h2, 16));
          i += 2;
        } else {
          out += "x";
        }
        break;
      }
      case "u": {
        if (s[i+1] === "{") {
          let j = i + 2, hex = "";
          while (j < s.length && s[j] !== "}") { hex += s[j++]; }
          if (j < s.length && hex.length) {
            const cp = parseInt(hex, 16);
            if (!Number.isNaN(cp)) out += String.fromCodePoint(cp);
            i = j;
          } else {
            out += "u";
          }
        } else {
          const h = s.substr(i+1, 4);
          if (/^[0-9A-Fa-f]{4}$/.test(h)) {
            out += String.fromCharCode(parseInt(h, 16));
            i += 4;
          } else {
            out += "u";
          }
        }
        break;
      }
      case "\n": break; // line continuation
      default: out += n;
    }
  }
  return out;
}

// ---- Utilidades de lectura ----
function readJsStringAt(html, i) {
  const q = html[i];
  if (q !== '"' && q !== "'") return { text: null, next: i };
  i++;
  let buf = "", escaped = false;
  while (i < html.length) {
    const ch = html[i++];
    if (escaped) { buf += "\\" + ch; escaped = false; }
    else if (ch === "\\") { escaped = true; }
    else if (ch === q) { break; }
    else { buf += ch; }
  }
  return { text: unescapeJsString(q, buf), next: i };
}

function skipSpaces(html, i) { while (i < html.length && /\s/.test(html[i])) i++; return i; }

// ---- Buscar una ruta con extensión (p.ej. "assets/.../file.mp3") después de una llamada ----
function findFollowingPath(html, startIdx, maxLookahead = 1500) {
  const end = Math.min(html.length, startIdx + maxLookahead);
  let i = startIdx;
  while (i < end) {
    const ch = html[i];
    if (ch === '"' || ch === "'") {
      const { text, next } = readJsStringAt(html, i);
      i = next;
      if (text && /[\/\\].+\.[A-Za-z0-9]+$/.test(text)) {
        // Parece una ruta con extensión
        return text;
      }
      continue;
    }
    i++;
  }
  return null;
}

// ---- Parser para: decompressArrayBuffer("...", true/false) y decompressString("...", true/false) ----
function* findAssets(html) {
  const targets = ["decompressArrayBuffer", "decompressString"];
  let count = 0;
  for (const target of targets) {
    let i = 0;
    while (true) {
      const p = html.indexOf(target, i);
      if (p === -1) break;
      i = p + target.length;
      i = skipSpaces(html, i);
      if (html[i] !== "(") continue;
      i++; // after '('
      i = skipSpaces(html, i);

      // 1ª arg: string
      if (html[i] !== '"' && html[i] !== "'") continue;
      const s1 = readJsStringAt(html, i);
      if (!s1.text) continue;
      i = s1.next;

      // espacio, coma, espacio
      i = skipSpaces(html, i);
      if (html[i] !== ",") continue;
      i++;
      i = skipSpaces(html, i);

      // 2ª arg: true/false
      let isBase122 = null;
      if (html.startsWith("true", i)) { isBase122 = true; i += 4; }
      else if (html.startsWith("false", i)) { isBase122 = false; i += 5; }
      else { continue; }

      // Intentar encontrar una ruta con extensión poco después
      const hintedPath = findFollowingPath(html, i);

      yield { content: s1.text, isBase122, index: ++count, hintedPath };
    }
  }
}

function decodeOne(content, isBase122) {
  const bytes = isBase122 ? _base122ToArrayBuffer(content) : _base64ToArrayBuffer(content);
  return Buffer.from(zlib.brotliDecompressSync(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength)));
}

function listHtmlFiles(inputPath) {
  const stat = fs.statSync(inputPath);
  if (stat.isDirectory()) {
    return fs.readdirSync(inputPath)
      .filter(name => /\.html?$/i.test(name))
      .map(name => path.join(inputPath, name));
  } else {
    return [inputPath];
  }
}

async function processOneFile(filePath, outRoot) {
  const baseName = path.basename(filePath).replace(/\.[^.]+$/, "");
  const outDir = path.join(outRoot, baseName);
  ensureDir(outDir);

  let found = 0;
  for (const { content, isBase122, index, hintedPath } of findAssets(fs.readFileSync(filePath, "utf8"))) {
    found++;
    try {
      const dec = decodeOne(content, isBase122);
      const base = hintedPath
        ? path.basename(hintedPath)
        : `asset-${String(index).padStart(4, "0")}.bin`;
      const outPath = path.join(outDir, base);
      fs.writeFileSync(outPath, dec);
      console.log(`[${baseName}] OK (${isBase122 ? "b122" : "b64"}) #${index} → ${outPath} (${dec.length} bytes)` + (hintedPath ? `  [from: ${hintedPath}]` : ""));
    } catch (e) {
      console.error(`[${baseName}] Fallo #${index} (${isBase122 ? "b122" : "b64"}):`, e && e.message);
    }
  }
  if (!found) {
    console.warn(`[${baseName}] No se encontraron llamadas a decompressArrayBuffer/String("...", true|false).`);
  } else {
    console.log(`[${baseName}] Listo. Procesados ${found} asset(s).`);
  }
}

async function main() {
  const [,, inputPath="input", outRoot="output"] = process.argv;
  ensureDir(outRoot);
  const files = listHtmlFiles(inputPath);
  if (!files.length) {
    console.error("No se encontraron archivos .html/.htm en:", inputPath);
    process.exit(1);
  }
  for (const file of files) {
    await processOneFile(file, outRoot);
  }
  console.log("\nProceso terminado. Nombres inferidos cuando fue posible.");
}

main().catch(err => { console.error(err); process.exit(1); });
