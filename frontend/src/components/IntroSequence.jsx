import { useEffect, useMemo, useRef, useState } from "react";
import ElementTile from "./ElementTile";
import "./IntroSequence.css";

/**
 * Full-screen cinematic cold-open, played once before the Landing
 * page reveals itself. Pure black -> dust -> periodic elements
 * drifting through frame -> green smoke -> a slow camera push ->
 * a second, deeper wave of elements -> everything clears except
 * Po/Te, which glide into position and assemble the wordmark ->
 * subtitle typed out letter by letter -> "Enter the Lab" button.
 *
 * Timings mirror the brief's timeline (in ms, from mount):
 *   0     black
 *   500   dust
 *   1000  wave 1 of elements
 *   2000  smoke
 *   3000  camera push
 *   4000  wave 2 (depth: blurred + sharp, near + far)
 *   6000  everything clears except Po / Te
 *   7000  Po/Te move into position, logo assembles
 *   8000  subtitle, letter by letter
 *   9000  "Enter the Lab" button
 *
 * Calls onComplete() once the viewer clicks through (or skips),
 * so the parent can mount the real Landing content behind it.
 */

const WAVE_1 = [
  ["Na", 11, "22.99"], ["Kr", 36, "83.80"], ["Hg", 80, "200.6"],
  ["Ne", 10, "20.18"], ["Ag", 47, "107.9"], ["Au", 79, "197.0"],
  ["Cl", 17, "35.45"], ["Ar", 18, "39.95"], ["Zn", 30, "65.38"],
  ["Fe", 26, "55.85"], ["He", 2, "4.003"], ["Cu", 29, "63.55"],
];

const WAVE_2 = [
  ["Pb", 82, "207.2"], ["Co", 27, "58.93"], ["Ag", 47, "107.9"],
  ["Hg", 80, "200.6"], ["Zn", 30, "65.38"], ["Fe", 26, "55.85"],
  ["Na", 11, "22.99"], ["Cl", 17, "35.45"],
];

const SUBTITLE = "PURE • STABLE • LEGAL";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Deterministic-ish scatter so tiles read as random but don't
 * relayout on every re-render. */
function scatter(list, seedOffset = 0) {
  return list.map(([symbol, number, mass], i) => {
    const seed = i * 37 + seedOffset;
    const rand = (n) => ((Math.sin(seed * n) + 1) / 2);
    return {
      symbol,
      number,
      mass,
      top: 8 + rand(1.3) * 80,
      left: 4 + rand(2.7) * 88,
      rotate: -30 + rand(3.1) * 60,
      scale: 0.55 + rand(4.4) * 0.7,
      blur: rand(5.9) > 0.55 ? rand(5.9) * 4 : 0,
      delay: rand(6.2) * 2.4,
      duration: 6 + rand(7.6) * 5,
    };
  });
}

function IntroSequence({ onComplete }) {
  const reduced = useRef(prefersReducedMotion()).current;
  const [stage, setStage] = useState(0);
  const [exiting, setExiting] = useState(false);
  const timers = useRef([]);

  const wave1 = useMemo(() => scatter(WAVE_1, 11), []);
  const wave2 = useMemo(() => scatter(WAVE_2, 53), []);
  const dust = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => {
        const rand = (n) => (Math.sin(i * n + 7) + 1) / 2;
        return {
          top: rand(1.1) * 100,
          left: rand(2.2) * 100,
          size: 1 + rand(3.3) * 2,
          delay: rand(4.4) * 6,
          duration: 8 + rand(5.5) * 10,
        };
      }),
    []
  );

  useEffect(() => {
    if (reduced) {
      // Respect reduced-motion: skip straight to the button, no
      // drifting/particle animation.
      setStage(9);
      return;
    }

    const schedule = [
      [500, 1], [1000, 2], [2000, 3], [3000, 4],
      [4000, 5], [6000, 6], [7000, 7], [8000, 8], [9000, 9],
    ];
    schedule.forEach(([ms, s]) => {
      timers.current.push(setTimeout(() => setStage(s), ms));
    });
    return () => timers.current.forEach(clearTimeout);
  }, [reduced]);

  const handleEnter = () => {
    if (exiting) return;
    setExiting(true);
    const t = reduced ? 260 : 900;
    setTimeout(() => onComplete?.(), t);
  };

  const handleSkip = () => handleEnter();

  return (
    <div
      className={`intro intro--stage-${stage}${exiting ? " intro--exiting" : ""}`}
      aria-label="Los Pollos Tech intro"
    >
      {stage > 0 && stage < 9 && !exiting && (
        <button className="intro__skip" onClick={handleSkip}>
          Skip
        </button>
      )}

      {/* camera-push wrapper: scales + drifts the whole scene forward */}
      <div className="intro__stage">
        {/* dust */}
        <div className="intro__dust" aria-hidden="true">
          {dust.map((d, i) => (
            <span
              key={i}
              className="intro__mote"
              style={{
                top: `${d.top}%`,
                left: `${d.left}%`,
                width: d.size,
                height: d.size,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
              }}
            />
          ))}
        </div>

        {/* smoke */}
        <div className="intro__smoke" aria-hidden="true">
          <div className="intro__smoke-layer intro__smoke-layer--a" />
          <div className="intro__smoke-layer intro__smoke-layer--b" />
          <div className="intro__smoke-layer intro__smoke-layer--c" />
        </div>

        {/* wave 1 of drifting elements */}
        <div className="intro__elements intro__elements--wave1" aria-hidden="true">
          {wave1.map((el, i) => (
            <div
              key={`w1-${i}`}
              className="intro__tile"
              style={{
                top: `${el.top}%`,
                left: `${el.left}%`,
                "--rot": `${el.rotate}deg`,
                "--scale": el.scale,
                animationDelay: `${el.delay}s`,
                animationDuration: `${el.duration}s`,
              }}
            >
              <ElementTile symbol={el.symbol} number={el.number} mass={el.mass} size="sm" />
            </div>
          ))}
        </div>

        {/* wave 2: deeper field, mixed blur for depth */}
        <div className="intro__elements intro__elements--wave2" aria-hidden="true">
          {wave2.map((el, i) => (
            <div
              key={`w2-${i}`}
              className="intro__tile intro__tile--depth"
              style={{
                top: `${el.top}%`,
                left: `${el.left}%`,
                "--rot": `${el.rotate}deg`,
                "--scale": el.scale * 1.1,
                filter: el.blur ? `blur(${el.blur}px)` : "none",
                animationDelay: `${el.delay}s`,
                animationDuration: `${el.duration + 2}s`,
              }}
            >
              <ElementTile symbol={el.symbol} number={el.number} mass={el.mass} size="sm" />
            </div>
          ))}
        </div>

        {/* Po / Te: present throughout, converge + assemble the wordmark */}
        <div className="intro__logo" aria-hidden={stage < 7}>
          <div className="intro__logo-row intro__logo-row--one">
            <span className="intro__word">Los</span>
          </div>
          <div className="intro__logo-row intro__logo-row--two">
            <div className="intro__anchor intro__anchor--po">
              <ElementTile variant="hero" number={84} symbol="Po" mass="(209)" charge="+4" />
            </div>
            <span className="intro__word">llos</span>
          </div>
          <div className="intro__logo-row intro__logo-row--three">
            <div className="intro__anchor intro__anchor--te">
              <ElementTile variant="hero" number={52} symbol="Te" mass="127.60" charge="-2" />
            </div>
            <span className="intro__word">ch</span>
          </div>
        </div>

        {/* subtitle, letter by letter */}
        <div className="intro__subtitle" aria-hidden={stage < 8}>
          {SUBTITLE.split("").map((ch, i) => (
            <span
              key={i}
              className="intro__letter"
              style={{ animationDelay: `${i * 0.045}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        {/* enter button */}
        <div className="intro__cta" aria-hidden={stage < 9}>
          <button className="btn-outline intro__enter" onClick={handleEnter}>
            Enter the Lab
          </button>
        </div>
      </div>
    </div>
  );
}

export default IntroSequence;
