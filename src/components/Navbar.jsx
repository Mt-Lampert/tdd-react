
export default function Navbar({updateEndpoint}) {

  function linkHandler(e) {
    e.preventDefault();
    updateEndpoint(e.target.attributes.href.value)
  }

  return (
    <div>
      <a href="/" title="Home" onClick={linkHandler}>Hoaxify</a> &nbsp; 
      <a href="/signup" onClick={linkHandler} >Signup</a> &nbsp;
      <a href="/login" onClick={linkHandler}>Login</a>
    </div>
  )
};
