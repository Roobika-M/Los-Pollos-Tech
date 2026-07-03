import { useState, useEffect } from "react";
import axios from "axios";

function ViewReactions() {
  const [reactions, setReactions] = useState([]);
  const [message, setMessage] = useState("");

  const getReactions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/los/get");
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

  return (
    <div>
      <h1>Saved Reactions</h1>

      {message && <p>{message}</p>}

      {reactions.length === 0 ? (
        <p>No reactions found.</p>
      ) : (
        reactions.map((reaction) => (
          <div
            key={reaction.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "10px",
            }}
          >
            <h3>{reaction.product}</h3>

            <p>
              <strong>Reactants:</strong>{" "}
              {reaction.reactantOne} + {reaction.reactantTwo}
            </p>

            <p>
              <strong>Reaction Type:</strong> {reaction.reactionType}
            </p>

            <p>
              <strong>Conditions:</strong> {reaction.conditions}
            </p>

            <p>
              <strong>Description:</strong> {reaction.description}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewReactions;