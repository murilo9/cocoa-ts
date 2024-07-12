import { Game } from "../lib/Game";
import { GameConfig } from "../lib/GameConfig";
import { Frame, SpriteSet } from "../lib/SpriteSet";
import UI from "./UI";
import { debug } from "./debug";
import playersImg from "./assets/img/players-32x64.png";
import chipImg from "./assets/img/chipset.png";
import itemsImg from "./assets/img/items-32x32.png";
import weaponsImg from "./assets/img/weapons.png";
import monstersSmallImg from "./assets/img/monsters-32x32.png";
import monstersMediumImg from "./assets/img/monsters-32x64.png";
import monstersLargeImg from "./assets/img/monsters-64x64.png";
import { Dungeon } from "./rooms/Dungeon";

/* Game config definition */
const gameConfig: GameConfig = {
  screenWidth: window.outerWidth,
  screenHeight: window.innerHeight,
  canvasElementId: "game-canvas",
  canvasBackgroundColor: "#CCCCCC",
};

const getFrame16x16 = (posX: number, posY: number): Frame => [
  16 * (posX - 1),
  16 * (posY - 1),
  16 * posX,
  16 * posY,
];

const getFrame32x64 = (posX: number, posY: number): Frame => [
  32 * (posX - 1),
  64 * (posY - 1),
  32 * posX,
  64 * posY,
];

const getFrame32x32 = (posX: number, posY: number): Frame => [
  32 * (posX - 1),
  32 * (posY - 1),
  32 * posX,
  32 * posY,
];

const getFrame64x64 = (posX: number, posY: number): Frame => [
  64 * (posX - 1),
  64 * (posY - 1),
  64 * posX,
  64 * posY,
];

const playersSet = new SpriteSet(playersImg, {
  rogueFemaleIdle: getFrame32x64(1, 1),
  rogueFemaleWalk1: getFrame32x64(2, 1),
  rogueFemaleWalk2: getFrame32x64(3, 1),
  rogueFemaleWalk3: getFrame32x64(4, 1),
  rogueFemaleWalk4: getFrame32x64(5, 1),
  rogueMaleIdle: getFrame32x64(1, 2),
  rogueMaleWalk1: getFrame32x64(2, 2),
  rogueMaleWalk2: getFrame32x64(3, 2),
  rogueMaleWalk3: getFrame32x64(4, 2),
  rogueMaleWalk4: getFrame32x64(5, 2),
  knightFemaleIdle: getFrame32x64(1, 3),
  knightFemaleWalk1: getFrame32x64(2, 3),
  knightFemaleWalk2: getFrame32x64(3, 3),
  knightFemaleWalk3: getFrame32x64(4, 3),
  knightFemaleWalk4: getFrame32x64(5, 3),
  knightMaleIdle: getFrame32x64(1, 4),
  knightMaleWalk1: getFrame32x64(2, 4),
  knightMaleWalk2: getFrame32x64(3, 4),
  knightMaleWalk3: getFrame32x64(4, 4),
  knightMaleWalk4: getFrame32x64(5, 4),
  wizardFemaleIdle: getFrame32x64(1, 5),
  wizardFemaleWalk1: getFrame32x64(2, 5),
  wizardFemaleWalk2: getFrame32x64(3, 5),
  wizardFemaleWalk3: getFrame32x64(4, 5),
  wizardFemaleWalk4: getFrame32x64(5, 5),
  wizardMaleIdle: getFrame32x64(1, 6),
  wizardMaleWalk1: getFrame32x64(2, 6),
  wizardMaleWalk2: getFrame32x64(3, 6),
  wizardMaleWalk3: getFrame32x64(4, 6),
  wizardMaleWalk4: getFrame32x64(5, 6),
});

const monstersSmallSet = new SpriteSet(monstersSmallImg, {
  stumpIdle: getFrame32x32(1, 1),
  stumpWalk1: getFrame32x32(2, 1),
  stumpWalk2: getFrame32x32(3, 1),
  stumpWalk3: getFrame32x32(4, 1),
  orcStumpIdle: getFrame32x32(1, 2),
  orcStumpWalk1: getFrame32x32(2, 2),
  orcStumpWalk2: getFrame32x32(3, 2),
  orcStumpWalk3: getFrame32x32(4, 2),
  infernalStumpIdle: getFrame32x32(1, 3),
  infernalStumpWalk1: getFrame32x32(2, 3),
  infernalStumpWalk2: getFrame32x32(3, 3),
  infernalStumpWalk3: getFrame32x32(4, 3),
  brownSlimeIdle: getFrame32x32(1, 4),
  brownSlimeWalk1: getFrame32x32(2, 4),
  brownSlimeWalk2: getFrame32x32(3, 4),
  brownSlimeWalk3: getFrame32x32(4, 4),
  greenSlimeIdle: getFrame32x32(5, 4),
  greenSlimeWalk1: getFrame32x32(6, 4),
  greenSlimeWalk2: getFrame32x32(7, 4),
  greenSlimeWalk3: getFrame32x32(8, 4),
  zombieCeeplerIdle: getFrame32x32(1, 5),
  zombieCreeplerWalk1: getFrame32x32(2, 5),
  zombieCreeplerWalk2: getFrame32x32(3, 5),
  zombieCreeplerWalk3: getFrame32x32(4, 5),
  creeplerIdle: getFrame32x32(5, 5),
  creeplerWalk1: getFrame32x32(6, 5),
  creeplerWalk2: getFrame32x32(7, 5),
  creeplerWalk3: getFrame32x32(8, 5),
  orcButcherIdle: getFrame32x32(1, 6),
  orcButcherWalk1: getFrame32x32(2, 6),
  orcButcherWalk2: getFrame32x32(3, 6),
  orcButcherWalk3: getFrame32x32(4, 6),
  orcIdle: getFrame32x32(5, 6),
  orcWalk1: getFrame32x32(6, 6),
  orcWalk2: getFrame32x32(7, 6),
  orcWalk3: getFrame32x32(8, 6),
  orcWizardIdle: getFrame32x32(1, 7),
  orcWizardWalk1: getFrame32x32(2, 7),
  orcWizardWalk2: getFrame32x32(3, 7),
  orcWizardWalk3: getFrame32x32(4, 7),
});

const monstersMediumSet = new SpriteSet(monstersMediumImg, {
  darkSorcererIdle: getFrame32x64(1, 1),
  darkSorcererWalk1: getFrame32x64(2, 1),
  darkSorcererWalk2: getFrame32x64(3, 1),
  darkSorcererWalk3: getFrame32x64(4, 1),
  infernalMunchIdle: getFrame32x64(5, 1),
  infernalMunchWalk1: getFrame32x64(6, 1),
  infernalMunchWalk2: getFrame32x64(7, 1),
  infernalMunchWalk3: getFrame32x64(8, 1),
  jackoStalkerIdle: getFrame32x64(1, 2),
  jackoStalkerWalk1: getFrame32x64(2, 2),
  jackoStalkerWalk2: getFrame32x64(3, 2),
  jackoStalkerWalk3: getFrame32x64(4, 2),
  witchIdle: getFrame32x64(5, 2),
  witchWalk1: getFrame32x64(6, 2),
  witchWalk2: getFrame32x64(7, 2),
  witchWalk3: getFrame32x64(8, 2),
  creepletIdle: getFrame32x64(5, 3),
  creepletWalk1: getFrame32x64(6, 3),
  creepletWalk2: getFrame32x64(7, 3),
  creepletWalk3: getFrame32x64(8, 3),
});

const monstersLargeSet = new SpriteSet(monstersLargeImg, {
  zombieBruteIdle: getFrame64x64(1, 1),
  zombieBruteWalk1: getFrame64x64(2, 1),
  zombieBruteWalk2: getFrame64x64(3, 1),
  zombieBruteWalk3: getFrame64x64(4, 1),
  zombieBruteWalk4: getFrame64x64(5, 1),
  orcBruteIdle: getFrame64x64(1, 2),
  orcBruteWalk1: getFrame64x64(2, 2),
  orcBruteWalk2: getFrame64x64(3, 2),
  orcBruteWalk3: getFrame64x64(4, 2),
  orcBruteWalk4: getFrame64x64(5, 2),
  munchBruteIdle: getFrame64x64(4, 3),
  munchBruteWalk1: getFrame64x64(1, 3),
  munchBruteWalk2: getFrame64x64(2, 3),
  munchBruteWalk3: getFrame64x64(3, 3),
});

const weaponsSet = new SpriteSet(weaponsImg, {
  dagger: [0, 0, 1 * 16, 12],
  shortSword: getFrame32x64(3, 1),
  mace: getFrame32x64(4, 2),
  club: getFrame32x64(3, 2),
  hammer: getFrame32x64(2, 2),
  warHammer: [0 * 16, 12, 1 * 16, 32],
  axe: getFrame32x64(3, 6),
  greatSword: getFrame32x64(4, 4),
  bastardSword: getFrame32x64(2, 3),
  longSword: getFrame32x64(1, 3),
  staff1: getFrame32x64(3, 5),
  staff2: getFrame32x64(4, 5),
  greatAxe: getFrame32x64(1, 6),
  spear: getFrame32x64(2, 6),
});

const itemsSet = new SpriteSet(itemsImg, {
  bomb1: getFrame32x32(1, 1),
  bomb2: getFrame32x32(2, 1),
  bomb3: getFrame32x32(3, 1),
  redPotionA: getFrame32x32(1, 2),
  redPotionB: getFrame32x32(1, 3),
  bluePotionA: getFrame32x32(2, 2),
  bluePotionB: getFrame32x32(2, 3),
  greenPotionA: getFrame32x32(3, 2),
  greenPotionB: getFrame32x32(3, 3),
  yellowPotionA: getFrame32x32(4, 2),
  yellowPotionB: getFrame32x32(4, 3),
  coin1: getFrame16x16(1, 9),
  coin2: getFrame16x16(2, 9),
  coin3: getFrame16x16(3, 9),
  coin4: getFrame16x16(4, 9),
  chestClosed: getFrame32x32(2, 6),
  chestFull: getFrame32x32(4, 7),
  chestEmpty: getFrame32x32(4, 6),
});

const chipSet = new SpriteSet(chipImg, {
  wall1: getFrame32x32(2, 2),
  wall2: getFrame32x32(3, 2),
  wall3: getFrame32x32(4, 2),
});

const spriteSets: Record<string, SpriteSet> = {
  playersSet,
  monstersSmallSet,
  monstersMediumSet,
  monstersLargeSet,
  weaponsSet,
  itemsSet,
  chipSet,
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
