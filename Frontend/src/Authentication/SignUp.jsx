import { useState } from "react";
import axios from "axios";
import "./login.css";
import sun from "../assets/sun.png"
import kid from "../assets/kid.jpg"

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://sentramind-backend.onrender.com";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/signup`, formData,{withCredentials: true});
      alert(res.data.message);
      // Redirect user to dashboard/home
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form> */}

      <div className="login-main">
        <div className="login-left signup-img">
          <img src={kid}  alt="img" />
        </div>
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-logo">
              <img src={sun} alt="logo" />
            </div>
            <div className="login-center">
              <h2>Welcome back!</h2>
              <p>Please enter your details</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input
                  type="email" name="email" placeholder="Email" onChange={handleChange} />
                <div className="pass-input-div">
                  <input
                    type="password" name="password" placeholder="Password" onChange={handleChange} />
                </div>

                <div className="login-center-buttons">
                  <button className="btn" type="submit">Sign Up</button>
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
