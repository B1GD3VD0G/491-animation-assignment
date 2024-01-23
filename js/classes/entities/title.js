/**
 * The title of our game is just going to float diagonally,
 * and stay within the borders of the screen (think DirecTV logo).
 */
class Title {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xVel = 300;
        this.yVel = 150;
        this.animator = new Animator(Title.SPRITESHEET, 0, 0, 150, 100, 1, 1);
    }

    static get SPRITESHEET() {
        return "./sprites/title.png";
    }

    update() {
        this.x += this.xVel * GAME.clockTick;
        this.y += this.yVel * GAME.clockTick;
        if (this.x <= 0 || this.x > 1920 - 450) {
            this.xVel = -this.xVel;
        }
        if (this.y <= 0 || this.y > 1080 - 300) {
            this.yVel = -this.yVel;
        }
    };

    draw() {
        this.animator.drawFrame(this.x, this.y, 3);
    }
}