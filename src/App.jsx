// import logo from './logo.svg';
import "./App.scss";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";

function App() {
  return (
    <>
      <Navbar />
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
