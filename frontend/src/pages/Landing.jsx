import { useNavigate } from "react-router-dom";
import LosPollosLogo from "../components/LosPollosLogo";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page landing-page">
      <div className="landing-page__backdrop" aria-hidden="true" />

      <div className="landing-page__hero panel">
        <div className="eyebrow">Los Pollos Tech</div>
        <LosPollosLogo />

        <div className="hero-tagline">PURE. STABLE. LEGAL.</div>

        <button className="btn-outline" onClick={() => navigate("/home")}>
          Enter the Lab
        </button>
      </div>

      <div className="landing-page__smoke" aria-hidden="true" />
    </div>
  );
}

export default Landing;
