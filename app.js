import express from 'express'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = Number(process.env.PORT) || 3000
const distPath = resolve(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const indexPath = resolve(distPath, 'index.html')

if (!existsSync(indexPath)) {
  console.error('A pasta "dist" não foi encontrada. Execute "npm run build" antes de iniciar o servidor.')
  process.exit(1)
}

app.use(express.static(distPath))

app.use((request, response, next) => {
  if (request.method !== 'GET' || request.path.includes('.')) {
    next()
    return
  }

  response.sendFile(indexPath)
})

app.use((request, response) => {
  response.status(404).send('Página não encontrada.')
})

app.listen(port, () => {
  console.log(`Servidor local disponível em http://localhost:${port}`)
})
