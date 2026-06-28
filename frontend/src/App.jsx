import { useState } from "react";
import Button from "./Button";

function App() {
  const [text, setText] = useState("Say my name");

  return (
    <div>
      <h3>{text}</h3>
      <Button
        onClick={() => setText("You're god damn right")}
      />
    </div>
  );
}

export default App;