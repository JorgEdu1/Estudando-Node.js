const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const query = `INSERT INTO books (title, page) VALUES ('${title}', '${pageqty}')`;  

    conn.query(query, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'nodemysql',
});

conn.connect(function(err) {
    if (err) {
        console.log(err);
    }
    console.log('Conectado ao banco de dados MySQL!');

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000!');
    });
});