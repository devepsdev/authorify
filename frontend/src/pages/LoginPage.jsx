import { useState } from "react";
import Header from "../components/header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      login(data.username, data.token);
      navigate("/users");
    } catch (error) {
      setError("Credenciales incorrectas");
      console.error(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="login-container">
          <div className="card bg rounded-2">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label text-light">
                    User name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control bg-dark-subtle fw-bold"
                    id="username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-light">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control bg-dark-subtle"
                    id="password"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
