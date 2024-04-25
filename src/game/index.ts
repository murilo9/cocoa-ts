import mainSpriteSet from "./assets/main-spriteset.png";
import { Player } from "./classes/Player";
import { Pillar } from "./classes/Pillar";
import { System } from "detect-collisions";
import { debug } from "./debug";
import { InitialRoomUI } from "./ui/InitialRoomUI";
import { Game } from "../lib/Game";
import { GameConfig } from "../lib/GameConfig";
import { Room } from "../lib/Room";
import { SpriteSet } from "../lib/SpriteSet";

const gameConfig: GameConfig = {
  screenWidth: window.outerWidth,
  screenHeight: window.innerHeight,
  canvasElementId: "game-canvas",
  canvasBackgroundColor: "#CCCCCC",
};

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
};
const roomInitialEntities = [
  new Player(10, 10, 10, 10, 10, 10, 10),
  new Pillar({ x: -100, y: 100 }),
  new Pillar({ x: -100, y: -100 }),
  new Pillar({ x: 100, y: 100 }),
  new Pillar({ x: 100, y: -100 }),
];
const initialRoom = new Room(
  { environment: new System() },
  new InitialRoomUI()
).appendEntities(roomInitialEntities, "environment");

export const init = () => {
  Game.setup(initialRoom, spriteSets, gameConfig, debug);
  Game.start();
};

/**
 * Removes the #game-canvas and #game-ui elements. This should be executed on App's unmount (return value of useEffect).
 */
export const exit = () => {
  console.log("exit");
  const gameUI = document.getElementById("game-ui");
  if (gameUI) {
    gameUI.remove();
  }
  const gameCanvas = document.getElementById("game-canvas");
  if (gameCanvas) {
    gameCanvas.remove();
  }
};
