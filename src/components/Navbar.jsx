import { useRef } from "react";

export default function Navbar({ updateEndpoint }) {
  const navbarRef = useRef();

  function linkHandler(e) {
    e.preventDefault();
    updateEndpoint(e.currentTarget.attributes.href.value);
  }

  function toggleMenu(e) {
    const hamburger = e.target;
    const navbarMenu = navbarRef.current;
    hamburger.classList.toggle("is-active");
    navbarMenu.classList.toggle("is-active");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-item" title="Home" onClick={linkHandler}>
          <img src="/hoaxify.png" alt="Logo" width="45%" />
          <b>Hoaxify</b>
        </a>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu" ref={navbarRef}>
        <div className="navbar-end">
          <a href="/signup" className="navbar-link" onClick={linkHandler}>
            Signup
          </a>

          <a href="/login" className="navbar-link" onClick={linkHandler}>
            Login
          </a>
        </div>
      </div>
      {/* Hamburger menu */}

    </nav>
  );
}
