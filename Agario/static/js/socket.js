

let socket;

function createConnection(gid) {
    console.log('aaa');
    socket = io('/' + gid);

    console.log(socket);

    socket.on('connect', function () {

    });

    socket.on('game', (d) => {
        // console.log(d);

        data = d;
        gameStatus = true;
    })

    socket.on('death', (d) => {
        setTimeout(() => {
            document.getElementById('blocker').style.display = "block";
        }, 500)

    })
}

function SendPlayerAction(data) {
    socket.emit('playerAction', data);
}

function setPlayerProp() {
    document.getElementById('blocker').style.display = "none";
    let nick = document.getElementById('nickname').value;
    console.log(nick);

    socket.emit('setPlayerProp',
        {
            nickname: nick
        }
    );
}