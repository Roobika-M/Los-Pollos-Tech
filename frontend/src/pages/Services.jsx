import InnerNav from "../components/InnerNav";
import InnerFooter from "../components/InnerFooter";
import InnerWatermark from "../components/InnerWatermark";

const FORMULAS = [
  {
    code: "FORMULA — SX-01",
    title: "Synthesis",
    desc:
      "New products, built from a blank bench. We take a brief through architecture, build, and a working release — fast enough to test with real users, solid enough to keep.",
  },
  {
    code: "FORMULA — DL-14",
    title: "Distillation",
    desc:
      "Existing systems, run back through the still. We strip out what's slowing a codebase down and hand back something lighter, faster, and easier to reason about.",
  },
  {
    code: "FORMULA — SC-92",
    title: "Scale-Up",
    desc:
      "Small batch to full production. Load testing, infrastructure, and monitoring so what worked for a hundred users still holds at a hundred thousand.",
  },
];

function Services() {
  return (
    <div className="ip-page">
      <InnerWatermark />
      <InnerNav />

      <div className="ip-content">
        <div className="ip-eyebrow" style={{ marginTop: 64 }}>
          Three formulas, one standard
        </div>
        <h1 className="ip-hero-title">Services</h1>
        <p className="ip-hero-sub">
          Each engagement runs one of three processes. Pick the one that
          matches where your product is today.
        </p>

        <div className="ip-grid">
          {FORMULAS.map((f) => (
            <div className="ip-card" key={f.code}>
              <p className="ip-card__tag">{f.code}</p>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <InnerFooter />
    </div>
  );
}

export default Services;
