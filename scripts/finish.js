/* eslint-disable no-undef */
import readline from "readline";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

function askFileName() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Ingresa el nombre para el archivo (sin extensión): ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function runBuild() {
  return new Promise((resolve, reject) => {
    console.log("Ejecutando build en dist/temp...");
    exec("vite build --mode temp", (error, stdout) => {
      if (error) {
        console.error(`Error en build: ${error.message}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

async function main() {
  try {
    const fileName = await askFileName();

    await runBuild();

    // 📌 Usar rutas absolutas desde el root del proyecto
    const tempDir = path.resolve(process.cwd(), "dist/temp");
    const distDir = path.resolve(process.cwd(), "dist");

    const oldPath = path.join(tempDir, "index.html");
    const newPathTemp = path.join(tempDir, `${fileName}.html`);
    const newPathDist = path.join(distDir, `${fileName}.html`);

    if (!fs.existsSync(oldPath)) {
      console.error(`No se encontró ${oldPath} para renombrar.`);
      return;
    }

    fs.renameSync(oldPath, newPathTemp);
    console.log(`Archivo renombrado a: ${fileName}.html en dist/temp`);

    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    fs.renameSync(newPathTemp, newPathDist);
    console.log(`Archivo movido a dist/${fileName}.html`);

  } catch (e) {
    console.error("Error:", e);
  }
}

main();
