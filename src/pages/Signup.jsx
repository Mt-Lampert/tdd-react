import React, { useRef, useState } from "react";

export default function Signup(props) {
  const [isDisabled, setIsDisabled] = useState(true);

  const passwd01 = useRef();
  const passwd02 = useRef();

  function pwChangeHandler() {
    const minLen = 6;
    const pwd01 = passwd01.current.value;
    const pwd02 = passwd02.current.value;

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
      (pwd01.length < minLen || pwd02.length < minLen || pwd01 !== pwd02)
    ) {
      setIsDisabled(true);
    }
  }

  function signupHandler(e) {
    e.preventDefault();
  }

  return (
    <div className="section">
      <div className="columns">
        <div className="column is-6 is-offset-3">
          <h1 className="title is-3 has-text-centered">Please Sign up!</h1>

          <form className="mt-6" onSubmit={signupHandler}>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="nameField"
                  id="nameField"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input has-shadow"
                  type="text"
                  name="mailField"
                  id="mailField"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="passwd01">Enter your password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="passwd01"
                  id="passwd01"
                  ref={passwd01}
                  onChange={pwChangeHandler}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="passwd02">Re-enter your password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="passwd02"
                  id="passwd02"
                  ref={passwd02}
                  onChange={pwChangeHandler}
                />
              </div>
            </div>
            <br />
            <button className="button is-link  is-fullwidth is-justify-content-center" disabled={isDisabled}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
