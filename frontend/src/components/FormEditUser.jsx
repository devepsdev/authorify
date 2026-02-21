import "./styles.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser, checkUsernameExists } from "../api/user.api";

const FormEditUser = ({ user, onUpdate, onCancel }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const data = {
    name,
    email,
    username,
    password,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar si el username cambió y si ya existe
      if (username !== user.username) {
        const exists = await checkUsernameExists(username, authToken);
        if (exists) {
          setError("El nombre de usuario ya está en uso");
          return;
        }
      }
      await updateUser(user.id, data, authToken);
      onUpdate();
    } catch (error) {
      setError("Error al actualizar el usuario");
      console.error(error.message);
    }
  };
  return (
    <div className="card shadow w-25 mx-auto bg p-4 m-4">
      <h4 className="mb-3">Edit User</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            id="username"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            required
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button type="button" onClick={onCancel} className="btn btn-accent">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save User
          </button>
        </div>
      </form>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormEditUser;
