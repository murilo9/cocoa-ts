import { Animation } from "../../../lib/Animation";
import {
  AnimationSpriteConfig,
  StaticSpriteConfig,
} from "../../../lib/Graphic";
import { Enemy } from "./Enemy";

const buildEnemyData = (
  spriteSet: string,
  idleFrame: string,
  animationFrames: string[],
  animationSpeed: number
) => ({
  idleSprite: {
    type: "static",
    spriteSetName: spriteSet,
    frameName: idleFrame,
  } as StaticSpriteConfig,
  animationConfig: {
    type: "animation",
    animation: new Animation(spriteSet, animationFrames, animationSpeed),
  } as AnimationSpriteConfig,
});

export class DarkSorcerer extends Enemy {
  constructor(startX: number, startY: number) {
    const enemyData = buildEnemyData(
      "monstersMediumSet",
      "darkSorcererIdle",
      ["darkSorcererWalk1", "darkSorcererWalk2", "darkSorcererWalk3"],
      8
    );
    super(
      startX,
      startY,
      enemyData.idleSprite,
      enemyData.animationConfig,
      "medium",
      1
    );
  }
}

export class Orc extends Enemy {
  constructor(startX: number, startY: number) {
    const enemyData = buildEnemyData(
      "monstersSmallSet",
      "orcIdle",
      ["orcWalk1", "orcWalk2", "orcWalk3"],
      8
    );
    super(
      startX,
      startY,
      enemyData.idleSprite,
      enemyData.animationConfig,
      "small",
      1
    );
  }
}

export class OrcButcher extends Enemy {
  constructor(startX: number, startY: number) {
    const enemyData = buildEnemyData(
      "monstersSmallSet",
      "orcButcherIdle",
      ["orcButcherWalk1", "orcButcherWalk2", "orcButcherWalk3"],
      8
    );
    super(
      startX,
      startY,
      enemyData.idleSprite,
      enemyData.animationConfig,
      "small",
      1
    );
  }
}

export class OrcWizard extends Enemy {
  constructor(startX: number, startY: number) {
    const enemyData = buildEnemyData(
      "monstersSmallSet",
      "orcWizardIdle",
      ["orcWizardWalk1", "orcWizardWalk2", "orcWizardWalk3"],
      8
    );
    super(
      startX,
      startY,
      enemyData.idleSprite,
      enemyData.animationConfig,
      "small",
      1
    );
  }
}
