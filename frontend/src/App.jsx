import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SmokeTransitionProvider } from "./components/SmokeTransition";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Mix from "./pages/Mix";
import AddReaction from "./pages/AddReaction";
import ViewReactions from "./pages/ViewReactions";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App (){
  return (
    <BrowserRouter>
      {/* SmokeTransitionProvider needs to sit inside the router (it
          calls useNavigate) and around every route it should be able
          to smoke-transition into.

          Flow: "/" (Landing) plays the cinematic IntroSequence once
          per session and then navigates straight to "/home" (the
          Dashboard) — there is no separate landing screen in
          between. IntroSequence's own exit animation (smoke expand,
          blur, fade to black) covers that hand-off, so it never
          reads as an instant cut. */}
      <SmokeTransitionProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mix" element={<Mix />} />
          <Route path="/add" element={<AddReaction />} />
          <Route path="/view" element={<ViewReactions />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </SmokeTransitionProvider>
    </BrowserRouter>
  );
}

export default App;
