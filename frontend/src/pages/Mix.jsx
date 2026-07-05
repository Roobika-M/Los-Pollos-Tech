import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HazardStripe from "../components/HazardStripe";
import ReactionChamber3D from "../components/ReactionChamber3D";

function Mix() {
  const navigate = useNavigate();
  const [reactantOne, setReactantOne] = useState("");
  const [reactantTwo, setReactantTwo] = useState("");
  const [reactions, setReactions] = useState([]);
  const [message, setMessage] = useState("");

  // UI-only flag: drives the 3D chamber's animation while a request is in flight.
  const [isMixing, setIsMixing] = useState(false);

  const handleMix = async () => {
    setIsMixing(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/los/mix?reactantOne=${reactantOne}&reactantTwo=${reactantTwo}`
      );
      setMessage("");
      setReactions(response.data);
    } catch (error) {
      if (error.response?.status === 404) setMessage("no reaction found :)");
      else setMessage("something went wrong");
    } finally {
      setIsMixing(false);
    }
  };

  const chamberStatus = isMixing
    ? "mixing"
    : reactions.length > 0
      ? "success"
      : message === "no reaction found :)"
        ? "fail"
        : "idle";

  return (
    <div className="app-shell">
      <HazardStripe thin />

      <div className="page-hero tight">
        <div className="container">
          <div className="page-toolbar">
            <a
              className="back-link"
              href="/home"
              onClick={(event) => {
                event.preventDefault();
                navigate("/home");
              }}
            >
              Back to control panel
            </a>
            <span className="label-tag">MIXING STATION</span>
          </div>

          <div className="page-copy">
            <h1 style={{ fontSize: "clamp(26px, 4.5vw, 42px)" }}>Los Pollos Tech</h1>
            <p className="muted" style={{ maxWidth: "580px", margin: 0, lineHeight: 1.65 }}>
              Enter two reactants below. The chamber will confirm whether a known
              reaction exists on file.
            </p>
          </div>

          <div className="summary-strip">
            <div className="summary-item">
              <span className="readout">CHAMBER</span>
              <strong style={{ textTransform: "uppercase" }}>{chamberStatus}</strong>
            </div>
            <div className="summary-item">
              <span className="readout">MATCHES</span>
              <strong>{reactions.length}</strong>
            </div>
            <div className="summary-item">
              <span className="readout">MODE</span>
              <strong style={{ color: "var(--crystal)" }}>LIVE LOOKUP</strong>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(260px, 380px) 1fr",
              gap: "28px",
              alignItems: "start",
            }}
            className="mix-grid"
          >
            <div className="panel panel-rivets surface-panel">
              <div className="field-group">
                <label className="field-label">Reactant One</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="e.g. Sodium"
                  value={reactantOne}
                  onChange={(event) => setReactantOne(event.target.value)}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Reactant Two</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="e.g. Chlorine"
                  value={reactantTwo}
                  onChange={(event) => setReactantTwo(event.target.value)}
                />
              </div>

              <button className="btn-hazard" style={{ width: "100%" }} onClick={handleMix}>
                Initiate Reaction
              </button>

              {message && <div className="status-line warn">{message}</div>}

              {reactions.length > 0 && (
                <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  {reactions.map((reaction) => (
                    <div key={reaction.id} className="panel" style={{ padding: "16px" }}>
                      <div className="label-tag" style={{ marginBottom: "10px" }}>
                        YIELD CONFIRMED
                      </div>
                      <h3 style={{ fontSize: "17px" }}>{reaction.product}</h3>
                      <p className="readout" style={{ margin: "6px 0" }}>
                        TYPE: {reaction.reactionType}
                      </p>
                      <p className="readout" style={{ margin: "6px 0" }}>
                        CONDITIONS: {reaction.conditions}
                      </p>
                      <p className="muted" style={{ fontSize: "14px", marginTop: "8px" }}>
                        {reaction.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ReactionChamber3D status={chamberStatus} productName={reactions[0]?.product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mix;
