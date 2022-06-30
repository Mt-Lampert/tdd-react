import React, { useReducer, useRef, useState } from "react";
import { act } from "@testing-library/react";
import axios from "axios";

const loadDataInit = {
  ntfyStyle: "",
  infoMessage: "",
  buttonCSS: "button is-link  is-fullwidth is-justify-content-center",
};

function loadDataReducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "success":
      newState.ntfyStyle = "notification is-success";
      newState.infoMessage = "Signup successful!";
      break;

    case "fail":
      newState.ntfyStyle = "notification is-danger";
      newState.infoMessage = "Signup failed!";
      break;

    default:
      console.error("Something went wrong with the loadDataReducer!");
      break;
  }

  return newState;
}

export default function Signup(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signupState, signupDispatch] = useReducer(
    loadDataReducer,
    loadDataInit
  );

  const successAction = { type: "success" };
  const failAction = { type: "fail" };

  const nameField = useRef();
  const emailField = useRef();
  const passwd01 = useRef();
  const passwd02 = useRef();

  //  const buttonCSS = "button is-link  is-fullwidth is-justify-content-center";
  // const buttonLoadingCSS = buttonCSS + " is-loading";

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
    setLoading(true);
    const signupData = {
      username: nameField.current.value,
      email: emailField.current.value,
      password: passwd01.current.value,
    };
    axios
      .post("/api/1.0/users", signupData)
      .then((res) => {
        setTimeout(() => {
          act(() => setLoading(false));
          return res.data;
        }, 500);
      })
      .then((data) => {
        act(() => {
          signupDispatch(successAction);
        });
        // act(() => setInfoMessage("Signup successful!"));
        // act(() => setNtfyColor("notification is-success"));
      })
      .catch((error) => {
        act(() => setLoading(false));
        act(() => {
          signupDispatch(failAction);
        });
        // act(() => setInfoMessage("Signup failed!"));
        // act(() => setNtfyColor("notification is-danger"));
      });
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
                  ref={nameField}
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
                  ref={emailField}
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
            <button
              className={
                loading
                  ? signupState.buttonCSS + " is-loading"
                  : signupState.buttonCSS
              }
              disabled={isDisabled}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {signupState.infoMessage.length > 0 && (
        <div className={signupState.ntfyStyle}>{signupState.infoMessage}</div>
      )}
    </div>
  );
}
