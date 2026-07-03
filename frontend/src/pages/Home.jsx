import { useNavigate } from "react-router-dom";
import Card from "../components/DashboardCard";

function Home(){
    const navigate = useNavigate();
    return(
        <>
        <h1>home is where heart is (walt is too 😉)</h1>
        <Card title = "Mix elements" description="Combine two reactants and discover the product." buttonText="Open Lab" onClick = {() => navigate("/mix")}/>
        <Card title = "Add reaction" description = "Add a new chemical reaction" buttonText="Add" onClick = {() => navigate("/add")}/>
        <Card title = "View reactions" description = "Browse all saved reactions." buttonText = "View" onClick = {() => navigate("/view")}/>
        </>
    ); 
}

export default Home;