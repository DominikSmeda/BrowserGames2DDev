
var _playerEdges = [];
class PipeManager {
    constructor() {
        this.type = "Pipe Manager";

        this.chunks = [
            [], [], [] // empty arrays for deleted ahead
        ];
        this.texture = {
            src: '../assets/pipe.png',
            image: null,
            width: 50
        };

        this.pipeWidth = 40;

        this.player;
        this.chunkEndPosition = 0;
        this.playerLeftSpace;
        this.checkCollision = true;

        this.init();
    }

    init() {
        let image = new Image();
        image.src = this.texture.src;
        this.texture.image = image;
    }

    update() {
        if (this.player.position.x > this.chunkEndPosition) {
            this.chunkEndPosition = this.chunkEndPosition + width;
            this.generateChunk();
            this.chunks = this.chunks.slice(1);
        }

        if (this.checkCollision && this.collisionDetection()) {
            this.player.velocity.set(0, 0);
            this.checkCollision = false;

            return 'Game Over';
        }

    }

    followPlayer(player) {
        this.player = player
        this.playerLeftSpace = width - (width - this.player.position.x)
    }

    render() {
        for (let pipe of this.chunks.flat()) {
            ctx.save();
            ctx.translate(pipe.position.x, pipe.position.y);

            if (pipe.direction) {
                ctx.rotate(Math.PI);
            }
            ctx.drawImage(this.texture.image, -this.texture.width / 2, 0, this.texture.width, 500);

            if (pipe.colide) {
                ctx.fillStyle = '#FF0000';
                console.log('aaaa');
            }
            // ctx.fillRect(-this.pipeWidth / 2 - 1, 0, 3, 3);
            // ctx.fillRect(this.pipeWidth / 2 - 1, 0, 3, 3);

            ctx.restore();
        }


        for (let p of _playerEdges) {
            ctx.fillRect(p.x, p.y, 1, 1)
        }

    }

    generateChunk() {
        console.log('chunk');
        let pipes = [];
        let amount = Math.floor(Math.random() * 3) + 3;

        for (let i = 0; i < amount; i++) {
            let x = this.chunkEndPosition + width / amount * i;


            let type = Math.floor(Math.random() * 60) % 3;
            switch (type) {
                case 0: {//Down Pipe 
                    let y = Math.floor(height / 2 + Math.random() * height / 2 - height / 4);
                    pipes.push({
                        position: new Vector(x, y),
                        direction: false
                    })
                    break;
                }

                case 1: {//Up Pipe
                    let y = Math.floor(height / 2 + Math.random() * height / 2 - height / 4);
                    pipes.push({
                        position: new Vector(x, y),
                        direction: true
                    })
                    break;
                }

                case 2: {//Both Pipes
                    let y = Math.floor(height / 2 + Math.random() * height / 2 - height / 4);
                    let space = Math.floor(Math.random() * 50) + 40;
                    pipes.push({
                        position: new Vector(x, y - space),
                        direction: true
                    })
                    pipes.push({
                        position: new Vector(x, y + space),
                        direction: false
                    })
                    break;
                }
            }

        }
        this.chunks.push(pipes);
    }

    collisionDetection() {
        let { x, y } = this.player.position;
        let { width, height } = this.player.size;
        let ox = this.player.size.origin.x;
        let oy = this.player.size.origin.y;

        let playerEdges = [
            new Vector(x - width / 2 + ox, y - height / 2 + oy),
            new Vector(x - width / 2 + ox, y + height / 2 + oy),
            new Vector(x + width / 2 + ox, y - height / 2 + oy),
            new Vector(x + width / 2 + ox, y + height / 2 + oy)
        ];
        // _playerEdges = playerEdges;

        let halfWidth = this.pipeWidth / 2
        for (let pipe of this.chunks.flat()) {
            for (let edge of playerEdges) {
                if (edge.x > pipe.position.x - halfWidth && edge.x < pipe.position.x + halfWidth) {
                    if (pipe.direction) {
                        if (edge.y < pipe.position.y) {
                            pipe.colide = true;
                            return true;
                        }
                    }
                    else {
                        if (edge.y > pipe.position.y) {
                            pipe.colide = true;
                            return true;
                        }
                    }
                }
            }
        }

    }
}