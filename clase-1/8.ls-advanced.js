const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const folder = process.argv[2] ?? '.'; /* ?? nullish */
async function ls() {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error(
      pc.bgRed(pc.bold(`No se puedo leer el directorio ${folder}`))
    );
    process.exit(1);
  }
  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath); // Información del archivo
    } catch {
      console.error(
        pc.bgYellow(pc.red(`No se pudo leer el archivo ${pc.yellow(filePath)}`))
      );
      process.exit(1);
    }
    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? '📁' : '📄';
    const fileSize = stats.size.toString().padStart(10);
    const fileModified = stats.mtime.toLocaleString();

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(
      fileSize
    )} ${pc.yellow(fileModified)}`;
  });

  const filesInfo = await Promise.all(filePromises);
  filesInfo.forEach((file) => {
    console.log(file);
  });
}

ls(folder);
