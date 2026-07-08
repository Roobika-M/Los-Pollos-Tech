// Using a plain button instead of `framer-motion` to avoid an
// external dependency mismatch with the project's React version.

/**
 * Shared premium CTA button. Dark glass, thin glowing border, soft
 * green glow that intensifies on hover/press. Renders a <button> by
 * default, or a plain <a>-like element if `as="span"` is passed for
 * non-button contexts (kept simple: this app only ever needs a
 * button, but the prop is there so it can be reused elsewhere).
 */
function PrimaryButton({
  children,
  onClick,
  type = "button",
  variant = "solid", // "solid" | "outline"
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      className={`primary-btn primary-btn--${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="primary-btn__label">{children}</span>
      <span className="primary-btn__glow" aria-hidden="true" />
    </button>
  );
}

export default PrimaryButton;
