import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({ role, email, password });
  // };

  const LOGIN_API_URL = 'http://localhost:5000/api/v1/auth/login'

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validateInputs()) {
      // setIsLoading(true);
      try {
        // Send the login request to the API
        const response = await fetch(LOGIN_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        console.log(response)

        const data = await response.json();

        if (response.ok) {
          // Assume token is returned on success
          const token = data.token;
          if (token) {
            // Store the token in localStorage or sessionStorage
            localStorage.setItem("authToken", token);

            // Handle successful login, e.g., redirect the user to a dashboard
            console.log("Login successful");
            // Redirect to another page, for example:
            window.location.href = "/dashboard";
          }
        } else {
          console.log('FAILED')
          // setError(data.message || "Login failed. Please check your credentials.");
        }
      } catch (err) {
        console.log(err)
        // setError("An error occurred. Please try again.");
      } finally {
        // setIsLoading(false);
      }
    }
  


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="form-group">
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
        </div> */}

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

      <div className="signup-link">
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
