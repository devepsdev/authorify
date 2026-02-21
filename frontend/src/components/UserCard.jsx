import "./styles.css";

const UserCard = ({ user, onDelete, onEdit }) => {
  return (
    <div className="container">
      <div className="card custom-card m-3 shadow-sm">
        <div className="card-body text-light rounded">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">{user.name}</p>
          <p className="card-text">{user.email}</p>
          <p className="card-text">Id: {user.id}</p>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => onEdit(user)}
            >
              ✏️ Edit
            </button>
            <button
              className="btn btn-sm btn-accent"
              onClick={() => onDelete(user.id)}
            >
              🗑️ Drop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
