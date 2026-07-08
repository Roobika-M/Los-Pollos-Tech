/** One line in the Recent Activity feed: a product name plus the
 * reaction type that produced it. Purely presentational. */
function ActivityRow({ product, reactionType }) {
  return (
    <div className="activity-row">
      <span className="activity-row__dot" aria-hidden="true" />
      <span className="activity-row__text">
        <strong>{product || "Untitled"}</strong> logged
        {reactionType ? ` · ${reactionType}` : ""}
      </span>
    </div>
  );
}

export default ActivityRow;
