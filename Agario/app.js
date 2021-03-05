//AGAR.IO

var express = require("express")
var app = express()
const PORT = process.env.PORT || 3000;
const path = require('path');
const hbs = require('express-handlebars');

const IO = require('./clientConnect/socket');


app.use(express.static('static'));

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({}));
app.set('views engine', 'hbs');


app.get('/game', function (req, res) {

    let id = req.query.ID;

    res.render('game.hbs', {
        gameID: id
    });
})


app.get('/', function (req, res) {
    let context = {
        servers: gamesMangager.getServersList()
    }
    console.log(context);

    res.render('start.hbs', context);
})

app.use((req, res) => {
    res.status(400).send('Strona nie istnieje!');
})
const server = app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

IO.init(server);


let GamesManager = require('./models/GamesManager')

let gamesMangager = new GamesManager();

gamesMangager.createGameServer('Server1');
gamesMangager.createGameServer('Server2');
gamesMangager.createGameServer('Server3');
gamesMangager.createGameServer('Noobs -PL-');
gamesMangager.createGameServer('TOTAL WAR 24h/7 ENGLISH ONLY');






