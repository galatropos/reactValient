// dump_video_robusto.mjs  (Node >= 18, ESM)
// Abre un HTML local, captura video como blob o MSE y guarda video.mp4/webm/bin.
// Imprime SOLAMENTE el nombre del archivo creado.

import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { pathToFileURL } from 'url';
import path from 'path';

const file = process.argv[2] || 'sip6.html';
const htmlUrl = pathToFileURL(path.resolve(file)).href;

// Detección de tipo por magic bytes
function guessExt(u8) {
  if (u8.length > 4 && u8[0] === 0x1A && u8[1] === 0x45 && u8[2] === 0xDF && u8[3] === 0xA3) return 'webm';
  if (u8.length > 8 && u8[4] === 0x66 && u8[5] === 0x74 && u8[6] === 0x79 && u8[7] === 0x70) return 'mp4';
  return 'bin';
}

const browser = await puppeteer.launch({
  headless: 'new',
  // flags útiles para file:// y autoplay
  args: [
    '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required',
    '--allow-file-access-from-files',
    '--disable-web-security',
  ],
});
try {
  const page = await browser.newPage();

  // Enganches ANTES de cargar la página
  await page.evaluateOnNewDocument(() => {
    // 1) Capturar blobs de createObjectURL
    const origCreate = URL.createObjectURL;
    window.__allBlobs = [];
    URL.createObjectURL = function (obj) {
      try { if (obj && typeof obj.arrayBuffer === 'function') window.__allBlobs.push(obj); } catch {}
      return origCreate.call(this, obj);
    };

    // 2) Enganche MSE
    window.__mse = { chunks: [], mime: null, haveInit: false };
    const OrigMS = window.MediaSource;
    if (OrigMS && OrigMS.prototype.addSourceBuffer) {
      const origAdd = OrigMS.prototype.addSourceBuffer;
      OrigMS.prototype.addSourceBuffer = function (mime) {
        if (!window.__mse.mime) window.__mse.mime = mime || null;
        const sb = origAdd.call(this, mime);
        const origAppend = sb.appendBuffer;
        sb.appendBuffer = function (buf) {
          try {
            let u8;
            if (buf instanceof ArrayBuffer) u8 = new Uint8Array(buf);
            else if (ArrayBuffer.isView(buf)) u8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
            else return origAppend.call(this, buf);
            // guardar segmento
            window.__mse.chunks.push(Array.from(u8));
          } catch {}
          return origAppend.call(this, buf);
        };
        return sb;
      };
    }
  });

  // Carga del archivo local
  await page.goto(htmlUrl, { waitUntil: 'load', timeout: 120000 });

  // Espera hasta que haya señales de video: <video>, blobs o MSE chunks
  await page.waitForFunction(
    () => {
      const hasVideo = !!document.querySelector('video');
      const hasBlob = Array.isArray(window.__allBlobs) && window.__allBlobs.length > 0;
      const hasMse = window.__mse && Array.isArray(window.__mse.chunks) && window.__mse.chunks.length > 0;
      return hasVideo || hasBlob || hasMse;
    },
    { timeout: 120000 } // 120s
  );

  // Da un poco de tiempo adicional para que lleguen más segmentos MSE
  await page.waitForTimeout(5000);

  // Intenta extraer en este orden: src del <video>, blob capturado, MSE chunks
  const data = await page.evaluate(async () => {
    function guessExt(u8) {
      if (u8.length > 4 && u8[0] === 0x1A && u8[1] === 0x45 && u8[2] === 0xDF && u8[3] === 0xA3) return 'webm';
      if (u8.length > 8 && u8[4] === 0x66 && u8[5] === 0x74 && u8[6] === 0x79 && u8[7] === 0x70) return 'mp4';
      return 'bin';
    }

    // A) src del <video>
    const v = document.querySelector('video');
    if (v && (v.currentSrc || v.src)) {
      try {
        const url = v.currentSrc || v.src;
        const resp = await fetch(url);
        const buf = await resp.arrayBuffer();
        const u8 = new Uint8Array(buf);
        return { ext: guessExt(u8), bytes: Array.from(u8) };
      } catch {}
    }

    // B) Último blob capturado
    if (Array.isArray(window.__allBlobs) && window.__allBlobs.length) {
      const blob = window.__allBlobs[window.__allBlobs.length - 1];
      const buf = await blob.arrayBuffer();
      const u8 = new Uint8Array(buf);
      return { ext: guessExt(u8), bytes: Array.from(u8) };
    }

    // C) Reconstruir a partir de MSE chunks
    if (window.__mse && Array.isArray(window.__mse.chunks) && window.__mse.chunks.length) {
      // Concatenamos todos los segmentos
      const chunks = window.__mse.chunks.map(arr => new Uint8Array(arr));
      let total = 0; for (const c of chunks) total += c.length;
      const out = new Uint8Array(total);
      let off = 0; for (const c of chunks) { out.set(c, off); off += c.length; }
      return { ext: guessExt(out), bytes: Array.from(out) };
    }

    throw new Error('No se pudo capturar datos de video.');
  });

  const outName = `video.${data.ext}`;
  await writeFile(outName, Buffer.from(data.bytes));
  // Solo imprime el nombre del archivo:
  console.log(outName);
} finally {
  await browser.close();
}
