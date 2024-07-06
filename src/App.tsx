import { useEffect } from "react";
import { init, exit } from "./game2";

function App() {
  useEffect(() => {
    init();
    return exit;
  }, []);
  return <></>;
}

export default App;
