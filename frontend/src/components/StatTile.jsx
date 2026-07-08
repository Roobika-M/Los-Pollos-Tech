import GlassPanel from "./GlassPanel";

/** One number, one label. Used in the Statistics section. */
function StatTile({ value, label, delay = 0 }) {
  return (
    <GlassPanel className="stat-tile" delay={delay}>
      <div className="stat-tile__value">{value}</div>
      <div className="stat-tile__label">{label}</div>
    </GlassPanel>
  );
}

export default StatTile;
