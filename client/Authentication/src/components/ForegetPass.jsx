import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForegetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    axios
      .post("http://localhost:3003/findaccount", { email: email })
      .then((res) => {
        // console.log(res);
        if (res.data.user) {
          navigate("/resetpass", { state: { email: email } });
        } else {
          alert("Email not found");
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };


  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div className="card text-center" style={{ width: "300px" }}>
        <div className="card-header h5 text-white bg-primary">
          Password Reset
        </div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <div data-mdb-input-init className="form-outline">
            <input
              type="email"
              id="typeEmail"
              className="form-control my-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="typeEmail">
              Enter Email here
            </label>
          </div>
          <button
            onClick={handleClick}
            data-mdb-ripple-init
            className="btn btn-primary w-100"
          >
            Reset password
          </button>
          <div className="d-flex justify-content-between mt-4">
            <Link className="" to="/login">
              Login
            </Link>
            <Link className="" to="/">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForegetPass;
