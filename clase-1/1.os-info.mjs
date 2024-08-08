import os from 'node:os'
import fs from 'node:fs/promises'
import pc from 'picocolors'
import open from 'open'

const { model } = os.cpus().shift()
const { speed } = os.cpus().shift()

function formatInfoSO () {
  const so = os.type()
  const arch = os.arch().replace('x64', ' 64 bits')
  const rel = ` versión(${os.release()})`
  return `${so + arch + rel}`
}

const createTemplate = () => `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información del Sistema</title>
</head>
<body
    style="
      background: #222;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    "
  >
   <div>
     <h2 style="color: #fff; font-weight: bold">Información del Sistema</h2>
      <article style="color: #fff;">
        <p>Sistema Operativo: ${formatInfoSO()}</p>
        <p>Procesador: ${model}(${os.cpus().length} CPUs) @ ${speed}GHz</p>
        <p>Memoria RAM Total: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(
          2
        )} GB, RAM disponible ${(os.freemem() / 1024 / 1024 / 1024).toFixed(
  2
)} GB.</p>
    <p>Usuario: ${os.userInfo().username}</p>
    <p>Tiempo de actividad del Sistema Operativo: ${(
      os.uptime() /
      60 /
      60
    ).toFixed()} días.</p>
      </article>
   </div>
</body>
</html>
    `;

(async () => {
  try {
    const filePath = 'system-info.html'
    await fs.writeFile(filePath, createTemplate())
    console.log(pc.green('Archivo HTML creado exitosamente.'))
    await open(filePath)
  } catch (error) {
    console.error('Error al crear el archivo HTML.', error)
  }
})()
