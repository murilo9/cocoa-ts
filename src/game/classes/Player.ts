import { Ellipse } from "detect-collisions";
import { Camera } from "../../lib/Camera";
import { Collider } from "../../lib/Collider";
import { GameInput } from "../../lib/GameInput";
import { GameUI } from "../../lib/GameUI";

const START_POS_X = 250;
const START_POS_Y = 250;
const SCALE = 2;
const SPEED = 2;
const X_PIVOT = 12;
const Y_PIVOT = 18 * SCALE;

export class Player extends Collider {
  constructor() {
    // Movement initializers
    super(
      {
        x: START_POS_X,
        y: START_POS_Y,
        xPivot: X_PIVOT,
        yPivot: Y_PIVOT,
        sprite: {
          type: "static",
          spriteSetName: "humanCharset",
          frameName: "downSkinny",
        },
        xScale: SCALE,
        yScale: SCALE,
      },
      new Ellipse({ x: START_POS_X, y: START_POS_Y }, 6, 2)
    );
    // Attaches camera to the player
    Camera.attach(this);
  }

  onInit(): void {
    // Move player if keys are pressed
    GameInput.addAxis1Listener((axis) => {
      console.log("axis1 listener", axis);
      this.xSpeed = axis.x * SPEED;
      this.ySpeed = -axis.y * SPEED;
      // Update player direction based on xSpeed direction
      if (axis.x !== 0) {
        this.setSpriteConfig({
          frameName: "rightSkinny",
        });
        this.xScale = axis.x * SCALE;
      }
      if (axis.y === 1) {
        this.setSpriteConfig({
          frameName: "upSkinny",
        });
      }
      if (axis.y === -1) {
        this.setSpriteConfig({
          frameName: "downSkinny",
        });
      }
      // Update player animation based on movement
    });
    GameInput.addKeyListener("press", "g", () =>
      GameUI.dispatchUIEvent("onTextInput", "foo")
    );
  }

  onRun() {
    // Update drawIndex
    this.drawIndex = this.y + this.yPivot;
  }
}
