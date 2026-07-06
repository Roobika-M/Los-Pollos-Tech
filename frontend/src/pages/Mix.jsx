import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Mix(){
    const navigate = useNavigate();
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
        <div className="page">
            <button className="page-back" onClick={() => navigate("/home")}>&larr; Lab</button>

            <div className="eyebrow">Los Pollos Tech</div>
            <h1 className="page-title">The Mix</h1>
            <p className="page-subtitle">Combine two reactants. Observe the yield.</p>

            <div className="panel form-panel" style={{ marginBottom: 40 }}>
                <div className="field">
                    <label>Reactant One</label>
                    <input type="text" placeholder="Reactant One" value={reactantOne} onChange={(event) => setReactantOne(event.target.value)}/>
                </div>
                <div className="field">
                    <label>Reactant Two</label>
                    <input type="text" placeholder="Reactant Two" value={reactantTwo} onChange={(event) => setReactantTwo(event.target.value)}/>
                </div>
                <button className="btn-outline" onClick={handleMix}>Synthesize</button>
            </div>

            {message && <p className="status-msg err" style={{ marginBottom: 32 }}>{message}</p>}

            <div className="reaction-list">
                {reactions.map((reaction) => (
                <div className="panel reaction-card" key={reaction.id}>
                    <h3>{reaction.product}</h3>
                    <p className="row"><span className="tag">Reaction Type</span>{reaction.reactionType}</p>
                    <p className="row"><span className="tag">Conditions</span>{reaction.conditions}</p>
                    <p className="row"><span className="tag">Description</span>{reaction.description}</p>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Mix;
