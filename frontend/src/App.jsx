import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Mix from "./pages/Mix";
import AddReaction from "./pages/AddReaction";
import ViewReactions from "./pages/ViewReactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mix" element={<Mix />} />
        <Route path="/add" element={<AddReaction />} />
        <Route path="/view" element={<ViewReactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
