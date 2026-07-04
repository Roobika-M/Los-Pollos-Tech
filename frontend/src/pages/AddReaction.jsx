import { useState } from "react";
import axios from "axios";

function AddReaction() {
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
    <div>
      <h2>Add a New Re-action</h2>
      <input
        type="text"
        placeholder="Reactant One"
        value={reactantOne}
        onChange={(event) => setReactantOne(event.target.value)}
      />
      <br /><br />
      <input
        type="text"
        placeholder="Reactant Two"
        value={reactantTwo}
        onChange={(event) => setReactantTwo(event.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Product"
        value={product}
        onChange={(event) => setProduct(event.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Reaction Type"
        value={reactionType}
        onChange={(event) => setReactionType(event.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Conditions"
        value={conditions}
        onChange={(event) => setConditions(event.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <br /><br />

      <button onClick={addReaction}>
        Add Reaction
      </button>

      <p>{message}</p>
    </div>
  );
}

export default AddReaction;