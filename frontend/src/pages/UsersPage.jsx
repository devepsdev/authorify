import { useEffect, useState } from "react";
import Header from "../components/header";
import { useAuth } from "../context/AuthContext";
import { deleteUser, getAllUsers } from "../api/user.api";
import UserCard from "../components/UserCard";
import FormEditUser from "../components/FormEditUser";
import FormCreateUser from "../components/FormCreateUser";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { authToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(authToken);
        setUsers(data);
      } catch (error) {
        setError("Error al cargar los usuarios");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [authToken]);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id, authToken);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError("Error al borrar el usuario");
      console.error(error.message);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setShowEditForm(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = await getAllUsers(authToken);
      setUsers(updatedData);
      setShowEditForm(false);
      setEditUser(null);
    } catch (error) {
      setError("Error al actualizar el usuario");
      console.error(error.message);
    }
  };

  const handleCreateUser = () => {
    setShowCreateForm(true);
  };

  const handleCreate = async () => {
    try {
      const updatedData = await getAllUsers(authToken);
      setUsers(updatedData);
      setShowCreateForm(false);
    } catch (error) {
      setError("Error al crear el usuario");
      console.error(error.message);
    }
  };

  const handleCancel = () => {
    setShowEditForm(false);
    setShowCreateForm(false);
    setEditUser(null);
  };

  return (
    <div>
      <Header onCreate={handleCreateUser} />

      {/* Loading and Error Messages */}
      <div className="container-fluid px-3 px-md-4">
        {loading && (
          <div className="text-center text-info py-4">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando usuarios... 💾</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Forms */}
      {showEditForm ? (
        <FormEditUser
          user={editUser}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      ) : showCreateForm ? (
        <FormCreateUser onCreate={handleCreate} onCancel={handleCancel} />
      ) : (
        /* Users Grid */
        <div className="container-fluid px-2 px-md-4">
          {users.length > 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="text-light subtitle-responsive text-center mt-3">
                  Lista de Usuarios ({users.length})
                </h3>
                <button
                  className="btn btn-primary d-md-none"
                  onClick={handleCreateUser}
                >
                  + Create User
                </button>
              </div>
              <div className="users-grid">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onDelete={handleDeleteUser}
                    onEdit={handleEditUser}
                  />
                ))}
              </div>
            </>
          ) : (
            !loading && (
              <div className="text-center py-5">
                <div
                  className="card bg p-4 mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  <h5 className="text-light mb-3">
                    No hay usuarios registrados
                  </h5>
                  <p className="text-white-50">
                    Comienza creando tu primer usuario
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={handleCreateUser}
                  >
                    Crear Primer Usuario
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
