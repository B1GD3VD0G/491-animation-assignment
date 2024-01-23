// Declare constants shared by all other classes and scripts.
/** The GameEngine overseeing the update-render loop and containing all entities. */
const GAME = new GameEngine();
/** The AssetManager which contains all images and music. */
const ASSET_MGR = new AssetManager();
/** The html element on which we are drawing. */
const CANVAS = document.getElementById("game-world");
/** The tool we use to draw on CANVAS. */
const CTX = CANVAS.getContext("2d");

CTX.imageSmoothingEnabled = false;

const queueAssets = () => {
	ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
	ASSET_MGR.queueDownload(PapaChad.SPRITESHEET);
	ASSET_MGR.queueDownload(Slime.SPRITESHEET);
	ASSET_MGR.queueDownload(Snake.SPRITESHEET);
	ASSET_MGR.queueDownload(Title.SPRITESHEET);
};

const addEntities = () => {
	// I want a snake slithering back and forth along the very top.
	GAME.addEntity(new Snake(0, 0));
	// I want a bunny hopping back and forth underneath it.
	let currentY = Snake.SCALED_HEIGHT
	GAME.addEntity(new Bunny(1000, currentY));
	// I want a line of Slimes moving back and forth underneath him.
	currentY += Bunny.SCALED_HEIGHT;
	let currentX = 1000;
	for (let i = Slime.SAP; i <= Slime.EVIL; i++) {
		GAME.addEntity(new Slime(currentX, currentY, i));
		currentX -= (2 * Slime.SCALED_WIDTH);
	}
	// Add papa chad pacing
	currentY += Slime.SCALED_HEIGHT;
	currentX = 1000;
	GAME.addEntity(new PapaChad(currentX, currentY));

	// Now, add the floating title:
	GAME.addEntity(new Title(500, 500));
};


queueAssets();
ASSET_MGR.downloadAll(() => {
	addEntities();
});

// So...
GAME.start();

// TODO: change this to load whatever we want AT THE VERY BEGINNING OF THE GAME

/*
If we go through with my implementation, this stuff isn't necessary.
// Queue asset downloads here:

ASSET_MGR.queueDownload(Bunny.SPRITESHEET);
ASSET_MGR.queueDownload(Snake.SPRITESHEET);
ASSET_MGR.queueDownload(Slime.SPRITESHEET);
ASSET_MGR.queueDownload(PapaChad.SPRITESHEET); // includes mama chad
ASSET_MGR.queueDownload(Block.SPRITESHEET);
ASSET_MGR.queueDownload(Bird.SPRITESHEET);

// Download assets and start the game.
ASSET_MGR.downloadAll(() => {
	// Load the dimension here.
	// Start the game
	GAME.start();
});
*/