import { System } from "detect-collisions";
import { Room } from "../../lib/Room";
import { Entity } from "../../lib/Entity";
import { Player } from "../entities/Player/Player";
import { Pillar } from "../entities/Pillar";

/* Room initial entities definition */
const roomInitialEntities: Entity[] = [
  new Player(),
  new Pillar({ x: 50, y: 100 }),
  new Pillar({ x: 100, y: 100 }),
];

export class Dungeon extends Room {
  public onInit(): void {
    this.collisionSystems = {
      environment: new System(),
    };
    this.appendEntities(roomInitialEntities, "environment");
  }
}
