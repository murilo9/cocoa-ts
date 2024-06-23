import { Animation } from "./Animation";
import { Entity } from "./Entity";

export type StaticSpriteConfig = {
  type: "static";
  spriteSetName: string;
  frameName: string;
};

export type AnimationSpriteConfig = {
  type: "animation";
  animation: Animation;
};

export type DrawableArgs = {
  x?: number;
  y?: number;
  xPivot?: number;
  yPivot?: number;
  rotation?: number;
  xSpeed?: number;
  ySpeed?: number;
  drawIndex?: number;
  visible?: boolean;
  sprite: StaticSpriteConfig | AnimationSpriteConfig;
  flipX?: boolean;
  flipY?: boolean;
};

export class Drawable extends Entity {
  x: number;
  y: number;
  xPivot: number;
  yPivot: number;
  rotation: number;
  xSpeed: number;
  ySpeed: number;
  flipX?: boolean;
  flipY?: boolean;
  sprite: StaticSpriteConfig | AnimationSpriteConfig;
  drawIndex: number;
  visible: boolean;

  constructor(arg: DrawableArgs) {
    super();
    this.x = arg?.x || 0;
    this.y = arg?.y || 0;
    this.xPivot = arg?.xPivot || 0;
    this.yPivot = arg?.yPivot || 0;
    this.rotation = arg?.rotation || 0;
    this.xSpeed = arg?.xSpeed || 0;
    this.ySpeed = arg?.ySpeed || 0;
    this.drawIndex = arg?.drawIndex || 1;
    this.visible = arg?.visible || true;
    this.sprite = arg.sprite;
    this.flipX = false;
    this.flipY = false;
  }

  public setSpriteConfig({
    frameName,
    spriteSetName,
  }: {
    frameName?: string;
    spriteSetName?: string;
  }) {
    if (frameName) {
      (this.sprite as StaticSpriteConfig).frameName = frameName;
    }
    if (spriteSetName) {
      (this.sprite as StaticSpriteConfig).spriteSetName = spriteSetName;
    }
  }
}
