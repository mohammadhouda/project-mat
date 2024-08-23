import React, { useState } from "react";
import "./AdminPage.css";
import { Header, Footer } from "../../index";

const UserAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    hourlyCost: 0,
  });

  const addUser = () => {
    const newUser = `User${users.length + 1}`;
    setUsers([...users, newUser]);
  };

  const isThereUser = users.length === 0;

  const deleteUser = () => {
    setUsers(users.filter((user) => user !== selectedUser));
    setSelectedUser(null);
    setShowForm(false);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowForm(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
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
    console.log("Form Data:", formData);
  };

  return (
    <div className="admin-container">
      <Header />
      <div className="admin-content">
        <div className="sidebar">
          <div className={`user-list-box ${isThereUser ? "box" : ""}`}>
            <h3>Users</h3>
            <ul className="user-list">
              {users.map((user, index) => (
                <li
                  key={index}
                  onClick={() => handleUserClick(user)}
                  className={selectedUser === user ? "selected" : ""}
                >
                  <span>{user}</span>
                  {selectedUser === user && (
                    <span className="edit-icon" onClick={handleEditClick}>
                      ✏️
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="icon-container">
              <button onClick={addUser} className="icon-button">
                +
              </button>
              <button onClick={deleteUser} className="icon-button">
                -
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
                Save
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserAdminPage;
