import { Game } from "../lib/Game";
import { GameConfig } from "../lib/GameConfig";
import { Frame, SpriteSet } from "../lib/SpriteSet";
import UI from "./UI";
import { debug } from "./debug";
import spriteSet from "./assets/img/0x72_DungeonTilesetII_v1.7.png";
import { Dungeon } from "./rooms/Dungeon";

/* Game config definition */
const gameConfig: GameConfig = {
  screenWidth: window.outerWidth,
  screenHeight: window.innerHeight,
  canvasElementId: "game-canvas",
  canvasBackgroundColor: "#CCCCCC",
};

const getFrame16x32 = (posX: number, posY: number): Frame => [
  16 * (posX - 1),
  32 * (posY - 1),
  16 * posX,
  32 * posY,
];

const mainSpriteset = new SpriteSet(spriteSet, {
  playerMaleIdle: getFrame16x32(9, 2),
  playerMaleWalk1: getFrame16x32(10, 2),
  playerMaleWalk2: getFrame16x32(11, 2),
  playerMaleWalk3: getFrame16x32(12, 2),
  playerMaleWalk4: getFrame16x32(13, 2),
  pillar: [16 * 5, 16 * 5, 16 * 6, 16 * 8],
});

const spriteSets: Record<string, SpriteSet> = {
  mainSpriteset,
};

/* Function that actually initializes the game (will be called by the React app's useEffect) */
export const init = () => {
  Game.setup(new Dungeon(), spriteSets, gameConfig, <UI />, debug);
  Game.start();
};

/**
 * This will be called on App's unmount (return value of useEffect).
 */
export const exit = () => {
  Game.exit();
};
