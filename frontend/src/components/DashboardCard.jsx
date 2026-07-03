function DashboardCard({title,description,buttonText,onClick}){
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
        <button onClick = {onClick}>
            {buttonText}
        </button>
        </div>
    );
}

export default DashboardCard;