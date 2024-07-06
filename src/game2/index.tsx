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
  rogueFemaleIdle: getFrame16x32(9, 1),
  rogueFemaleWalk1: getFrame16x32(10, 1),
  rogueFemaleWalk2: getFrame16x32(11, 1),
  rogueFemaleWalk3: getFrame16x32(12, 1),
  rogueFemaleWalk4: getFrame16x32(13, 1),
  rogueMaleIdle: getFrame16x32(9, 2),
  rogueMaleWalk1: getFrame16x32(10, 2),
  rogueMaleWalk2: getFrame16x32(11, 2),
  rogueMaleWalk3: getFrame16x32(12, 2),
  rogueMaleWalk4: getFrame16x32(13, 2),
  knightFemaleIdle: getFrame16x32(9, 3),
  knightFemaleWalk1: getFrame16x32(10, 3),
  knightFemaleWalk2: getFrame16x32(11, 3),
  knightFemaleWalk3: getFrame16x32(12, 3),
  knightFemaleWalk4: getFrame16x32(13, 3),
  knightMaleIdle: getFrame16x32(9, 4),
  knightMaleWalk1: getFrame16x32(10, 4),
  knightMaleWalk2: getFrame16x32(11, 4),
  knightMaleWalk3: getFrame16x32(12, 4),
  knightMaleWalk4: getFrame16x32(13, 4),
  wizardFemaleIdle: getFrame16x32(9, 5),
  wizardFemaleWalk1: getFrame16x32(10, 5),
  wizardFemaleWalk2: getFrame16x32(11, 5),
  wizardFemaleWalk3: getFrame16x32(12, 5),
  wizardFemaleWalk4: getFrame16x32(13, 5),
  wizardMaleIdle: getFrame16x32(9, 6),
  wizardMaleWalk1: getFrame16x32(10, 6),
  wizardMaleWalk2: getFrame16x32(11, 6),
  wizardMaleWalk3: getFrame16x32(12, 6),
  wizardMaleWalk4: getFrame16x32(13, 6),
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
