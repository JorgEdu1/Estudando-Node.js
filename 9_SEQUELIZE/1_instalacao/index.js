const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});