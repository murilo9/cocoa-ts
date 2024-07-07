import { System } from "detect-collisions";
import { Room } from "../../lib/Room";
import { Entity } from "../../lib/Entity";
import { Player } from "../entities/Player/Player";
import { Pillar } from "../entities/Pillar";
import {
  DarkSorcerer,
  Orc,
  OrcButcher,
  OrcWizard,
} from "../entities/Enemy/enemiesDatabase";

/* Room initial entities definition */
const roomInitialEntities: Entity[] = [
  new Player(),
  new DarkSorcerer(50, 100),
  new Orc(100, 100),
  new OrcButcher(150, 100),
  new OrcWizard(200, 100),
];

export class Dungeon extends Room {
  public onInit(): void {
    this.collisionSystems = {
      environment: new System(),
    };
    this.appendEntities(roomInitialEntities, "environment");
  }
}
