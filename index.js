const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const teachable = require('./teachableGame');
const { Pool } = require('pg');

const app = express();

app.use(session({
    secret: "add a secret string here",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/teachableMachinGame';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const machineGame = teachable(pool)

app.get('/', async function (req, res) {
    res.render('index')
})

app.post('/login', async function (req, res, next) {
    try {
        let player = req.body.username;
        console.log(player)
        let playerList = await machineGame.player(player)
        console.log(playerList)
        if (player == "") {
            req.flash('Hey, you dont exist')
        } else {
            res.render('step1oflevel1', {
                playerList: playerList,
            })
        }
} catch (error) {
    next(error)
}
})

app.get('/level1', async function (req, res) {
    res.render('stage1oflevel1')
});

app.post('/step2oflevel1', async function (req, res) {
    let player = req.body.username;
    console.log(player)
    let playerList = await machineGame.player(player)
    res.render('step2oflevel1', {
        playerList
    })
});

app.get('/feedback', async function (req, res) {
    res.render('feedback')
});

app.get('/step1oflevel2', async function (req, res) {
    res.render('step1oflevel2')
});

app.get('/step2oflevel2', async function (req, res) {
    res.render('step2oflevel2')
});

app.get('/reward', async function (req, res) {
    res.render('reward')
});

app.get('/endGame', async function (req, res) {
    res.redirect('/')
})
const PORT = process.env.PORT || 2001;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});