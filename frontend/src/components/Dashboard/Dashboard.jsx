import React from "react";
import { Link } from "react-router-dom"; // You can use 'react-router-dom' for navigation
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
        </div>
        <div className="header-right">
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="card">
          <h2>Statistics</h2>
          <p>Overview of your statistics.</p>
        </div>

        <div className="card">
          <h2>Recent Activity</h2>
          <p>List of recent activities here.</p>
        </div>

        <div className="card">
          <h2>Notifications</h2>
          <p>Recent notifications will show up here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
