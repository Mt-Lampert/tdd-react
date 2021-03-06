// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Activate from "./pages/Activate";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import "./App.scss";
import "./App.css";

function App() {


  return (
    <Router>
      <div className="bodyframe">
        <Navbar />
        <div className="mainframe">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/activate/:token" element={<Activate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
