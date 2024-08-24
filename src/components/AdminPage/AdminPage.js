import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { Header, Footer } from "../../index";
import deleteIcon from "../../assets/icons/delete.png";
import editIcon from "../../assets/icons/edit.png";

const UserAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isfinished, setFinished] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    hourlyCost: 0,
  });

  const [editingUser, setEditingUser] = useState(false);

  const addUser = () => {
    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      hourlyCost: 0,
    });
    setEditingUser(false);
    setShowForm(true);
  };

  const addMessage = () => {
    setMessage("Action Done");
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setShowForm(false);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowForm(false);
  };

  const handleEditClick = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setFormData({
      id: userToEdit.id,
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      email: userToEdit.email,
      hourlyCost: userToEdit.hourlyCost,
    });
    setSelectedUser(id);
    setEditingUser(true);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(
        users.map((user) => (user.id === selectedUser ? { ...formData } : user))
      );
      setFinished(true);
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
      setFinished(true);
    }
    setShowForm(false);
  };

  useEffect(() => {
    if (isfinished) {
      addMessage();
      setFinished(false);
    }
  }, [isfinished]);

  return (
    <div className="admin-container">
      <Header />
      <div className="admin-content">
        <div className="sidebar">
          <div className={`user-list-box ${users.length === 0 ? "box" : ""}`}>
            <h3>Users</h3>
            <ul className="user-list">
              {users.map((user) => (
                <li
                  data-id={user.id}
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className={selectedUser === user.id ? "editing" : ""}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {user.firstName} {user.lastName}
                  </span>
                  <div className="icons">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(user.id);
                      }}
                    >
                      <img
                        className="edit-icon"
                        src={editIcon}
                        alt="edit-icon"
                      />
                    </div>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUser(user.id);
                      }}
                    >
                      <img
                        className="delete-icon"
                        src={deleteIcon}
                        alt="delete-icon"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="icon-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addUser();
                }}
                className="icon-button"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="main-content">
          {showForm && (
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="hourlyCost">Hourly Cost:</label>
                <input
                  className="hour-cost"
                  max={999}
                  type="number"
                  id="hourlyCost"
                  name="hourlyCost"
                  value={formData.hourlyCost}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                {editingUser ? "Update" : "Add User"}
              </button>
            </form>
          )}
          <span className={`pop-up ${message === "" ? "hidden" : ""}`}>
            {message}
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserAdminPage;
