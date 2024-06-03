import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!/^[a-zA-Z ]+$/.test(name)) {
      setNameError("Name should contain only letters");
      valid = false;
    } else {
      setNameError("");
    }

    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Phone number should contain 10 digits");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (email === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    axios
      .post("http://localhost:3003/signup", {
        name,
        phone,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="form-floating mb-4">
                          <input
                            type="text"
                            id="form3Example1c"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name here"
                            className="form-control"
                          />
                          <label htmlFor="form3Example1c">Your Name</label>
                          {nameError && (
                            <div className="text-danger">{nameError}</div>
                          )}
                        </div>

                        <div className="form-floating mb-4">
                          <input
                            type="tel"
                            id="form3Example3c"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter Phone here"
                            className="form-control"
                          />
                          <label htmlFor="form3Example3c">Your Phone no</label>
                          {phoneError && (
                            <div className="text-danger">{phoneError}</div>
                          )}
                        </div>

                        <div className="form-floating mb-4">
                          <input
                            type="email"
                            id="form3Example4c"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email here"
                            className="form-control"
                            required
                          />
                          <label htmlFor="form3Example4c">Your Email</label>
                          {emailError && (
                            <div className="text-danger">{emailError}</div>
                          )}
                        </div>

                        <div className="form-floating mb-4">
                          <input
                            type="password"
                            id="form3Example4cd"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password here"
                            className="form-control"
                          />
                          <label htmlFor="form3Example4cd">Your Password</label>
                          {passwordError && (
                            <div className="text-danger">{passwordError}</div>
                          )}
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                        <p className="text-center">
                          Already have an account?{" "}
                          <Link to="/login">Login here</Link>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
