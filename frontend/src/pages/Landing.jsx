import { useNavigate } from "react-router-dom";
import HazardStripe from "../components/HazardStripe";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <HazardStripe />

      <div className="page-hero" style={{ flex: 1 }}>
        <div className="vapor-field">
          <span />
          <span />
          <span />
        </div>

        <div className="container hero-grid">
          <div className="hero-copy" style={{ textAlign: "left" }}>
            <span className="label-tag" style={{ width: "fit-content" }}>
              RESTRICTED ACCESS &middot; SITE 74B
            </span>

            <h1
              style={{
                fontSize: "clamp(48px, 9vw, 112px)",
                lineHeight: 0.92,
                maxWidth: "10ch",
                filter: "drop-shadow(0 6px 30px rgba(0,0,0,0.7))",
              }}
            >
              The purest process
              <br />
              <span className="glow-text">yields the purest result.</span>
            </h1>

            <p
              className="muted"
              style={{
                maxWidth: "580px",
                fontSize: "18px",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              A private compound catalog for precision reactions. Every batch logged.
              Every measurement exact. Enter the lab to begin work.
            </p>

            <div className="hero-actions" style={{ marginTop: "18px" }}>
              <button
                className="btn-hazard"
                style={{ fontSize: "16px", padding: "18px 36px" }}
                onClick={() => navigate("/home")}
              >
                Enter the Lab &rarr;
              </button>
              <button
                className="btn-ghost btn-secondary"
                style={{ fontSize: "16px", padding: "18px 28px" }}
                onClick={() => navigate("/view")}
              >
                Open Ledger
              </button>
            </div>

            <div className="hero-stats" style={{ marginTop: "20px" }}>
              <div className="stat-card">
                <span className="readout">TEMP</span>
                <strong className="crystal-text">STABLE</strong>
              </div>
              <div className="stat-card">
                <span className="readout">VENTILATION</span>
                <strong style={{ color: "var(--toxic-hot)" }}>ONLINE</strong>
              </div>
              <div className="stat-card">
                <span className="readout">YIELD TARGET</span>
                <strong style={{ color: "var(--mustard)" }}>99.1%</strong>
              </div>
            </div>
          </div>

          <aside className="panel panel-rivets hero-panel">
            <div>
              <span className="inline-note">Operational Snapshot</span>
              <h2 style={{ marginTop: "12px", fontSize: "28px" }}>The lab is live.</h2>
              <p className="muted" style={{ margin: "8px 0 0", lineHeight: 1.6 }}>
                Access the reaction console, review the stored catalog, and keep every
                batch traceable from entry to export.
              </p>
            </div>

            <div className="panel-row">
              <span className="readout">STATUS</span>
              <span style={{ color: "var(--toxic-hot)" }}>ACTIVE</span>
            </div>
            <div className="panel-row">
              <span className="readout">VAULT</span>
              <span className="crystal-text">SYNCED</span>
            </div>
            <div className="panel-row">
              <span className="readout">ACCESS</span>
              <span style={{ color: "var(--mustard)" }}>AUTHORIZED</span>
            </div>
          </aside>
        </div>
      </div>

      <HazardStripe thin />
    </div>
  );
}

export default Landing;
