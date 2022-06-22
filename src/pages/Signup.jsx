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
        <br />
        <label htmlFor="passwd01">Enter your password</label>
        <input type="password" name="passwd01" id="passwd01" />
        <br />
        <label htmlFor="passwd02">Re-enter your password</label>
        <input type="password" name="passwd02" id="passwd02" />
        <br />
        <button className="button is-link">Submit</button>
      </form>
    </>
  )
}

