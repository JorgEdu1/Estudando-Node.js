const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');

const app = express();


app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/users/create', (req, res) => {
    res.render('addUser');
});

app.post('/users/create',  async (req, res) => {
    const { name, occupation } = req.body;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({name, occupation, newsletter});
    res.redirect('/');
});

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch((err) => {
    console.log(err);
});