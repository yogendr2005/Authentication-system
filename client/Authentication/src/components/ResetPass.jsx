import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const ResetPass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const { email } = location.state || {};

  useEffect(() => {
    if (!email) {
      alert("No email provided, redirecting to login.");
      navigate("/login");
    }
  }, [email, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3003/resetaccount", { email, password });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(`Error in resetting password: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #1c92d2, #f2fcfe)" }}>
      <div className="card text-center" style={{ width: "400px" }}>
        <div className="card-header h5 text-white bg-primary">Password Reset</div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your new password here and we'll reset your password.
          </p>
          <div data-mdb-input-init className="form-outline">
            <input
              type="password"
              id="typePassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control my-3"
            />
            <label className="form-label" htmlFor="typePassword">Enter new password here</label>
          </div>
          <button
            onClick={handleClick}
            data-mdb-ripple-init
            className="btn btn-primary w-100"
          >
            Reset password
          </button>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/login">Login</Link>
            <Link to="/">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
