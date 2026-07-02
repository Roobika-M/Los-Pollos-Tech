import {useState} from "react";
import axios from "axios";

function Mix(){
    const [reactantOne, setReactantOne] = useState("");
    const [reactantTwo, setReactantTwo] = useState("");
    const [reactions, setReactions] = useState([]);
    const [message, setMessage] = useState("");
    const [product, setProduct] = useState("");
    const [reactionType, setReactionType] = useState("");
    const [conditions, setConditions] = useState("");
    const [description, setDescription] = useState("");
    const handleMix = async () => {
        try{
        const response = await axios.get(`http://localhost:8080/los/mix?reactantOne=${reactantOne}&reactantTwo=${reactantTwo}`);
        setMessage("");     {/*clears error message*/}
        setReactions(response.data);
        }
        catch (error) {
        if(error.response?.status === 404)
            setMessage("no reaction found :)");
        else
            setMessage("something went wrong");
        }
    }

    return (
        <div>
        <h1>Los Pollos Tech</h1>
            <input type = "text" placeholder="Reactant One" value = {reactantOne} onChange={(event) => setReactantOne(event.target.value)}/>   {/*event.target.value contains the updated value and sends*/}
            <input type = "text" placeholder="Reactant Two" value = {reactantTwo} onChange={(event) => setReactantTwo(event.target.value)}/>
            <button onClick={handleMix}>Mix</button>
            <p>{message}</p>
            {reactions.map((reaction) => (
            <div key = {reaction.id}>
                <h3>{reaction.product}</h3>
                <p><strong>Reaction Type:</strong> {reaction.reactionType}</p>
                <p><strong>Conditions:</strong> {reaction.conditions}</p>
                <p><strong>Description:</strong> {reaction.description}</p>
            </div>
            ))}
        </div>
    );
}

export default Mix;