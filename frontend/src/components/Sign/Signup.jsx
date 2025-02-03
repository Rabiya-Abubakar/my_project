import { useState } from "react";
import { Link } from "react-router-dom";

// SignUp Component
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, email, confirmEmail });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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
          <label htmlFor="confirmEmail">Confirm Email:</label>
          <input
            type="email"
            id="confirmEmail"
            placeholder="Confirm your email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>

        <div className="signup-link">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
