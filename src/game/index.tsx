import mainSpriteSet from "./assets/main-spriteset.png";
import humanChars from "./assets/human-chars.png";
import humanChars16 from "./assets/human-chars-16.png";
import { debug } from "./debug";
import { Game } from "../lib/Game";
import { GameConfig } from "../lib/GameConfig";
import { SpriteSet } from "../lib/SpriteSet";
import { World } from "./rooms/World";
import { UI } from "./UI";

/* Game config definition */
const gameConfig: GameConfig = {
  screenWidth: window.outerWidth,
  screenHeight: window.innerHeight,
  canvasElementId: "game-canvas",
  canvasBackgroundColor: "#CCCCCC",
};

/* Spritesets definition */
const humanCharset = new SpriteSet(humanChars, {
  downSkinny: [0, 1 * 24, 1 * 24, 3 * 24],
  upSkinny: [0, 3 * 24, 1 * 24, 5 * 24],
  rightSkinny: [0, 5 * 24, 1 * 24, 7 * 24],
});

const humanCharset16 = new SpriteSet(humanChars16, {
  idle: [0 * 16, 0 * 16, 1 * 16, 1 * 16],
  walk1: [1 * 16, 0 * 16, 2 * 16, 1 * 16],
  walk2: [2 * 16, 0 * 16, 3 * 16, 1 * 16],
  walk3: [3 * 16, 0 * 16, 4 * 16, 1 * 16],
});

const spriteSet1 = new SpriteSet(mainSpriteSet, {
  playerIdle: [128, 16, 128 + 16, 32],
  playerStep1: [144, 16, 144 + 16, 32],
  playerStep2: [160, 16, 160 + 16, 32],
  playerStep3: [176, 16, 176 + 16, 32],
  playerStep4: [192, 16, 192 + 16, 32],
  playerStep5: [208, 16, 208 + 16, 32],
  playerStep6: [224, 16, 224 + 16, 32],
  pillar: [80, 80, 80 + 16, 80 + 16 + 16],
});

const spriteSets = {
  spriteSet1,
  humanCharset,
  humanCharset16,
};

/* Function that actually initializes the game (will be called by the React app's useEffect) */
export const init = () => {
  Game.setup(new World(), spriteSets, gameConfig, <UI />, debug);
  Game.start();
};

/**
 * This will be called on App's unmount (return value of useEffect).
 */
export const exit = () => {
  Game.exit();
};
