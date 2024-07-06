import { Animation } from "../../../lib/Animation";
import { AnimationSpriteConfig } from "../../../lib/Graphic";

export type PlayerGender = "Male" | "Female";
export type PlayerClass = "rogue" | "knight" | "wizard";

export interface PlayerData {
  gender: PlayerGender;
  class: PlayerClass;
}
