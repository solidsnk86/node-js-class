// index.js
const express = require('express')
const multer = require('multer')
const fs = require('node:fs/promises')
const pdf = require('pdf-parse')

const app = express()
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } })

// Endpoint para subir el archivo
app.post('/upload', upload.single('pdf'), async (req, res) => {
  const file = req.file

  // Verificar si el archivo ha sido subido
  if (!file) {
    return res.status(400).json({ message: 'No se ha subido ningún archivo!' })
  }

  try {
    const dataBuffer = await fs.readFile(file.path)

    const data = await pdf(dataBuffer)

    await fs.writeFile('pdf_to.docx', data.text, { encoding: 'utf-8' })

    await fs.unlink(file.path)

    res.status(200).json({ status: 'success', message: 'Archivo convertido con éxito!' })
  } catch (error) {
    console.error('Error al procesar el archivo:', error)
    res.status(500).json({ status: 'error', message: 'Error al procesar el archivo' })
  }
})

// Servir el frontend (index.html) desde la carpeta 'client'
app.use(express.static('client'))

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})
