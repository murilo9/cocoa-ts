import { useEffect } from "react";
import { init, exit } from "./game";

function App() {
  useEffect(() => {
    init();
    return exit;
  }, []);
  return <></>;
}

export default App;
