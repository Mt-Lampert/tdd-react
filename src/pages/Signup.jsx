import React, { useRef, useState } from "react";

export default function Signup(props) {
  const [isDisabled, setIsDisabled] = useState(true);

  const passwd01 = useRef();
  const passwd02 = useRef();

  function pwChangeHandler() {
    const minLen = 6;
    const pwd01 = passwd01.current.value
    const pwd02 = passwd02.current.value

    if (
      isDisabled &&
      pwd01.length >= minLen &&
      pwd02.length >= minLen &&
      pwd01 === pwd02
    ) {
      setIsDisabled(false);
    }

    if (
      !isDisabled &&
      (pwd01.length < minLen ||
        pwd02.length < minLen ||
        pwd01 !== pwd02)
    ) {
      setIsDisabled(true);
    }
  }

  function signupHandler(e) {
    e.preventDefault();
  }

  return (
    <>
      <h1 className="title is-3">Please Sign up!</h1>

      <form onSubmit={signupHandler}>
        <input
          type="text"
          name="nameField"
          id="nameField"
          placeholder="Enter your username"
        />
        <br />
        <input
          type="text"
          name="mailField"
          id="mailField"
          placeholder="Enter your email address"
        />
        <br />
        <label htmlFor="passwd01">Enter your password</label>
        <input
          type="password"
          name="passwd01"
          id="passwd01"
          ref={passwd01}
          onChange={pwChangeHandler}
        />
        <br />
        <label htmlFor="passwd02">Re-enter your password</label>
        <input
          type="password"
          name="passwd02"
          id="passwd02"
          ref={passwd02}
          onChange={pwChangeHandler}
        />
        <br />
        <button className="button is-link" disabled={isDisabled}>
          Submit
        </button>
      </form>
    </>
  );
}
