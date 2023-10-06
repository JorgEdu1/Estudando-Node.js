const express = require('express')
const app = express()
const port = 3000 //variavel ambiente

const path = require('path')

//ler o corpo da requisição

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const basePath = path.join(__dirname, 'templates')

const usersRouter = require('./users')

app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})


app.listen(port, () => {
    console.log(`A aplicação esta rodando no http://localhost:${port}`)
})
