import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../config/AuthContext";
import "./Auth.css";

export default function Login() {
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) navigate("/home");
  }, [user, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <p style={{ color: "white" }}>Checking session...</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🔐 Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
