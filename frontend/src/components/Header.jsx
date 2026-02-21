import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = ({ onCreate }) => {
  const { authToken, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg mt-3 bg">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          Authentify
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>
            {authToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/users">
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link text-light"
                    onClick={() => onCreate()}
                  >
                    Create User
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        {authToken && (
          <span className="text-light">
            Welcome, {currentUser}
            <button
              className="btn btn-sm btn-outline-light ms-2"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
