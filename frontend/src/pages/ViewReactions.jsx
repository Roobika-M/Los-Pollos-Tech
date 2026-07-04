import { useState, useEffect } from "react";
import axios from "axios";
import HazardStripe from "../components/HazardStripe";

function ViewReactions() {
  const [reactions, setReactions] = useState([]);
  const [message, setMessage] = useState("");

  const getReactions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/los/get`);
      setReactions(response.data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to fetch reactions.");
    }
  };

  useEffect(() => {
    getReactions();
  }, []);

  const deleteReaction = async (id) => {
    const response = await axios.delete(`http://localhost:8080/los/delete/${id}`);
    getReactions();
  };

  return (
    <div className="app-shell">
      <HazardStripe thin />

      <div className="container" style={{ paddingTop: "40px" }}>
        <span className="label-tag">CASE FILES</span>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 40px)", marginTop: "14px" }}>
          Saved reactions
        </h1>
        <p className="muted" style={{ marginTop: "8px", marginBottom: "28px" }}>
          Every batch on record, catalogued for reference.
        </p>

        {message && <div className="status-line warn">{message}</div>}

        {reactions.length === 0 ? (
          <div className="panel" style={{ padding: "28px", textAlign: "center" }}>
            <p className="muted" style={{ margin: 0 }}>
              No reactions found. The ledger is empty.
            </p>
          </div>
        ) : (
          <div className="card-grid">
            {reactions.map((reaction) => (
              <div key={reaction.id} className="panel panel-rivets" style={{ padding: "20px" }}>
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

                <button
                  className="btn-ghost"
                  style={{ marginTop: "16px", width: "100%" }}
                  onClick={() => deleteReaction(reaction.id)}
                >
                  Destroy Record
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewReactions;
