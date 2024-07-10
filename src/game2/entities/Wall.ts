import { Box } from "detect-collisions";
import { Collider } from "../../lib/Collider";
import { DrawableArgs } from "../../lib/Graphic";

export class Wall extends Collider {
  constructor(args: DrawableArgs) {
    const { x, y } = args;
    super(args, new Box({ x, y }, 16, 16, { isStatic: true }));
  }

  onInit(): void {
    this.sprite = {
      type: "static",
      spriteSetName: "chipSet",
      frameName: "wall2",
    };
    this.xPivot = 4;
    this.yPivot = 16;
    this.drawIndex = this.y + this.yPivot;
  }
}
