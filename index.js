const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

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

app.get('/', async function(req, res) {
    res.render('index')
})

app.post('/level1', async function(req, res){
    res.render('leve1')
})

const PORT = process.env.PORT || 2001;
app.listen(PORT, function(){
    console.log("App started at port:", PORT)
}); 