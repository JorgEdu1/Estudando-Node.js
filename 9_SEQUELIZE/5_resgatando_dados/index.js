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

app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, { raw: true});
    res.render('viewUser', { user: user});
});

app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true});
    console.log(users);
    res.render('home', { users: users});
});

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch((err) => {
    console.log(err);
});