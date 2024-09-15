import os from 'node:os'
import fs from 'node:fs/promises'
import pc from 'picocolors'
import open from 'open'

const { model } = os.cpus().shift()
const { speed } = os.cpus().shift()

function formatInfoSO () {
  const so = os.type().replace('_NT', ' ')
  const rel = os.release().replace(/.0.19045/, '')
  const arch = os.arch().replace('x64', ' x64,')
  const build = ` compilación (${os.release().replace(/10.0./, '')})`
  return `${so + rel + arch + build}`
}

const createTemplate = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información del Sistema</title>
</head>
<body>
  <style>
    body {
      display: grid;
      margin: 0 auto;
      justify-content: center;
      background: #222;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    }
    table, tr , td {
      border: 1px solid #444;
      color: #ccc;
    }
  </style>
  <div>
  <h2 style="color: #fff; font-weight: bold; text-align: center">Información del Sistema</h2>
  <table style="border-collapse: collapse; width: 100%;">
    <tr>
      <td style="padding: 8px;">Sistema Operativo:</td>
      <td style="padding: 8px;">${formatInfoSO()}</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Procesador:</td>
      <td style="padding: 8px;">${model} (${
  os.cpus().length
} CPUs) @ ${speed}GHz</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Memoria RAM Utilizable:</td>
      <td style="padding: 8px;">${(os.totalmem() / 1024 / 1024 / 1024).toFixed(
        2
      )} GB</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Memoria RAM Disponible:</td>
      <td style="padding: 8px;">${(os.freemem() / 1024 / 1024 / 1024).toFixed(
        2
      )} GB</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Usuario:</td>
      <td style="padding: 8px;">${os.userInfo().username}</td>
    </tr>
    <tr>
      <td style="padding: 8px;">Tiempo de actividad del Sistema:</td>
      <td style="padding: 8px;">${(os.uptime() / 60 / 60).toFixed()} días</td>
    </tr>
  </table>
</div>
</body>
</html>
    `

;(async () => {
  try {
    const filePath = 'system-info.html'
    await fs.writeFile(filePath, createTemplate())
    console.log(pc.green('Archivo HTML creado exitosamente.'))
    await open(filePath)
  } catch (error) {
    console.error(pc.red('Error al crear el archivo HTML.', error))
  }
})()
