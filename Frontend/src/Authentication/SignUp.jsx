import { useState } from "react";
import axios from "axios";
import "./login.css";


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
      const res = await axios.post("http://localhost:8080/signup", formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>

      <div className="login-main">
        <div className="login-left">
          <img src="" alt="img" />
        </div>
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-logo">
              <img src="" alt="logo" />
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
