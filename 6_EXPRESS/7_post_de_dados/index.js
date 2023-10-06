const express = require('express')
const app = express()
const port = 3000 //variavel ambiente

const path = require('path')

//ler o corpo da requisição

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const basePath = path.join(__dirname, 'templates')

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const age = req.body.age

    console.log(`Nome: ${name} e idade: ${age}`)
    res.sendFile(`${basePath}/userform.html`)
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log(`recebendo o id ${id}`)

    res.sendFile(`${basePath}/users.html`)
})


app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})


app.listen(port, () => {
    console.log(`A aplicação esta rodando no http://localhost:${port}`)
})
