import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewReactions() {
  const navigate = useNavigate();
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
  }

  return (
    <div className="page">
      <button className="page-back" onClick={() => navigate("/home")}>&larr; Lab</button>

      <div className="eyebrow">Los Pollos Tech</div>
      <h1 className="page-title">The Vault</h1>
      <p className="page-subtitle">Every reaction on file.</p>

      {message && <p className="status-msg err" style={{ marginBottom: 24 }}>{message}</p>}

      <div className="reaction-list">
        {reactions.length === 0 ? (
          <p className="empty-state">No reactions found.</p>
        ) : (
          reactions.map((reaction) => (
            <div className="panel reaction-card" key={reaction.id}>
              <h3>{reaction.product}</h3>

              <p className="row">
                <span className="tag">Reactants</span>
                {reaction.reactantOne} + {reaction.reactantTwo}
              </p>

              <p className="row">
                <span className="tag">Reaction Type</span>
                {reaction.reactionType}
              </p>

              <p className="row">
                <span className="tag">Conditions</span>
                {reaction.conditions}
              </p>

              <p className="row">
                <span className="tag">Description</span>
                {reaction.description}
              </p>

              <div style={{ marginTop: 8 }}>
                <button className="btn-danger" onClick={() => deleteReaction(reaction.id)}>
                  Purge
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewReactions;
