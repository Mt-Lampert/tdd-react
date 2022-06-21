import React from "react"

export default function Signup(props) {

  function signupHandler(e) {
    e.preventDefault();
  }

  return (
    <>
      <h1 className="title is-3">Please Sign up!</h1>

      <form onSubmit={signupHandler}>
        <input type="text" name="nameField" id="nameField" placeholder="Enter your username" />
        <br />
        <input type="text" name="mailField" id="mailField" placeholder="Enter your email address" />
      </form>
    </>
  )
}

