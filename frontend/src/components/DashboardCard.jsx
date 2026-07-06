import ElementTile from "./ElementTile";

function DashboardCard({ title, description, onClick, number, symbol, mass }) {
  return (
    <div className="dash-card panel" onClick={onClick}>
      <ElementTile number={number} symbol={symbol} mass={mass} />
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
