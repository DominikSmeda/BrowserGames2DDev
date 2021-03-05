const Connection = require('../clientConnect/connection');

class Game extends Connection {

    constructor(id, name, sizeX, sizeY, MaxPlayers) {
        super(id);

        this.gameID = id;
        this.gameName = name;
        this.gameSizeX = sizeX;
        this.gameSizeY = sizeY;
        this.gameMaxPlayers = MaxPlayers;
        this.gameCurrentPlayers = 0;

        this.players = [];
        this.food = [];
        this.foodKcal = 50;
        this.startPlayerKcal = 1000;
        this.foodRadius = this.getRadiusByKcal(this.foodKcal);
        this.currentFood = 0;
        this.maxFood = 500;

        this.initConnection()

        this.update();

        this.players.c = this.playerModel()
        this.players.c.nickname = "(0.0)"
        this.players.c.isPlaying = true;
        this.players.c.radius = this.getRadiusByKcal(this.startPlayerKcal);

        this.renderFood(500)
    }

    playerModel() {
        let that = this;
        return {
            isPlaying: false,
            nickname: '',
            position: {
                x: 0,
                y: 0,
            },
            radius: 0,
            color: this.getRandomColor(),
            vec: {
                x: 0,
                y: 0
            },
            kcal: this.startPlayerKcal,
            calcRadius() {
                this.radius = that.getRadiusByKcal(this.kcal);
            }
        }
    }

    receivePlayerAction(id, data) {

        if (data.type == "move") {

            this.players[id].vec.x = data.vec.x;
            this.players[id].vec.y = data.vec.y;

        }


    }

    broadcast(data) {
        // console.log(new Date());
        // console.log('a');
        //console.log(this.players);

        this.sendData('game', data);
    }

    async update() {
        let moveTimer = setInterval(() => {
            this.eating()
            let playersTab = [];
            for (let player in this.players) {
                if (this.players[player].isPlaying) {
                    if ((this.players[player].position.x + this.players[player].vec.x + this.players[player].radius < this.gameSizeX)
                        && (this.players[player].position.x + this.players[player].vec.x - this.players[player].radius > -this.gameSizeX)
                    ) {
                        this.players[player].position.x += this.players[player].vec.x;

                    }

                    if ((this.players[player].position.y + this.players[player].vec.y + this.players[player].radius < this.gameSizeY)
                        && (this.players[player].position.y + this.players[player].vec.y - this.players[player].radius > -this.gameSizeY)) {
                        this.players[player].position.y += this.players[player].vec.y;
                    }
                    // this.players[player].position.x += this.players[player].vec.x;
                    // this.players[player].position.y += this.players[player].vec.y;
                }
                playersTab.push({ id: player, position: this.players[player].position, radius: this.players[player].radius, color: this.players[player].color, nickname: this.players[player].nickname })
            }

            this.broadcast(
                {
                    gameBoard: {
                        size: {
                            x: this.gameSizeX,
                            y: this.gameSizeY
                        }
                    },
                    players: playersTab,
                    food: this.food,
                    foodRadius: this.foodRadius

                }
            );
        }, 15)

        //let foodTimer = setInterval(() => {
        //  this.renderFood(50);
        //}, 10000);

    }

    joinNewPlayer(playerID) {
        this.players[playerID] = this.playerModel();
        this.gameCurrentPlayers++;

    }

    changePlayerProp(id, prop, val) {
        this.players[id][prop] = val;
        console.log(this.players);

    }

    addPlayerToGame(id) {
        if (this.players[id].nickname == '') this.players[id].nickname = 'Guest' + Math.floor(Math.random() * 1000)
        this.players[id].radius = this.getRadiusByKcal(this.startPlayerKcal);
        this.players[id].isPlaying = true;
        this.players[id].kcal = this.startPlayerKcal;
        let pos = this.getRandomPosition();
        this.players[id].position.x = pos.x;
        this.players[id].position.y = pos.y
    }

    kickPlayer(id) {
        delete this.players[id]
        this.gameCurrentPlayers--;
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    async renderFood(howMany) {
        for (let i = 0; i < howMany; i++) {
            if (this.currentFood > this.maxFood) break;
            let pos = this.getRandomPosition()
            this.currentFood++;
            this.food.push({ x: pos.x, y: pos.y, color: this.getRandomColor() })
        }
        //  console.log(this.currentFood);

    }

    getRandomPosition(OutOfOccupied = false) {
        let x = Math.random() * this.gameSizeX * 2 - this.gameSizeX;
        let y = Math.random() * this.gameSizeY * 2 - this.gameSizeY;

        return { x: x, y: y }
    }

    async eating() {

        // for (let i = 0; i < this.food.length; i++)
        //     console.log(this.food[i].x);

        for (let player in this.players) {
            for (let i = 0; i < this.food.length; i++) {

                if (Math.sqrt(Math.pow(this.food[i].x - this.players[player].position.x, 2) + Math.pow(this.food[i].y - this.players[player].position.y, 2)) < this.foodRadius + this.players[player].radius) {
                    this.food.splice(i, 1);
                    this.currentFood--;
                    this.foodBonus(player)
                }
            }
        }

        for (let me in this.players) {
            for (let player in this.players) {
                if (this.players[me].position.x != this.players[player].position.x && this.players[me].position.y != this.players[player].position.y && this.players[player].isPlaying) {
                    if (Math.sqrt(Math.pow(this.players[player].position.x - this.players[me].position.x, 2) + Math.pow(this.players[player].position.y - this.players[me].position.y, 2)) < this.players[me].radius) {

                        if (this.players[me].radius > this.players[player].radius) {
                            this.foodBonus(me, this.players[player].kcal)
                            this.die(player)
                        }

                    }
                }
            }
        }
    }

    foodBonus(player, kcal = this.foodKcal) {
        this.players[player].kcal += kcal;
        this.players[player].calcRadius();
    }

    getRadiusByKcal(kcal) {
        return Math.sqrt(kcal / Math.PI);
    }

    die(player) {
        this.players[player].isPlaying = false;
        this.players[player].radius = 0;
        this.players[player].nickname = '';

        this.sendData('death', 'score', player)
    }
}

module.exports = Game;