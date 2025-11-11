import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "../styles/navbar.css";

export default function Navbar() {

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="neon glass navbar-icon" />
          <strong>CogniVault</strong>
        </Link>

        <nav className="navbar-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <a href="#about" className="nav-link">About</a>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Vault
          </NavLink>
          <a href="#login" className="nav-link">Login</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}


