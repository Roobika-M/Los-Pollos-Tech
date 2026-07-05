function DashboardCard({ title, description, onClick, buttonText }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onClick?.();
      }}
      className="panel panel-rivets dashboard-card"
      style={{
        padding: "26px 22px 22px",
        cursor: "pointer",
        minWidth: "220px",
      }}
    >
      <span className="inline-note">Lab Station</span>
      <div
        style={{
          width: "48px",
          height: "4px",
          background: "var(--toxic)",
          boxShadow: "0 0 8px var(--toxic)",
          margin: "14px 0 18px",
          borderRadius: "999px",
        }}
      />
      <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>{title}</h2>
      <p className="muted" style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
        {description}
      </p>
      <div
        className="readout"
        style={{
          marginTop: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <span>{buttonText ? buttonText.toUpperCase() : "OPEN STATION"}</span>
        <span style={{ color: "var(--mustard)" }}>→</span>
      </div>
    </div>
  );
}

export default DashboardCard;
