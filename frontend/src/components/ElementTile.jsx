/**
 * variant="hero" switches to the four-corner periodic-table layout
 * used by the "Los Pollos Tech" wordmark (mass top-left, atomic
 * number bottom-left, charge bottom-right, symbol centered) — see
 * LosPollosLogo.css. Default variant is untouched for dashboard use.
 */
function ElementTile({ number, symbol, mass, charge, size = "md", variant = "default" }) {
  if (variant === "hero") {
    return (
      <div className="element-tile element-tile--hero">
        <span className="mass">{mass}</span>
        <span className="symbol">{symbol}</span>
        <span className="atomic-number">{number}</span>
        {charge != null && <span className="charge">{charge}</span>}
      </div>
    );
  }

  return (
    <div className={`element-tile ${size === "lg" ? "tile-lg" : ""}`}>
      <span className="atomic-number">{number}</span>
      <span className="symbol">{symbol}</span>
      <span className="mass">{mass}</span>
    </div>
  );
}

export default ElementTile;
