const fs = require('fs');

const html = fs.readFileSync('sip6.html', 'utf8');

// 1) Algunas builds guardan el video como 'video: "___base122___...."'
//    Otras lo incluyen en variables grandes (p.ej. nose2) y lo inflan via Brotli+JS.
//    Primero intentamos un campo explícito tipo ___base122___:
const m = html.match(/video\s*:\s*"(?:___base122___)([^"]+)"/);
if (m) {
  // Si hay “base122”, decodifícalo con el decoder que viene en el mismo bundle.
  // Aquí implementamos un decoder mínimo compatible con el esquema típico base122:
  function decodeBase122(str) {
    // Implementación mínima (algunas variantes cambian reglas; si falla,
    // es mejor usar la opción A del navegador para capturar el blob ya decodificado).
    // Esta versión interpreta bytes < 122 directamente y usa 122..127 como escapes.
    const out = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (c < 122) {
        out.push(c);
      } else {
        // Escape: siguiente char aporta 7 bits
        const nxt = str.charCodeAt(++i);
        out.push(((c - 122) << 7) | (nxt & 0x7F));
      }
    }
    return Buffer.from(out);
  }

  const data = decodeBase122(m[1]);
  // Intenta detectar extensión:
  let ext = 'bin';
  if (data[0] === 0x1A && data[1] === 0x45 && data[2] === 0xDF && data[3] === 0xA3) ext = 'webm';
  if (data[4] === 0x66 && data[5] === 0x74 && data[6] === 0x79 && data[7] === 0x70) ext = 'mp4';

  fs.writeFileSync(`video.${ext}`, data);
  console.log('Escrito video.' + ext);
  process.exit(0);
}

// 2) Si no hubo campo 'video: "___base122___..."', la página puede inflar un gran string
//    (como la constante "nose2") con Brotli y luego construir el Blob en runtime.
//    En ese caso, la forma robusta es usar un navegador headless y capturar el blob:
console.error('No encontré "video: \\"___base122___" en el HTML. Usa la Opción A (navegador) o un script con Puppeteer para interceptar el blob.');
process.exit(1);
