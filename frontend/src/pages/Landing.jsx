import { useNavigate } from "react-router-dom";

function Landing(){
    const navigate  = useNavigate();
    return(
        <div>
            <h1>*insert breaking bad here</h1>
            <button onClick = {() => navigate("/home")}>
                Enter the lab
            </button>
        </div>
    );
}

export default Landing;