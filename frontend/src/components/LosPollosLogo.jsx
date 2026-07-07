import ElementTile from "./ElementTile";
import "./LosPollosLogo.css";

/**
 * The "Los Pollos Tech" wordmark, styled after the Breaking Bad
 * title card: a serif metallic wordmark stacked three lines deep,
 * staircased down-and-right, with two periodic-table squares
 * standing in for "Po" and "Te".
 *
 *   Los
 *      [Po]llos
 *         [Te]ch
 */
function LosPollosLogo() {
  return (
    <div className="pollos-logo">
      <div className="pollos-logo__stack">
        <div className="pollos-logo__reveal-smoke" aria-hidden="true" />

        <div className="pollos-logo__row pollos-logo__row--one">
          <span className="pollos-logo__word">Los</span>
        </div>

        <div className="pollos-logo__row pollos-logo__row--two">
          <ElementTile variant="hero" number={84} symbol="Po" mass="(209)" charge="+4" />
          <span className="pollos-logo__word">llos</span>
        </div>

        <div className="pollos-logo__row pollos-logo__row--three">
          <ElementTile variant="hero" number={52} symbol="Te" mass="127.60" charge="-2" />
          <span className="pollos-logo__word">ch</span>
        </div>
      </div>
    </div>
  );
}

export default LosPollosLogo;
