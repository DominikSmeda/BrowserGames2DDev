
const io = require('./socket').getIO();

class Connection {
    constructor(id) {
        this.nspIO = io.of('/' + id);

    }

    initConnection() {

        this.nspIO.on('connection', (socket) => {

            // console.log('połączono');
            this.joinNewPlayer(socket.id);

            socket.on('disconnect', () => {
                this.kickPlayer(socket.id)
            });

            socket.on('setPlayerProp', (data) => {
                // if (this.players[socket.id].isPlaying) return;
                this.changePlayerProp(socket.id, 'nickname', data.nickname)

                setTimeout(() => this.addPlayerToGame(socket.id), 100);
            });


            socket.on('playerAction', (data) => {
                this.receivePlayerAction(socket.id, data)

            });
        })


    }

    sendData(type, data, to = 'all') {
        // console.log('sending');

        if (this.nspIO) {
            if (to == 'all') {
                this.nspIO.emit(type, data);
            }
            else {
                this.nspIO.to(to).emit(type, data);
            }
        }
    }


}

module.exports = Connection;
