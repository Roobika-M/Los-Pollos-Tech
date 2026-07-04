import { useNavigate } from "react-router-dom";
import HazardStripe from "../components/HazardStripe";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HazardStripe />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 20px",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(159,224,0,0.08), transparent 65%), var(--charcoal)",
        }}
      >
        <span className="label-tag" style={{ marginBottom: "22px" }}>
          RESTRICTED ACCESS · SITE 74B
        </span>

        <h1
          style={{
            fontSize: "clamp(40px, 8vw, 84px)",
            lineHeight: 1,
            maxWidth: "900px",
          }}
        >
          The purest process
          <br />
          <span className="glow-text">yields the purest result.</span>
        </h1>

        <p
          className="muted"
          style={{
            maxWidth: "520px",
            marginTop: "22px",
            fontSize: "17px",
            lineHeight: 1.6,
          }}
        >
          A private compound catalog for precision reactions. Every batch logged.
          Every measurement exact. Enter the lab to begin work.
        </p>

        <button
          className="btn-hazard"
          style={{ marginTop: "34px" }}
          onClick={() => navigate("/home")}
        >
          Enter the Lab &rarr;
        </button>

        <div className="readout" style={{ marginTop: "40px", opacity: 0.7 }}>
          TEMP: STABLE &nbsp;·&nbsp; VENTILATION: ON &nbsp;·&nbsp; YIELD TARGET: 99.1%
        </div>
      </div>

      <HazardStripe thin />
    </div>
  );
}

export default Landing;
