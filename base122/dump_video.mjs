// dump_video.mjs (Node >= 18, ESM)
import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { pathToFileURL } from 'url';
import path from 'path';

const file = process.argv[2] || 'sip6.html';
const htmlUrl = pathToFileURL(path.resolve(file)).href;

function guessExt(u8) {
  if (u8.length > 4 && u8[0] === 0x1A && u8[1] === 0x45 && u8[2] === 0xDF && u8[3] === 0xA3) return 'webm';
  if (u8.length > 8 && u8[4] === 0x66 && u8[5] === 0x74 && u8[6] === 0x79 && u8[7] === 0x70) return 'mp4';
  return 'bin';
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
try {
  const page = await browser.newPage();

  // Hook para capturar blobs creados por la página
  await page.evaluateOnNewDocument(() => {
    const orig = URL.createObjectURL;
    window.__allBlobs = [];
    URL.createObjectURL = function (blob) {
      try { window.__allBlobs.push(blob); } catch {}
      return orig.call(this, blob);
    };
  });

  await page.goto(htmlUrl, { waitUntil: 'load' });

  // Espera a que haya un <video> o al menos algún blob capturado
  await page.waitForFunction(
    () => document.querySelector('video') || (window.__allBlobs && window.__allBlobs.length),
    { timeout: 30000 }
  );

  // Saca bytes desde el <video>.src o desde el último blob capturado
  const data = await page.evaluate(async () => {
    function guessExt(u8) {
      if (u8.length > 4 && u8[0] === 0x1A && u8[1] === 0x45 && u8[2] === 0xDF && u8[3] === 0xA3) return 'webm';
      if (u8.length > 8 && u8[4] === 0x66 && u8[5] === 0x74 && u8[6] === 0x79 && u8[7] === 0x70) return 'mp4';
      return 'bin';
    }

    const v = document.querySelector('video');
    let buf;

    if (v && (v.currentSrc || v.src)) {
      const url = v.currentSrc || v.src;
      const resp = await fetch(url);
      buf = await resp.arrayBuffer();
    } else if (window.__allBlobs && window.__allBlobs.length) {
      const blob = window.__allBlobs[window.__allBlobs.length - 1];
      buf = await blob.arrayBuffer();
    } else {
      throw new Error('No video src ni blobs capturados.');
    }

    const u8 = new Uint8Array(buf);
    const ext = guessExt(u8);
    return { ext, bytes: Array.from(u8) };
  });

  const out = `video.${data.ext}`;
  await writeFile(out, Buffer.from(data.bytes));
  console.log(out);
} finally {
  await browser.close();
}
