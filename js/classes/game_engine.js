/**
 * The Game Engine contains all entities, and puts them all through the update-render loop. It is also responsible for tracking user input.
 * @author Seth Ladd (original), Chris Marriott (modified), Devin Peevy (modified), Nathan Hinthorne (modified)
 */
class GameEngine {
    /**
     * This constructs a new GameEngine, initializing some necessary parameters.
     * @param {boolean} isSpanish ¿Debería estar en español este juego? Default: false.
     */
    constructor(isSpanish) {
        /** ¿Está el juego en español? Default: false. */
        this.spanish = isSpanish ?? false;
        /** Everything that will be updated and drawn each frame. */
        this.entities = [];
        /** Is the user pressing S key? */
        this.down = false;
        /** Is the user pressing the W key? */
        this.up = false;
        /** Is the user pressing the D key? */
        this.right = false;
        /** Is the user pressing the A key? */
        this.left = false;
        /** Is the user pressing the mouse button? */
        this.mouseDown = false;
        /** Is the user releasing the mouse button? */
        this.mouseUp = false;
        /** Where is the x coordinate of the user's mouse? */
        this.mouseX = 0;
        /** Where is the y coordinate of the user's mouse? */
        this.mouseY = 0;


        /** The timer tells you how long it's been since the last tick! */
        this.timer = new Timer();
        /** Are we currently debugging? */
        this.debug = false;
    };

    /**
     * This adds a new entity to the entities array.
     * @param {Object} entity The entity (sprite) that you want to add to the Game.
     */
    addEntity(entity) {
        this.entities.push(entity);
    };

    /** This is going to clear all of the entities so that a new set can be placed in. */
    clearEntities() {
        this.entities = [];
    }

    /** This method is actually going to control the update-render loop that is at the heart of any game. */
    start() {
        this.startInput();
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, CANVAS);
        };
        gameLoop();
    };

    /** This is the update-render loop. */
    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    /**
     * This method is going to go through all entities and allow them to update their position.
     */
    update() {
        // Iterate forward through the entities array. Update everything.
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        // Iterate backward through the entities array, and remove all entities which ought be removed.
        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    /**
     * This method is going to clear the canvas and redraw ALL of the entities in their *new* positions.
     */
    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        // Draw entities from first to last.
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw();
        }
    };

    /**
     * This method is going to start listening for user inputs. Affects the Game Engine's left/right/up/down booleans according
     * to interaction with either the WASD keys or arrows.
     */
    startInput() {

        CANVAS.addEventListener("mousedown", (e) => {
            this.mouseDown = true;
            this.mouseUp = false;
        });

        CANVAS.addEventListener("mouseup", (e) => {
            this.mouseUp = true;
            this.mouseDown = false;
            console.log("mouse clicked at (" + Math.round(this.mouseX) + ", " + Math.round(this.mouseY) + ")");
        });

        CANVAS.addEventListener("mousemove", (e) => {
            const rect = CANVAS.getBoundingClientRect();
            const scaleX = CANVAS.width / rect.width;
            const scaleY = CANVAS.height / rect.height;
            this.mouseX = (e.clientX - rect.left) * scaleX;
            this.mouseY = (e.clientY - rect.top) * scaleY;
        });

        CANVAS.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyA":
                    this.left = true;
                    break;
                case "KeyD":
                    this.right = true;
                    break;
                case "KeyS":
                    this.down = true;
                    break;
                case "KeyW":
                    this.up = true;
                    break;
                case "Space":
                    this.space = true;
                    break;
            }
        }, false);

        CANVAS.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyA":
                    this.left = false;
                    break;
                case "KeyD":
                    this.right = false;
                    break;
                case "KeyS":
                    this.down = false;
                    break;
                case "KeyW":
                    this.up = false;
                    break;
                case "Space":
                    this.space = false;
                    break;d
            }
        }, false);
    };

    drawGrid() {
        CTX.strokeStyle = "white";
        CTX.strokeWeight = 1;
        // Draw the grid.
        for (let x = DIMENSION.MIN_X; x <= DIMENSION.MAX_X; x += Block.SCALED_SIZE) {
            for (let y = DIMENSION.MIN_Y; y <= DIMENSION.MAX_Y; y += Block.SCALED_SIZE) {
                CTX.beginPath();
                CTX.moveTo(DIMENSION.MIN_X - CAMERA.x, y - CAMERA.y);
                CTX.lineTo(DIMENSION.MAX_X - CAMERA.x, y - CAMERA.y);
                CTX.stroke();

                CTX.beginPath();
                CTX.moveTo(x - CAMERA.x, DIMENSION.MIN_Y - CAMERA.y);
                CTX.lineTo(x - CAMERA.x, DIMENSION.MAX_Y - CAMERA.y);
                CTX.stroke();
            }
        }

        
        
    };
};