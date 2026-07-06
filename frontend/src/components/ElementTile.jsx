function ElementTile({ number, symbol, mass, size = "md" }) {
  return (
    <div className={`element-tile ${size === "lg" ? "tile-lg" : ""}`}>
      <span className="atomic-number">{number}</span>
      <span className="symbol">{symbol}</span>
      <span className="mass">{mass}</span>
    </div>
  );
}

export default ElementTile;
