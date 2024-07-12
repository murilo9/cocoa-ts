import { StaticSpriteConfig } from "../../../lib/Graphic";
import { DamageType, Item, Weapon } from "./Item";

export class Dagger implements Weapon {
  id = "dagger";
  name = "Dagger";
  sprite: StaticSpriteConfig = {
    type: "static",
    spriteSetName: "weaponsSet",
    frameName: "dagger",
  };
  damageType: DamageType = "piercing";
  damageMin = 1;
  damageMax = 4;
  iconHeightOffset = 0;
}

export class ShortSword implements Weapon {
  id = "shortSword";
  name = "Short Sword";
  sprite: StaticSpriteConfig = {
    type: "static",
    spriteSetName: "weaponsSet",
    frameName: "shortSword",
  };
  damageType: DamageType = "piercing";
  damageMin = 3;
  damageMax = 6;
  iconHeightOffset = 8;
}

export class LongSword implements Weapon {
  id = "longSword";
  name = "Long Sword";
  sprite: StaticSpriteConfig = {
    type: "static",
    spriteSetName: "weaponsSet",
    frameName: "longSword",
  };
  damageType: DamageType = "piercing";
  damageMin = 4;
  damageMax = 8;
  iconHeightOffset = 0;
}
