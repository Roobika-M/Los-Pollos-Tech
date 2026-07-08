// Avoid importing `framer-motion` to keep the dependency tree
// minimal and compatible with the project's React version.

/**
 * Generic dark-glass surface used everywhere on the dashboard —
 * section wrappers, cards, stat tiles. Fades and lifts in the first
 * time it scrolls into view, then stays put (no re-triggering, so
 * scrolling back up and down doesn't make the UI restless).
 *
 * `as` lets a section render as <section> for semantics while a
 * stat tile or card still gets the same visual treatment via <div>.
 */
function GlassPanel({
  children,
  as = "div",
  className = "",
  delay = 0,
  hoverLift = false,
  ...rest
}) {
  const Component = as;

  return (
    <Component
      className={`glass-panel ${hoverLift ? "glass-panel--hover" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default GlassPanel;
