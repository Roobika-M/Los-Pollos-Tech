import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HazardStripe from "../components/HazardStripe";

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
      const response = await axios.post(`http://localhost:8080/los/add`, {
        reactantOne,
        reactantTwo,
        product,
        reactionType,
        conditions,
        description,
      });

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

  const fields = [
    { label: "Reactant One", value: reactantOne, set: setReactantOne, placeholder: "e.g. Sodium" },
    { label: "Reactant Two", value: reactantTwo, set: setReactantTwo, placeholder: "e.g. Chlorine" },
    { label: "Product", value: product, set: setProduct, placeholder: "e.g. Sodium Chloride" },
    { label: "Reaction Type", value: reactionType, set: setReactionType, placeholder: "e.g. Synthesis" },
    { label: "Conditions", value: conditions, set: setConditions, placeholder: "e.g. Heat, 400°C" },
    { label: "Description", value: description, set: setDescription, placeholder: "Field notes on the procedure" },
  ];

  return (
    <div className="app-shell">
      <HazardStripe thin />

      <div className="page-hero tight">
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="page-toolbar">
            <a className="back-link" href="/home" onClick={(event) => {
              event.preventDefault();
              navigate("/home");
            }}>
              Back to control panel
            </a>
            <span className="label-tag">FIELD LOG ENTRY</span>
          </div>

          <div className="page-copy" style={{ marginBottom: "22px" }}>
            <h1 style={{ fontSize: "clamp(26px, 4.5vw, 42px)" }}>Log a new procedure</h1>
            <p className="muted" style={{ margin: 0, lineHeight: 1.65 }}>
              Every detail matters. Incomplete entries will not clear review.
            </p>
          </div>

          <div className="panel panel-rivets surface-panel">
            {fields.map((field) => (
              <div className="field-group" key={field.label}>
                <label className="field-label">{field.label}</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(event) => field.set(event.target.value)}
                />
              </div>
            ))}

            <button className="btn-hazard" style={{ width: "100%", marginTop: "6px" }} onClick={addReaction}>
              Commit to Ledger
            </button>

            {message && (
              <div className={`status-line ${message.includes("successfully") ? "ok" : "warn"}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReaction;
