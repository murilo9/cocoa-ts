import { System } from "detect-collisions";
import { Room } from "../../lib/Room";
import { Pillar } from "../classes/Pillar";
import { Player } from "../classes/Player";

/* Room initial entities definition */
const roomInitialEntities = [
  new Player(10, 10, 10, 10, 10, 10, 10),
  new Pillar({ x: -100, y: 100 }),
  new Pillar({ x: -100, y: -100 }),
  new Pillar({ x: 100, y: 100 }),
  new Pillar({ x: 100, y: -100 }),
];

/* Initial room definition */

export class World extends Room {
  public onInit(): void {
    this.collisionSystems = {
      environment: new System(),
    };
    this.appendEntities(roomInitialEntities, "environment");
  }
}
