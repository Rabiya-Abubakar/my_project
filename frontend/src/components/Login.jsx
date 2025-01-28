import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role can be "admin"
  const [responseMessage, setResponseMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Prepare the request options
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, email, password }),
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', options);
      const data = await response.json();
      if (response.ok) {
        // Handle successful login
        console.log(data);
        setResponseMessage('Login successful!');
        localStorage.setItem('access_token', data.token); // Store token in localStorage
        // Redirect user to dashboard or another page
        window.location.href = '/dashboard';
      } else {
        // Handle errors from the server
        setResponseMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="client">Client</option>
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

      {/* Display response messages */}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Login;