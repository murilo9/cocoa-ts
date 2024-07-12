import { Ellipse } from "detect-collisions";
import { Collider } from "../../../lib/Collider";
import { Camera } from "../../../lib/Camera";
import { GameInput } from "../../../lib/GameInput";
import { GameUI } from "../../../lib/GameUI";
import { PlayerClass, PlayerData, PlayerGender } from "./PlayerData";
import { playerAnimations } from "./animations";

const START_POS_X = 0;
const START_POS_Y = 0;
const SPEED = 2;
const X_PIVOT = 16;
const Y_PIVOT = 64;

export class Player extends Collider implements PlayerData {
  gender: PlayerGender = "Male";
  class: PlayerClass = "wizard";

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
          spriteSetName: "playersSet",
          frameName: "rogueFemaleIdle", // Won't necessarily be the actual sprite
        },
      },
      new Ellipse({ x: START_POS_X, y: START_POS_Y }, 16, 16)
    );
    // Initializes the actual sprite
    this.sprite = {
      type: "static",
      spriteSetName: "playersSet",
      frameName: this.getIdleSpriteName(),
    };
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
        this.sprite = {
          type: "animation",
          animation: this.getAnimation(),
        };
        this.flipX = axis.x === -1;
      }
      // Is player is not moving, set sprite to idle
      else {
        this.sprite = {
          type: "static",
          spriteSetName: "playersSet",
          frameName: this.getIdleSpriteName(),
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

  private getAnimation = () => {
    const animationName = this.class + this.gender + "WalkAnimation";
    return playerAnimations[animationName];
  };

  private getIdleSpriteName = () => {
    return this.class + this.gender + "Idle";
  };
}
