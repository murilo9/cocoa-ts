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
export const Room1 = new Room({ environment: new System() }).appendEntities(
  roomInitialEntities,
  "environment"
);
