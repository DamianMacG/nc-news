import { Link } from "react-router-dom";
import "../src/App.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome to The Jungle!</h1>
      <h2 className="welcome-heading2">Get invloved.</h2>
      <Link to="/articles">
        <button className="enter-button">ENTER</button>
      </Link>
    </div>
  );
};

export default WelcomePage;