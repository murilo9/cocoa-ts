import { useEffect } from "react";
import { Item } from "../entities/Item/Item";
import { Game } from "../../lib/Game";

export default function ItemSlotUI({
  item,
  index,
}: {
  item: Item;
  index: number;
}) {
  const canvasId = `itemSlot_${index}`;

  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext("2d");
      const spriteSets = Game.getSpriteSets();
      const spriteSet = spriteSets[item.sprite.spriteSetName];
      const frame = spriteSet.getFrame(item.sprite.frameName);
      const image = spriteSet.getImage();
      const sx = frame[0];
      const sy = frame[1];
      const sWidth = frame[2] - sx;
      const sHeight = frame[3] - sy;
      ctx?.save();
      ctx?.translate(16, -item.iconHeightOffset);
      ctx?.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
      ctx?.restore();
    }
  }, []);

  return <canvas width="64" height="64" id={canvasId}></canvas>;
}
