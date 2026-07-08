import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroSequence from "../components/IntroSequence";

const INTRO_SEEN_KEY = "pollos-intro-seen";

/**
 * Route: "/". This is the ONLY thing that lives at the root — there
 * is no separate landing page anymore. The flow is strictly:
 *
 *   App starts -> IntroSequence (cinematic cold-open) -> "/home"
 *
 * IntroSequence owns its own "Enter the Lab" button and its own
 * smoke-expand / blur / fade-to-black exit animation (see
 * IntroSequence.jsx + IntroSequence.css). Once that exit finishes,
 * onComplete() fires here and we navigate straight into the
 * dashboard. Nothing renders in between.
 *
 * The intro is a once-per-session cold open: if it already played
 * this session, landing on "/" again (e.g. via a stray link, or the
 * browser back button) skips straight to the dashboard instead of
 * replaying it. A hard refresh clears sessionStorage, so it plays
 * again from a truly cold start.
 */
function Landing() {
  const navigate = useNavigate();

  const [alreadySeen] = useState(() => {
    try {
      return Boolean(sessionStorage.getItem(INTRO_SEEN_KEY));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (alreadySeen) {
      navigate("/home", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* private browsing / storage disabled — just skip persisting */
    }
    navigate("/home", { replace: true });
  };

  // Already seen this session: render nothing while the redirect
  // above kicks in, rather than flashing the intro for a frame.
  if (alreadySeen) return null;

  return <IntroSequence onComplete={finishIntro} />;
}

export default Landing;
