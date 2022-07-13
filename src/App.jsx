// import logo from './logo.svg';
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import "./App.scss";
import "./App.css";

function App() {
  const [endpoint, setEndpoint] = useState(window.location.pathname);

  function updateEndpoint(pEndpoint) {
    console.log(`Updating Endpoint with ${pEndpoint}`);
    window.history.pushState({}, "", pEndpoint);
    setEndpoint(pEndpoint);
  }

  return (
    <>
      <Navbar updateEndpoint={updateEndpoint} />
      <div className="mainframe">
        {/* if the current URL ends with '/', render <LandingPage> */}
        {window.location.pathname === "/" && <LandingPage />}
        {/* if the current URL ends with '/signup', render <Signup> */}
        {window.location.pathname === "/signup" && <Signup />}
        {/* if the current URL ends with '/login', render <Login> */}
        {window.location.pathname === "/login" && <Login />}
        {/* if the current URL starts with '/user', render <User> */}
        {window.location.pathname.startsWith("/user") && <User />}
      </div>
    </>
  );
}

export default App;
