import axios from "axios";
import { act } from "@testing-library/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Activate(props) {
  const [isActivated, setIsActivated] = useState(0)
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/1.0/activate/${params.token}`)
      .then((res) => {
        act(() => setIsActivated(1))
      })
      .catch((error) => {
        console.log("I'm in the .catch branch")
        act(() => setIsActivated(-1))
      })
  }, [])



  return (
    <div data-testid="activate-page">
      <h1 className="title">This is the activation page!</h1>
      <p>Your token: {params.token}</p>
      { isActivated === 1 && <p className="notification is-success">Activation successful!</p> }
      { isActivated === -1 && <p className="notification is-danger">Activation failed!</p> }
    </div>
  )
};
