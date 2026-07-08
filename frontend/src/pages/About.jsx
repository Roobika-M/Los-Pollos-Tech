import InnerNav from "../components/InnerNav";
import InnerFooter from "../components/InnerFooter";
import InnerWatermark from "../components/InnerWatermark";

function About() {
  return (
    <div className="ip-page">
      <InnerWatermark />
      <InnerNav />

      <div className="ip-content">
        <div className="ip-eyebrow" style={{ marginTop: 64 }}>
          Batch record · Est. present day
        </div>
        <h1 className="ip-hero-title">The Lab Behind the Logo</h1>
        <p className="ip-hero-sub">
          Los Pollos Tech started the way most good batches do: a small
          team, a short list of things worth doing properly, and no
          patience for anything cut with filler.
        </p>

        <div className="ip-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="ip-card">
            <p className="ip-card__tag">Origin</p>
            <h3>Why chemistry</h3>
            <p>
              Good engineering and good chemistry share a method: measure
              twice, control every variable you can, and never ship a
              batch you wouldn't sign your name to. We borrowed the
              language because the discipline already fit.
            </p>
          </div>

          <div className="ip-card">
            <p className="ip-card__tag">Standard</p>
            <h3>Purity over speed</h3>
            <p>
              We'd rather hand back one clean, well-tested release than
              five that need cutting. Every project runs through the
              same checks before it leaves the lab — no exceptions for
              deadlines.
            </p>
          </div>
        </div>

        <div className="ip-card" style={{ width: "100%", maxWidth: 720, marginBottom: 40 }}>
          <p className="ip-card__tag">Process</p>
          <h3>How a project runs</h3>
          <p>
            Every engagement starts with a short brief — the raw
            reagents. From there we synthesize a working version fast,
            distill it against real feedback until nothing extra is
            left in the mixture, and hand over something stable enough
            to build on for years, not quarters.
          </p>
        </div>
      </div>

      <InnerFooter />
    </div>
  );
}

export default About;
