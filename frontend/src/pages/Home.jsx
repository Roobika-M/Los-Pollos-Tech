import { useNavigate } from "react-router-dom";
import Card from "../components/DashboardCard";
import HazardStripe from "../components/HazardStripe";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <HazardStripe thin />

      <div className="container" style={{ paddingTop: "48px" }}>
        <span className="label-tag">CONTROL PANEL</span>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", marginTop: "14px" }}>
          Choose your station
        </h1>
        <p className="muted" style={{ maxWidth: "560px", marginTop: "10px", marginBottom: "36px" }}>
          Three stations, one ledger. Combine compounds, log new procedures, or review
          the case files on record.
        </p>

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
  );
}

export default Home;
