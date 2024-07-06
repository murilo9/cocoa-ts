import { Animation } from "../../../lib/Animation";
import { AnimationSpriteConfig } from "../../../lib/Graphic";

const rogueMaleWalkAnimation = new Animation(
  "mainSpriteset",
  ["rogueMaleWalk1", "rogueMaleWalk2", "rogueMaleWalk3", "rogueMaleWalk4"],
  6
);
const rogueFemaleWalkAnimation = new Animation(
  "mainSpriteset",
  [
    "rogueFemaleWalk1",
    "rogueFemaleWalk2",
    "rogueFemaleWalk3",
    "rogueFemaleWalk4",
  ],
  6
);
const knightFemaleWalkAnimation = new Animation(
  "mainSpriteset",
  [
    "knightFemaleWalk1",
    "knightFemaleWalk2",
    "knightFemaleWalk3",
    "knightFemaleWalk4",
  ],
  6
);
const knightMaleWalkAnimation = new Animation(
  "mainSpriteset",
  ["knightMaleWalk1", "knightMaleWalk2", "knightMaleWalk3", "knightMaleWalk4"],
  6
);

const wizardFemaleWalkAnimation = new Animation(
  "mainSpriteset",
  [
    "wizardFemaleWalk1",
    "wizardFemaleWalk2",
    "wizardFemaleWalk3",
    "wizardFemaleWalk4",
  ],
  6
);
const wizardMaleWalkAnimation = new Animation(
  "mainSpriteset",
  ["wizardMaleWalk1", "wizardMaleWalk2", "wizardMaleWalk3", "wizardMaleWalk4"],
  6
);

export const playerAnimations: Record<string, Animation> = {
  rogueMaleWalkAnimation,
  rogueFemaleWalkAnimation,
  knightFemaleWalkAnimation,
  knightMaleWalkAnimation,
  wizardFemaleWalkAnimation,
  wizardMaleWalkAnimation,
};
