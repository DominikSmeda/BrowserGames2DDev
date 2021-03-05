


class GameManager {
    constructor() {


        this.lastTime;
        this.objects = [];
        this.player;
        this.background = {
            src: '../assets/sky.png',
            image: null
        }
        this.gameStatus;
        // this.ui = new UI();
        this.init();
    }

    init() {
        this.objects = [];
        this.gameStatus = 'Playing';
        let pipeManager = new PipeManager();
        this.player = new Player();

        pipeManager.followPlayer(this.player);

        this.addObject(this.player);
        this.addObject(pipeManager);

        let bgImage = new Image();
        bgImage.src = this.background.src;
        this.background.image = bgImage;

        this.events();

        this.lastTime = Date.now();
        this.gameLoop();
    }

    gameLoop() {
        requestAnimationFrame(() => {
            let dt = Date.now() - this.lastTime;
            this.gameLoop();
            this.lastTime = Date.now();

            this.update(dt / 100);
        })
    }

    update(dt) {
        for (let obj of this.objects) {
            switch (obj.update(dt)) {

                case 'Game Over': {
                    this.gameStatus = 'Game Over';
                    break;
                }
            }
        }
        this.render();
    }

    render() {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(this.background.image, 0, 0, width, height);

        ctx.save();
        ctx.translate(-this.player.position.x + width / 3, 0)

        for (let obj of this.objects) {
            obj.render();
        }
        ctx.restore();


        ctx.save();

        if (this.gameStatus == 'Game Over') {
            ctx.textAlign = "center";
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Game Over!", width / 2, 50);
            ctx.strokeText("Game Over!", width / 2, 50);
        }
        ctx.restore();
    }

    events() {
        window.addEventListener('keypress', (e) => {
            if (e.key == " ") {
                if (this.gameStatus == 'Game Over') return;
                this.player.jump();
            }
        })

        window.addEventListener('mousedown', (e) => {

            if (this.gameStatus == 'Game Over') {
                this.init();
            }
            else {
                this.player.jump();
            }


        })

    }

    addObject(obj) {
        this.objects.push(obj);
    }
}