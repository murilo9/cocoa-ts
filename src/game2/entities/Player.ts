import { Ellipse } from "detect-collisions";
import { Collider } from "../../lib/Collider";
import { Camera } from "../../lib/Camera";
import { GameInput } from "../../lib/GameInput";
import { Animation } from "../../lib/Animation";
import { GameUI } from "../../lib/GameUI";

const START_POS_X = 0;
const START_POS_Y = 0;
const SPEED = 2;
const X_PIVOT = 8;
const Y_PIVOT = 32;

const playerWalkAnimation = new Animation(
  "mainSpriteset",
  ["playerMaleWalk1", "playerMaleWalk2", "playerMaleWalk3", "playerMaleWalk4"],
  6
);

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
          spriteSetName: "mainSpriteset",
          frameName: "playerMaleIdle",
        },
      },
      new Ellipse({ x: START_POS_X, y: START_POS_Y }, 6, 6)
    );
    // Attaches camera to the player
    Camera.attach(this);
  }

  onInit(): void {
    // Move player if keys are pressed
    GameInput.addAxis1Listener((axis) => {
      this.xSpeed = axis.x * SPEED;
      this.ySpeed = -axis.y * SPEED;
      // Update player direction based on xSpeed direction
      // if (axis.x !== 0) {
      //   this.xScale = axis.x * SCALE;
      // }
      // If player is moving, set sprite to animation
      if (axis.x !== 0 || axis.y !== 0) {
        this.sprite = { type: "animation", animation: playerWalkAnimation };
        this.flipX = axis.x === -1;
      }
      // Is player is not moving, set sprite to idle
      else {
        this.sprite = {
          type: "static",
          spriteSetName: "mainSpriteset",
          frameName: "playerMaleIdle",
        };
      }
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
