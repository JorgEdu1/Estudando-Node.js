const express = require('express')
const app = express()
const port = 3000 //variavel ambiente

const path = require('path')

const basePath = path.join(__dirname, 'templates')

const checkAuth = (req, res, next) => {
   req.authStatus = true

    if (req.authStatus) {
        console.log('Autenticado')
        next()
    }else {
        console.log('Não autenticado')
    }
}

app.use(checkAuth)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.get('/jorge', (req, res) => {
    res.send('Pagina do jorge')
})

app.listen(port, () => {
    console.log(`A aplicação esta rodando no http://localhost:${port}`)
})