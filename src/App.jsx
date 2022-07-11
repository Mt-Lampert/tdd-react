// import logo from './logo.svg';
import './App.scss';
import './App.css'
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className='mainframe'>
      {/* if the current URL ends with '/', render <LandingPage> */}
      {window.location.pathname === "/" && <LandingPage />}
      {/* if the current URL ends with '/signup', render <Signup> */}
      {window.location.pathname === "/signup" && <Signup />}
    </div>
  );
}

export default App;
