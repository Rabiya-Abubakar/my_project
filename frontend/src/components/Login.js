// Filename: Login.js
// This component handles the user login process, including sending login data
// to the backend, receiving the JWT token, and storing it in localStorage.

import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the payload to be sent to the backend
    const userData = { email, password, role };

    // Send POST request to Flask backend to authenticate the user
    fetch('http://127.0.0.1:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          // If authentication is successful, store the token in localStorage
          localStorage.setItem('access_token', data.access_token);
          console.log('Token:', data.access_token); // Print token for debugging
          alert('Login successful!');
          
          // Redirect to another page after successful login (example: dashboard)
          window.location.href = '/dashboard'; // Modify this to your desired route
        } else {
          // If login fails, show error message
          setError('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Something went wrong');
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="signup-link">
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
