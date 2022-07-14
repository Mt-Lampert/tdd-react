export default function Navbar({ updateEndpoint }) {
  function linkHandler(e) {
    e.preventDefault();
    updateEndpoint(e.currentTarget.attributes.href.value);
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-link" title="Home" onClick={linkHandler}>
          <img src="/hoaxify.png" alt="Logo" width="20%"/>
          <b>Hoaxify</b>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <a href="/signup" className="navbar-link" onClick={linkHandler}>
            Signup
          </a>

          <a href="/login" className="navbar-link" onClick={linkHandler}>
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
