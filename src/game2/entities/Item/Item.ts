import { StaticSpriteConfig } from "../../../lib/Graphic";

export enum ItemLabel {
  weapon = "weapon",
}

export type DamageType = "slashig" | "blunt" | "piercing";

export interface Item {
  readonly sprite: StaticSpriteConfig;
  readonly name: string;
  readonly id: string;
  readonly iconHeightOffset: number;

  /**
   * Called when primary action is executed
   * @returns True if item should be removed (consumed)
   */
  onPrimaryClick?: () => Promise<void | true>;
  /**
   * Called when secondary action is executed
   * @returns True if item should be removed (consumed)
   */
  onSecondaryClick?: () => Promise<void | true>;
}

export interface Weapon {
  readonly damageType: DamageType;
  readonly damageMin: number;
  readonly damageMax: number;
}
