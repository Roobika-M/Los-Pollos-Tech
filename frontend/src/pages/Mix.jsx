import { useState } from "react";
import axios from "axios";
import HazardStripe from "../components/HazardStripe";
import ReactionChamber3D from "../components/ReactionChamber3D";

function Mix() {
  const [reactantOne, setReactantOne] = useState("");
  const [reactantTwo, setReactantTwo] = useState("");
  const [reactions, setReactions] = useState([]);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState("");
  const [reactionType, setReactionType] = useState("");
  const [conditions, setConditions] = useState("");
  const [description, setDescription] = useState("");

  // UI-only flag: drives the 3D chamber's "mixing" animation while a
  // request is in flight. Does not affect the request or its handling.
  const [isMixing, setIsMixing] = useState(false);

  const handleMix = async () => {
    setIsMixing(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/los/mix?reactantOne=${reactantOne}&reactantTwo=${reactantTwo}`
      );
      setMessage(""); {/*clears error message*/}
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

      <div className="container" style={{ paddingTop: "40px" }}>
        <span className="label-tag">MIXING STATION</span>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 40px)", marginTop: "14px" }}>
          Los Pollos Tech
        </h1>
        <p className="muted" style={{ maxWidth: "560px", marginTop: "8px", marginBottom: "32px" }}>
          Enter two reactants below. The chamber will confirm whether a known
          reaction exists on file.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 380px) 1fr",
            gap: "28px",
            alignItems: "start",
          }}
          className="mix-grid"
        >
          <div className="panel panel-rivets" style={{ padding: "24px" }}>
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

      <style>{`
        @media (max-width: 760px) {
          .mix-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Mix;
