import { Box, Stack } from "@mui/joy";
import { useEffect, useState } from "react";
import { GameUI } from "../../lib/GameUI";
import { PlayerInventory } from "../entities/Player/PlayerInventory";
import { Item } from "../entities/Item/Item";
import { Circle } from "@mui/icons-material";
import ItemSlotUI from "./ItemSlotUI";
import { GameInput } from "../../lib/GameInput";

export default function InventoryUI() {
  const [playerInventory, setPlayerInventory] = useState<Array<Item | null>>(
    PlayerInventory.getItems()
  );
  const [selectedIndex, setSelectedIndex] = useState(
    PlayerInventory.getSelectedIndex()
  );

  useEffect(() => {
    GameUI.setUIEventListener(
      "onPlayerInventoryUpdate",
      ({ index, items }: { items: Array<Item | null>; index: number }) => {
        setPlayerInventory(items);
        setSelectedIndex(index);
      }
    );
    GameInput.addMouseWheelListener((direction) => {
      switch (direction) {
        case "up":
          PlayerInventory.onIndexDecrease();
          break;
        case "down":
          PlayerInventory.onIndexIncrease();
      }
    });
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={3}
      sx={{ position: "fixed", bottom: 24, left: 0, width: "100%" }}
    >
      {playerInventory.map((item, index) => (
        <Stack
          key={index}
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "64px",
            height: "64px",
            outline:
              index === selectedIndex ? "3px solid rgba(0, 0, 0, 0.4)" : "none",
            boxSizing: "border-box",
            p: 1,
            bgcolor: "rgba(0, 0, 0, 0.07)",
            borderRadius: "12px",
          }}
        >
          {item ? (
            <ItemSlotUI item={item} index={index} />
          ) : (
            <Circle sx={{ color: "gray" }} />
          )}
        </Stack>
      ))}
      {selectedIndex}
    </Stack>
  );
}
