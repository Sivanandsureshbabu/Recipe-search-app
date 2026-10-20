import { NavLink } from "react-router-dom";

export default function Navbar({ favouriteCount = 0 }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">M</span>
          <span className="brand-name">
            MIDNIGHT<span className="brand-light">KITCHEN</span>
          </span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/recipes"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `nav-link favourite-nav ${isActive ? "active" : ""}`
            }
          >
            <span aria-hidden="true">♡</span> Saved
            <span className="nav-count">{favouriteCount}</span>
          </NavLink>
        </nav>

        <NavLink to="/recipes" className="nav-cta">
          Find a recipe <span>↗</span>
        </NavLink>
      </div>
    </header>
  );
}