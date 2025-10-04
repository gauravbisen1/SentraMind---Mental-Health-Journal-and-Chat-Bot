import { useContext, useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const { setUser } = useContext(AuthContext); // global auth state
  const navigate = useNavigate();


  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/login", formData, {
        // headers: { "Content-Type": "application/json" },
        withCredentials: true // important if you're using sessions/cookies
      });

      setMessage(res.data.message);
      console.log("User:", res.data.user);

      // update global auth state
      setUser(res.data.user);

      // you could also save user data in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect after login
      navigate("/");

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      {/* <div style={{ maxWidth: "400px", margin: "50px auto" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br /><br />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br /><br />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div> */}

      <div className="login-main">
        <div className="login-left">
          <img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />
        </div>
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-logo">
              <img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="logo" />
            </div>
            <div className="login-center">
              <h2>Welcome back!</h2>
              <p>Please enter your details</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  required />
                <div className="pass-input-div">
                  <input 
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required />
                </div>

                <div className="login-center-options">
                  {/* <div className="remember-div">
                    <input type="checkbox" id="remember-checkbox" />
                    <label htmlFor="remember-checkbox">
                      Remember for 30 days
                    </label>
                  </div> */}
                  {/* <a href="#" className="forgot-pass-link">
                    Forgot password?
                  </a> */}
                </div>
                <div className="login-center-buttons">
                  <button className="btn" type="submit">Log In</button>
                  {message && <p>{message}</p>}
                  {/* <button type="button">
                    <img src="" alt="" />
                    Log In with Google
                  </button> */}
                </div>
              </form>
            </div>

            <p className="login-bottom-p">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
