function DashboardCard({title,description,onClick}){
    return(
        <div onClick = {onClick}
            style = {{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                cursor: "pointer",
                width: "250px"
            }}
        >
        <h2>{title}</h2>
        <p>{description}</p>
        </div>
    );
}

export default DashboardCard;