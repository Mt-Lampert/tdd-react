import { useParams } from "react-router-dom";

export default function Activate(props) {
  const params = useParams();
  return (
    <div data-testid="activate-page">
      <h1 className="title">This is the activation page!</h1>
      <p>Your token: {params.token}</p>
    </div>
  )
};
