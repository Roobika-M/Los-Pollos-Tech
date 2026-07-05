import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HazardStripe from "../components/HazardStripe";

function ViewReactions() {
  const navigate = useNavigate();
  const [reactions, setReactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadReactions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/los/get");
        if (!ignore) {
          setReactions(response.data);
          setMessage("");
        }
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setMessage("Unable to fetch reactions.");
        }
      }
    };

    void loadReactions();

    return () => {
      ignore = true;
    };
  }, []);

  const deleteReaction = async (id) => {
    await axios.delete(`http://localhost:8080/los/delete/${id}`);

    try {
      const response = await axios.get("http://localhost:8080/los/get");
      setReactions(response.data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to refresh reactions.");
    }
  };

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
            <span className="label-tag">CASE FILES</span>
          </div>

          <div className="page-copy">
            <h1 style={{ fontSize: "clamp(26px, 4.5vw, 42px)" }}>Saved reactions</h1>
            <p className="muted" style={{ margin: 0, lineHeight: 1.65 }}>
              Every batch on record, catalogued for reference.
            </p>
          </div>

          <div className="summary-strip">
            <div className="summary-item">
              <span className="readout">RECORDS</span>
              <strong>{reactions.length}</strong>
            </div>
            <div className="summary-item">
              <span className="readout">ARCHIVE</span>
              <strong>READY</strong>
            </div>
            <div className="summary-item">
              <span className="readout">STATUS</span>
              <strong style={{ color: "var(--toxic-hot)" }}>SYNCED</strong>
            </div>
          </div>

          {message && <div className="status-line warn">{message}</div>}

          {reactions.length === 0 ? (
            <div className="panel panel-rivets surface-panel" style={{ textAlign: "center" }}>
              <p className="muted" style={{ margin: 0 }}>
                No reactions found. The ledger is empty.
              </p>
            </div>
          ) : (
            <div className="card-grid">
              {reactions.map((reaction) => (
                <div key={reaction.id} className="panel panel-rivets surface-panel">
                  <div className="label-tag" style={{ marginBottom: "12px" }}>
                    FILE #{reaction.id}
                  </div>

                  <h3 style={{ fontSize: "18px" }}>{reaction.product}</h3>

                  <p className="readout" style={{ margin: "10px 0 4px" }}>
                    REACTANTS: {reaction.reactantOne} + {reaction.reactantTwo}
                  </p>
                  <p className="readout" style={{ margin: "4px 0" }}>
                    TYPE: {reaction.reactionType}
                  </p>
                  <p className="readout" style={{ margin: "4px 0" }}>
                    CONDITIONS: {reaction.conditions}
                  </p>

                  <p className="muted" style={{ fontSize: "14px", marginTop: "10px", lineHeight: 1.5 }}>
                    {reaction.description}
                  </p>

                  <button className="btn-ghost" style={{ marginTop: "16px", width: "100%" }} onClick={() => deleteReaction(reaction.id)}>
                    Destroy Record
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewReactions;
