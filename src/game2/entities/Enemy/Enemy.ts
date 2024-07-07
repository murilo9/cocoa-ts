import { Ellipse } from "detect-collisions";
import { Collider } from "../../../lib/Collider";
import {
  AnimationSpriteConfig,
  StaticSpriteConfig,
} from "../../../lib/Graphic";

type EnemySize = "small" | "medium" | "large";

const collisionRadius: Record<EnemySize, number> = {
  small: 5,
  medium: 5,
  large: 8,
};

const pivot = {
  x: {
    small: 8,
    medium: 8,
    large: 16,
  },
  y: {
    small: 16,
    medium: 32,
    large: 64,
  },
};

export class Enemy extends Collider {
  constructor(
    startX: number,
    startY: number,
    idleSprite: StaticSpriteConfig,
    private walkAnimation: AnimationSpriteConfig,
    size: EnemySize
  ) {
    // Movement initializers
    super(
      {
        x: startX,
        y: startY,
        xPivot: pivot.x[size],
        yPivot: pivot.y[size],
        sprite: idleSprite,
      },
      new Ellipse(
        { x: startX, y: startY },
        collisionRadius[size],
        collisionRadius[size]
      )
    );
    // Initializes the actual sprite
    this.sprite = idleSprite;
  }

  onInit() {
    this.sprite = this.walkAnimation;
  }
}
