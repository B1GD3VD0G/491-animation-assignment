/** 
 * A Snake can appear in the village <or the lava> dimension(s).
 * He is able to face right or left, slither, and die.
 * @author Devin Peevy
 */
class Snake {
    /**
     * @param {number} x The x position at which the Snake should start.
     * @param {number} y The y position at which the Snake should start.
     */
    constructor(x, y) {
        /** The x position of the Snake (in the game world). */
        this.x = x;
        /** The y position of the Snake (in the game world). */
        this.y = y;
        /** An associative array of the animations for this Snake. Arranged [facing][action]. */
        this.animations = [];
        this.loadAnimations();
        /** What way is the Snake looking? */
        this.facing = "left"; // "left", "right"
        /** What is the Snake doing? */
        this.action = "idle";
    };

    /** The height, in pixels, of the Snake ON THE SPRITESHEET. */
    static get HEIGHT() {
        return 13;
    };

    /** How much bigger should the Snake be drawn on the canvas than it is on the spritesheet? */
    static get SCALE() {
        // TODO: return when we have the game world properly set up.
        return 5;
    };

    /** This will be the height of the Snake ON THE CANVAS. */
    static get SCALED_HEIGHT() {
        return Snake.SCALE * Snake.HEIGHT;
    };

    /** This will be the width of the Snake ON THE CANVAS. */
    static get SCALED_WIDTH() {
        return Snake.SCALE * Snake.WIDTH;
    };

    static get SPEED() {
        return Snake.SCALE * 30;
    }

    /** The filepath to the spritesheet of the Snake. */
    static get SPRITESHEET() {
        // TODO: make bunny death sprite.
        return "./sprites/snake.png";
    };

    /** The width, in pixels, of the Snake ON THE SPRITESHEET. */
    static get WIDTH() {
        return 40;
    };
    
    /** Change what the Snake is doing and where it is. */
    update() {
        this.action = "slithering";
        this.facing = "right";
        this.x += Snake.SPEED * GAME.clockTick;
        if (this.x > 1920) {
            this.x -= (1920 + Snake.SCALED_WIDTH);
        }
    };

    /** Draw the Snake on the canvas. */
    draw() {
        this.animations[this.facing][this.action].drawFrame(this.x, this.y, Snake.SCALE);
    };

    /** Called by the constructor. Fills up the animations array. */
    loadAnimations() {
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["right"]["idle"] = new Animator(
            Snake.SPRITESHEET,
            0, 0,
            Snake.WIDTH, Snake.HEIGHT,
            1, 1);
        this.animations["left"]["idle"] = new Animator(
            Snake.SPRITESHEET,
            0, Snake.HEIGHT,
            Snake.WIDTH, Snake.HEIGHT,
            1, 1);
            
        this.animations["right"]["slithering"] = new Animator(
            Snake.SPRITESHEET,
            0, 0,
            Snake.WIDTH, Snake.HEIGHT,
            9, 1/9);
        this.animations["left"]["slithering"] = new Animator(
            Snake.SPRITESHEET,
            0, Snake.HEIGHT,
            Snake.WIDTH, Snake.HEIGHT,
            9, 1/9);
        
    };
};