import {useState} from "react";
import axios from "axios";

function AddReaction(){
    const [reactantOne, setReactantOne] = useState("");
    const [reactantTwo, setReactantTwo] = useState("");
    const [product, setProduct] = useState("");
    const [reactionType, setReactionType] = useState("");
    const [conditions, setConditions] = useState("");
    const [description, setDescription] = useState("");
    const addReaction = async () => {
        try{
            const response = await axios.post("http://localhost:8080/los/add", {reactantOne,
        reactantTwo,
        product,
        reactionType,
        conditions,
        description,});
        console.log(response.data);
        alert("Reaction added");
        }
        catch(error){
            console.error(error);
            alert("failed to add");
        }
    };
    return(
        <>
        <h3>Your Re-actions</h3>
        <input type = "text" placeholder = "reactant one" value = {reactantOne} onChange = {(event) => setReactantOne(event.target.value)}/>
        <input type = "text" placeholder = "reactant two" value = {reactantTwo} onChange = {(event) => setReactantTwo(event.target.value)}/>
        <input type = "text" placeholder = "product" value = {product} onChange = {(event) => setProduct(event.target.value)}/>
        <input type = "text" placeholder = "reaction type" value = {reactionType} onChange = {(event) => setReactionType(event.target.value)}/>
        <input type = "text" placeholder = "conditions" value = {conditions} onChange = {(event) => setConditions(event.target.value)}/>
        <input type = "text" placeholder = "description" value = {description} onChange = {(event) => setDescription(event.target.value)}/>
        <button onClick = {addReaction}>Add +</button>
        </>
    );
}

export default AddReaction;