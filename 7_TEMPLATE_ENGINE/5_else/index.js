const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/', (req, res) => {

    const user = {
        name: 'John',
        surname: 'Doe',
    };

    const auth = false;

    const approved = false;

    res.render('home',{user: user, auth, approved});
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});