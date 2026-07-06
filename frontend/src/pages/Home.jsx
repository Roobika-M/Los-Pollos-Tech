import { useNavigate } from "react-router-dom";
import Card from "../components/DashboardCard";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="eyebrow">Los Pollos Tech</div>
      <h1 className="page-title">The Lab</h1>
      <p className="page-subtitle">Select a process to continue.</p>

      <div className="card-grid">
        <Card
          title="Mix elements"
          description="Combine two reactants and discover the product."
          number={80}
          symbol="Hg"
          mass={200.6}
          onClick={() => navigate("/mix")}
        />
        <Card
          title="Add reaction"
          description="Log a new chemical reaction to the record."
          number={15}
          symbol="P"
          mass={30.97}
          onClick={() => navigate("/add")}
        />
        <Card
          title="View reactions"
          description="Browse every saved reaction on file."
          number={18}
          symbol="Ar"
          mass={39.95}
          onClick={() => navigate("/view")}
        />
      </div>
    </div>
  );
}

export default Home;
