import { Ellipse } from "detect-collisions";
import { Collider } from "../../../lib/Collider";
import {
  AnimationSpriteConfig,
  StaticSpriteConfig,
} from "../../../lib/Graphic";

type EnemySize = "small" | "medium" | "large";

const getRandomAxisMovement = (vectorSpeed: number) => {
  const angle = Math.random() * 360;
  return {
    x: vectorSpeed * Math.cos(angle),
    y: vectorSpeed * Math.sin(angle),
  };
};

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
  private walkTimeout: NodeJS.Timeout | null = null;

  constructor(
    startX: number,
    startY: number,
    private idleSprite: StaticSpriteConfig,
    private walkAnimation: AnimationSpriteConfig,
    size: EnemySize,
    private walkSpeed: number
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

  private onChangeDirection(firstTime?: boolean) {
    // There is a 1/3 chance of walking in random direction
    if (Math.random() > 0.33 || firstTime) {
      const randomAxisMovement = getRandomAxisMovement(this.walkSpeed);
      this.xSpeed = randomAxisMovement.x;
      this.ySpeed = randomAxisMovement.y;
      this.flipX = randomAxisMovement.x < 0;
      this.sprite = this.walkAnimation;
    } else {
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.sprite = this.idleSprite;
    }
    const time = Math.floor(Math.random() * 5000);
    if (this.walkTimeout) {
      clearTimeout(this.walkTimeout);
    }
    setTimeout(() => {
      this.onChangeDirection();
    }, time);
  }

  onInit() {
    this.onChangeDirection(true);
  }

  onRun(): void {
    // Update drawIndex
    this.drawIndex = this.y + this.yPivot;
  }
}
