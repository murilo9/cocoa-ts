import { Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { Game } from "../lib/Game";

export function GameUI() {
  const [text, setText] = useState("");

  useEffect(() => {
    Game.setUIEventListener("onTextInput", (newText: string) => {
      setText((prevText) => prevText + newText);
    });
  }, []);

  return (
    <>
      <Button>Fancy button</Button>
      <p>{text}</p>
    </>
  );
}
