export function signupStateReducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "success":
      newState.ntfyStyle = "notification is-success";
      newState.infoMessage = "Signup successful!";
      break;

    case "fail":
      newState.ntfyStyle = "notification is-danger";
      newState.infoMessage = "Signup failed!";
      newState.errors = { ...action.errors};
      break;

    default:
      console.error("Something went wrong with the loadDataReducer!");
      break;
  }
  
  return newState;
}



export function getSignupFailAction(error) {
  const failAction = {
    type: "fail",
    errors: {
      email: error.response.data.validationErrors.email,
    },
  };
  return failAction;
}

