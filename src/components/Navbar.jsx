import { Link } from "react-router-dom";

const Navbar = () => {

  const handleHomeClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/articles" onClick={handleHomeClick}>Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;