import { useLocation } from "react-router-dom";
import { useSmokeNavigate } from "./SmokeTransition";

const LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

function InnerNav() {
  const smokeNavigate = useSmokeNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="ip-nav">
      <button className="ip-nav__brand" onClick={() => smokeNavigate("/")}>
        Los Pollos Tech
      </button>

      <ul className="ip-nav__links">
        {LINKS.map((link) => (
          <li key={link.to}>
            <button
              className={`ip-nav__link${pathname === link.to ? " is-active" : ""}`}
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

export default InnerNav;
