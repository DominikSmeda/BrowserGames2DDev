let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer);
        console.log('io' + io);

        return io;
    },
    getIO: () => {
        if (io) {
            return io;
        }
        console.log('error io');

    }
}