const Game = require('./Game');


let id = 0;

class GamesManager {
    constructor() {
        this.servers = [];

    }

    createGameServer(name, sizeX = 1000, sizeY = 1000, MaxPlayers = 20) {

        this.servers.push(new Game(id++, name, sizeX, sizeY, MaxPlayers))
    }

    getServersList() {
        let tab = [];

        for (let server of this.servers) {
            tab.push({ name: server.gameName, id: server.gameID, currentPlayers: server.gameCurrentPlayers, maxPlayers: server.gameMaxPlayers })
        }

        return tab;
    }



}




module.exports = GamesManager;