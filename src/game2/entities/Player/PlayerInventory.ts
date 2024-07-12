import { Entity } from "../../../lib/Entity";
import { GameUI } from "../../../lib/GameUI";
import { Item } from "../Item/Item";
import { Dagger, LongSword, ShortSword } from "../Item/itemsDatabase";

export class PlayerInventory extends Entity {
  private static items: Array<Item | null> = [
    new Dagger(),
    new ShortSword(),
    new LongSword(),
    null,
    null,
    null,
    null,
    null,
  ];
  private static selectedIndex = 0;

  private static emitUpdateEvent() {
    GameUI.dispatchUIEvent("onPlayerInventoryUpdate", {
      items: this.items,
      index: this.selectedIndex,
    });
  }

  public static getItems() {
    return this.items;
  }

  public static getSelectedIndex() {
    return this.selectedIndex;
  }

  public static pushItem(item: Item) {
    if (this.items.length < 8) {
      this.items.push(item);
    }
    this.emitUpdateEvent();
  }

  // Called when user clicks the primary action button
  public static async onPrimaryClick() {
    const removeItem = await this.items[
      this.selectedIndex
    ]?.onPrimaryClick?.call(this);
    if (removeItem) {
      this.items[this.selectedIndex] = null;
    }
    this.emitUpdateEvent();
  }

  // Called when user clicks the secondary action button
  public static async onSecondaryClick() {
    const removeItem = await this.items[
      this.selectedIndex
    ]?.onSecondaryClick?.call(this);
    if (removeItem) {
      this.items[this.selectedIndex] = null;
    }
    this.emitUpdateEvent();
  }

  // Called when selcted item index increases
  public static onIndexIncrease() {
    this.selectedIndex += 1;
    if (this.selectedIndex >= this.items.length) {
      this.selectedIndex = 0;
    }
    this.emitUpdateEvent();
  }

  // Called when selcted item index decreases
  public static onIndexDecrease() {
    this.selectedIndex -= 1;
    if (this.selectedIndex < 0) {
      this.selectedIndex = this.items.length - 1;
    }
    this.emitUpdateEvent();
  }
}
