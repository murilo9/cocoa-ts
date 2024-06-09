import { Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { GameUI } from "../lib/GameUI";

export function UI() {
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
    </>
  );
}
