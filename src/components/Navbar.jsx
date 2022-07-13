
export default function Navbar({updateEndpoint}) {

  function linkHandler(e) {
    e.preventDefault();
    updateEndpoint(e.target.attributes.href.value)
  }

  return (
    <div>
      <a href="/" title="Home">Hoaxify</a> &nbsp; <a href="/signup" onClick={linkHandler} >Signup</a>
    </div>
  )
};
