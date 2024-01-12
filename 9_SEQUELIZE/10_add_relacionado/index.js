const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');
const Address = require('./models/Address');

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

app.post('/users/delete/:id', async (req, res) => {

    await User.destroy({
        where: {
            id: req.params.id
        }
    });

    res.redirect('/');
});

app.get('/users/edit/:id', async (req, res) => {

    const user = await User.findByPk(req.params.id, { raw: true});

    res.render('editUser', { user: user});
});

app.post('/users/update', async (req, res) => {
    
        const name = req.body.name;
        const occupation = req.body.occupation;
        const id = req.body.id;
        let newsletter = req.body.newsletter;

        if(newsletter === 'on') {
            newsletter = true;
        }
        else {
            newsletter = false;
        }

        await User.update({ name, occupation, newsletter }, {
            where: {
                id: id
            }
        });

        res.redirect('/');
    });

app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true});
    res.render('home', { users: users});
});

app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;

    const address = {
        UserId,
        street,
        number,
        city,
    }

    await Address.create(address);
    res.redirect(`/users/edit/${UserId}`);
});

conn
.sync()
.then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch((err) => {
    console.log(err);
});