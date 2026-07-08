import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SmokeTransition.css";

const SmokeNavigateContext = createContext(null);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Timings must stay in sync with the keyframe durations in
// SmokeTransition.css (smoke-cover / smoke-clear).
const TIMING = {
  cover: 650,
  clear: 850,
};
const REDUCED_TIMING = { cover: 220, clear: 220 };

/**
 * Wraps the routed part of the app. Renders the smoke veil once, at
 * the top of the stack, and exposes `useSmokeNavigate()` so any page
 * can trigger a "roll the smoke across, swap the route behind it,
 * clear the smoke" transition instead of an instant navigation.
 *
 * Usage:
 *   const smokeNavigate = useSmokeNavigate();
 *   <button onClick={() => smokeNavigate("/about")}>About</button>
 *
 * `videoSrc` is optional: if you generate/license an actual
 * left-to-right smoke video asset, pass its URL here and the veil
 * will play that clip instead of the procedural CSS layers, using
 * the exact same cover/hold/clear timing and pointer-blocking.
 */
export function SmokeTransitionProvider({ children, videoSrc = null }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("idle"); // idle | covering | clearing
  const [nonce, setNonce] = useState(0);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const smokeNavigate = useCallback(
    (to) => {
      clearTimers();
      const t = prefersReducedMotion() ? REDUCED_TIMING : TIMING;

      setNonce((n) => n + 1);
      setPhase("covering");

      timers.current.push(
        setTimeout(() => {
          navigate(to);
          setPhase("clearing");
          timers.current.push(setTimeout(() => setPhase("idle"), t.clear));
        }, t.cover)
      );
    },
    [navigate]
  );

  return (
    <SmokeNavigateContext.Provider value={smokeNavigate}>
      {children}

      <div
        key={`${phase}-${nonce}`}
        className={`smoke-veil smoke-veil--${phase}`}
        aria-hidden="true"
      >
        {videoSrc ? (
          <video
            className="smoke-veil__video"
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        ) : (
          <>
            <div className="smoke-veil__layer smoke-veil__layer--back" />
            <div className="smoke-veil__layer smoke-veil__layer--mid" />
            <div className="smoke-veil__layer smoke-veil__layer--front" />
            <div className="smoke-veil__grain" />
            <div className="smoke-veil__edge" />
          </>
        )}
      </div>
    </SmokeNavigateContext.Provider>
  );
}

/** Returns a `smokeNavigate(path)` function. Must be called from a
 * component rendered inside <SmokeTransitionProvider>. */
export function useSmokeNavigate() {
  const ctx = useContext(SmokeNavigateContext);
  if (!ctx) {
    throw new Error("useSmokeNavigate must be used within a SmokeTransitionProvider");
  }
  return ctx;
}
