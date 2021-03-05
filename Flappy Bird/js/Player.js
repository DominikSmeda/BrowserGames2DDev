

class Player {
    constructor() {
        this.type = "Player";

        this.speed = 12.5;
        this.jumpSpeed = -35;
        this.position = new Vector(20, height / 6);
        this.velocity = new Vector(this.speed, 0);
        this.acceleration = new Vector(0, 12);
        this.rotation = 0;
        this.texture = {
            src: '../assets/bird.png',
            width: 30,
            height: 30
        }
        this.size = {
            width: 22,
            height: 20,
            origin: {
                x: 0,
                y: -2
            }
        }

        this.init();
    }

    init() {
        let image = new Image();
        image.src = this.texture.src;
        this.texture.image = image;
    }

    jump() {
        this.velocity.setMag(0).add(new Vector(this.speed, this.jumpSpeed));
        this.rotation = -Math.PI / 6;

        setTimeout(() => {
            this.rotation = 0;
        }, 150)
    }

    update(dt) {

        this.velocity.add(this.acceleration.clone().mult(dt));
        this.position.add(this.velocity.clone().mult(dt))
        return;
    }

    render() {

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

        ctx.drawImage(this.texture.image, -this.texture.width / 2, -this.texture.height / 2, this.texture.width, this.texture.height);

        ctx.restore();
    }


}