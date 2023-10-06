const express = require('express')
const app = express()

const port = 5000 //variavel ambiente

const path = require('path')

const basePath = path.join(__dirname, 'pages')

app.use(express.static('public'))

app.get('/sobre', (req, res) => {
    res.sendFile(`${basePath}/sobre.html`)
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use(function (req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})