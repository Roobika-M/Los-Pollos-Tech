import ElementTile from "./ElementTile";

/**
 * Large hero at the top of the dashboard. Same restrained,
 * one-fade-at-a-time reveal language as the intro, just compressed
 * into a page header instead of a full-screen cold open.
 */
function DashboardHero() {
  return (
    <div className="dash-hero">
      <div className="dash-hero__accents" aria-hidden="true">
        <ElementTile number={80} symbol="Hg" mass="200.6" size="sm" />
        <ElementTile number={15} symbol="P" mass="30.97" size="sm" />
      </div>

      <div className="eyebrow">Los Pollos Tech</div>

      <h1 className="dash-hero__title">The Lab</h1>

      <p className="dash-hero__subtitle">
        Every process, every record, one bench. Select where to work.
      </p>
    </div>
  );
}

export default DashboardHero;
