import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/articles">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;