import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to My Website!</h1>
      <Link to="/articles">
        <button>ENTER</button>
      </Link>
    </div>
  );
};

export default WelcomePage;