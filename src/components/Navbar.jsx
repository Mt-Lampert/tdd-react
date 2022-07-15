import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Navbar() {
  const navbarRef = useRef();

  // function linkHandler(e) {
  //   e.preventDefault();
  //   updateEndpoint(e.currentTarget.attributes.href.value);
  // }

  function toggleMenu(e) {
    const hamburger = e.target;
    const navbarMenu = navbarRef.current;
    hamburger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" title="Home">
          <img src="/hoaxify.png" alt="Logo" width="45%" />
          <b>Hoaxify</b>
        </Link>
      {/* Hamburger menu */}
      <button
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className="navbar-menu" ref={navbarRef}>
        <div className="navbar-end">
          <Link to="/signup" className="navbar-link">
            Signup
          </Link>

          <Link to="/login" className="navbar-link">
            Login
          </Link>
        </div>
      </div>

    </nav>
  );
}
