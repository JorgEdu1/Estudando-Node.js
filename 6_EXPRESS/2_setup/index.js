const express = require('express')
const app = express()
const port = 3000 //variavel ambiente

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/jorge', (req, res) => {
    res.send('Pagina do jorge')
})

app.listen(port, () => {
    console.log(`A aplicação esta rodando no http://localhost:${port}`)
})