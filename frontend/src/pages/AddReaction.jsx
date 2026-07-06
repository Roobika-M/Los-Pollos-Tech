import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddReaction() {
  const navigate = useNavigate();
  const [reactantOne, setReactantOne] = useState("");
  const [reactantTwo, setReactantTwo] = useState("");
  const [product, setProduct] = useState("");
  const [reactionType, setReactionType] = useState("");
  const [conditions, setConditions] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const addReaction = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/los/add`,
        {
          reactantOne,
          reactantTwo,
          product,
          reactionType,
          conditions,
          description,
        }
      );

      console.log(response.data);

      setMessage("Reaction added successfully!");

      // Clear the form
      setReactantOne("");
      setReactantTwo("");
      setProduct("");
      setReactionType("");
      setConditions("");
      setDescription("");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 400) {
        setMessage("Please fill all the fields correctly:)");
      } else if (error.response?.status === 409) {
        setMessage("This reaction already exists:)");
      } else {
        setMessage("Failed to add reaction:)");
      }
    }
  };

  return (
    <div className="page">
      <button className="page-back" onClick={() => navigate("/home")}>&larr; Lab</button>

      <div className="eyebrow">Los Pollos Tech</div>
      <h1 className="page-title">New Formula</h1>
      <p className="page-subtitle">Log a new reaction to the permanent record.</p>

      <div className="panel form-panel">
        <div className="field">
          <label>Reactant One</label>
          <input
            type="text"
            placeholder="Reactant One"
            value={reactantOne}
            onChange={(event) => setReactantOne(event.target.value)}
          />
        </div>

        <div className="field">
          <label>Reactant Two</label>
          <input
            type="text"
            placeholder="Reactant Two"
            value={reactantTwo}
            onChange={(event) => setReactantTwo(event.target.value)}
          />
        </div>

        <div className="field">
          <label>Product</label>
          <input
            type="text"
            placeholder="Product"
            value={product}
            onChange={(event) => setProduct(event.target.value)}
          />
        </div>

        <div className="field">
          <label>Reaction Type</label>
          <input
            type="text"
            placeholder="Reaction Type"
            value={reactionType}
            onChange={(event) => setReactionType(event.target.value)}
          />
        </div>

        <div className="field">
          <label>Conditions</label>
          <input
            type="text"
            placeholder="Conditions"
            value={conditions}
            onChange={(event) => setConditions(event.target.value)}
          />
        </div>

        <div className="field">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <button className="btn-outline" onClick={addReaction}>
          Commit to Record
        </button>

        {message && (
          <p className={`status-msg ${message.includes("successfully") ? "ok" : "err"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddReaction;
