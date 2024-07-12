import { Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { GameUI } from "../../lib/GameUI";
import InventoryUI from "./InventoryUI";

export default function UI() {
  const [text, setText] = useState("");

  useEffect(() => {
    GameUI.setUIEventListener("onTextInput", (newText: string) => {
      setText((prevText) => prevText + newText);
    });
  }, []);

  return (
    <>
      <Button>Fancy button</Button>
      <p>{text}</p>
      <InventoryUI />
    </>
  );
}
