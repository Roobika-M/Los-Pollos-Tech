import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    return(
        <>
        <h1>home is where heart is (walt is too 😉)</h1>
        <button onClick = {() => navigate("/mix")}>
            Mix elements
        </button>
        <button onClick = {() => navigate("/add")}>
            Add reaction
        </button>
        <button onClick = {() => navigate("/view")}>
            Saved files
        </button>
        </>
    ); 
}

export default Home;