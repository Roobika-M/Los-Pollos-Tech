import { useLocation } from "react-router-dom";
import { useSmokeNavigate } from "./SmokeTransition";

const LINKS = [
  { to: "/home", label: "Lab" },
  { to: "/mix", label: "Mix" },
  { to: "/view", label: "Database" },
  { to: "/about", label: "About" },
];

/**
 * Minimal top navigation for the dashboard and everything past it.
 * Reuses the smoke-veil transition so moving between sections stays
 * consistent with the rest of the app's pacing — nothing here is an
 * instant cut.
 */
function Navigation() {
  const smokeNavigate = useSmokeNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="dash-nav">
      <button className="dash-nav__brand" onClick={() => smokeNavigate("/home")}>
        Los Pollos Tech
      </button>

      <ul className="dash-nav__links">
        {LINKS.map((link) => (
          <li key={link.to}>
            <button
              className={`dash-nav__link${pathname === link.to ? " is-active" : ""}`}
              onClick={() => smokeNavigate(link.to)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
