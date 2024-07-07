import { Ellipse } from "detect-collisions";
import { Collider } from "../../lib/Collider";

const X_PIVOT = 8;
const Y_PIVOT = 32;

export class Pillar extends Collider {
  constructor({ x, y }: { x: number; y: number }) {
    // Movement initializers
    super(
      {
        x,
        y,
        xPivot: X_PIVOT,
        yPivot: Y_PIVOT,
        sprite: {
          type: "static",
          spriteSetName: "monstersMediumSet",
          frameName: "darkSorcererIdle",
        },
        drawIndex: y + Y_PIVOT,
      },
      new Ellipse({ x, y }, 8, 8, undefined, { isStatic: true })
    );
  }
}
