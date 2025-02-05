import React, { useState, useEffect } from "react";
import "./AllUsers.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [role, setRole] = useState("");
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.users);
        setFilteredUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleFilter = (role) => {
    setRole(role);
    setActiveButton(role);
    if (role === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === role));
    }
  };

  return (
    <div className="users-container">
      <h1>All Users</h1>
      <p>Here are all users in the system:</p>

      <div className="buttons-container">
        <button className={activeButton === "" ? "active" : ""} onClick={() => handleRoleFilter("")}>
          All
        </button>
        <button className={activeButton === "admin" ? "active" : ""} onClick={() => handleRoleFilter("admin")}>
          Admins
        </button>
        <button className={activeButton === "user" ? "active" : ""} onClick={() => handleRoleFilter("user")}>
          Users
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="users-list">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div key={index} className="user-card">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
            ))
          ) : (
            <p>No users found for this role.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersPage;