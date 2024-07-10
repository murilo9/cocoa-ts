import { System } from "detect-collisions";
import { Room } from "../../lib/Room";
import { Entity } from "../../lib/Entity";
import { Player } from "../entities/Player/Player";
import {
  DarkSorcerer,
  Orc,
  OrcButcher,
  OrcWizard,
} from "../entities/Enemy/enemiesDatabase";
import { Wall } from "../entities/Wall";

/* Room initial entities definition */
const roomInitialEntities: Entity[] = [
  new Player(),
  new DarkSorcerer(50, 100),
  new Orc(100, 100),
  new OrcButcher(150, 100),
  new OrcWizard(200, 100),
];

const wallMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
];

export class Dungeon extends Room {
  public onInit(): void {
    this.collisionSystems = {
      environment: new System(),
    };
    this.appendEntities(roomInitialEntities, "environment");
    this.appendEntitiesFromMap(
      { sizeX: 16, sizeY: 16, xInitialPos: -5, yInitialPos: -5 },
      [Wall],
      wallMap,
      "environment"
    );
  }
}
