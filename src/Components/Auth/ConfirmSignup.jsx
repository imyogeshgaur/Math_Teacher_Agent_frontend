import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../config/AuthContext";
import "../../styles/Auth.css";

export default function ConfirmSignup() {
  const { confirmSignUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp(location?.state.email, code);
      setSuccess("Account verified successfully 🎉");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>📩 Verify Your Account</h2>

        <p className="auth-subtext">
          Enter the verification code sent to your email.
        </p>

        <form onSubmit={handleConfirm}>
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="auth-input"
          />

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button type="submit" className="auth-button">
            Confirm Account
          </button>
        </form>

        <p className="auth-footer">
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
