import { useNavigate } from "react-router-dom";
import ElementTile from "../components/ElementTile";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ justifyContent: "center", paddingTop: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        <div className="hero-word-row">
          <span className="hero-word">los</span>
        </div>

        <div className="hero-word-row">
          <ElementTile number={84} symbol="Po" mass={209} size="lg" />
          <span className="hero-word">llos</span>
        </div>

        <div className="hero-word-row">
          <ElementTile number={52} symbol="Te" mass={127.6} size="lg" />
          <span className="hero-word">ch</span>
        </div>

        <div className="hero-tagline">PURE. STABLE. LEGAL.</div>

        <button className="btn-outline" onClick={() => navigate("/home")}>
          Enter the Lab
        </button>
      </div>
    </div>
  );
}

export default Landing;
