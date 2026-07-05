import { useNavigate } from "react-router-dom";
import Card from "../components/DashboardCard";
import HazardStripe from "../components/HazardStripe";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <HazardStripe thin />

      <div className="page-hero tight">
        <div className="vapor-field">
          <span />
          <span />
          <span />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="page-copy">
            <span className="label-tag">CONTROL PANEL</span>
            <h1 style={{ fontSize: "clamp(30px, 5.5vw, 54px)" }}>Choose your station</h1>
            <p className="muted" style={{ maxWidth: "620px", margin: 0, lineHeight: 1.65 }}>
              Three stations, one ledger. Combine compounds, log new procedures, or review
              the case files on record.
            </p>
          </div>

          <div className="summary-strip">
            <div className="summary-item">
              <span className="readout">STATIONS</span>
              <strong>3 ONLINE</strong>
            </div>
            <div className="summary-item">
              <span className="readout">LEDGER</span>
              <strong>LIVE</strong>
            </div>
            <div className="summary-item">
              <span className="readout">STATUS</span>
              <strong style={{ color: "var(--toxic-hot)" }}>STABLE</strong>
            </div>
          </div>

          <div className="card-grid">
            <Card
              title="Mix Elements"
              description="Combine two reactants under controlled conditions and observe the yield."
              buttonText="Open Chamber"
              onClick={() => navigate("/mix")}
            />
            <Card
              title="Add Reaction"
              description="Log a new procedure into the compound ledger for future batches."
              buttonText="New Entry"
              onClick={() => navigate("/add")}
            />
            <Card
              title="View Reactions"
              description="Browse every recorded reaction currently on file."
              buttonText="Open Case Files"
              onClick={() => navigate("/view")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
