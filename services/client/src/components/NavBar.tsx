import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const titleStyle: CSSProperties = {
  fontWeight: "bold",
};

interface NavBarProps {
  title: string;
  logoutUser: () => void;
}

export function NavBar({ title, logoutUser }: NavBarProps) {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <section className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item nav-title" style={titleStyle}>
            {title}
          </Link>

          <span
            className="nav-toggle navbar-burger"
            onClick={() => {
              let toggle = document.querySelector(".nav-toggle");
              let menu = document.querySelector(".navbar-menu");
              toggle?.classList.toggle("is-active");
              menu?.classList.toggle("is-active");
            }}
          >
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/about" className="navbar-item">
              About
            </Link>
            <Link to="/status" className="navbar-item">
              User Status
            </Link>
          </div>
          <div className="navbar-end">
            <Link to="/register" className="navbar-item">
              Register
            </Link>
            <Link to="/login" className="navbar-item">
              Log In
            </Link>
            <button onClick={logoutUser} className="navbar-item">
              Log Out
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
}
