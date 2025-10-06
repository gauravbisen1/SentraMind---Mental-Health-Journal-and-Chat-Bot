import React, { useState, useContext } from 'react'
import logo from "../../assets/sun.png"
import { Link, useNavigate } from "react-router-dom"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import "./Navbar.css"
import { AuthContext } from "../../Authentication/AuthProvider"
import axios from "axios"

const Menu = () => (
  <>
    <p><Link to='/'>Home</Link></p>
    <p><a href='#mental'>Mental Health</a></p>
    <p><Link to='/chatbot'>Chatbot</Link></p>
    <p><a href='#features'>Case Studies</a></p>
    <p><a href='#blog'>Library</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/logout", { withCredentials: true })
      setUser(null) // clear user
      setDropdownOpen(false)
      navigate("/") // redirect home
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} className="green-filter" alt="sun" />
        </div>

        <div className="navbar-links_container">
          <Menu />
        </div>

        <div className="navbar-wrapper">
          {/* ✅ Show avatar + dropdown if logged in */}
          {user ? (
            <div className="navbar-user" style={{ position: "relative" }}>
              <div
                className="avatar-circle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title={user.name || "User"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#4caf50",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : <i class="fa-solid fa-user"></i>}
              </div>

              {dropdownOpen && (
                <div
                  className="dropdown-box"
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: 0,
                    background: "#fff",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    padding: "10px",
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 12px",
                      width: "100%",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Logout
                  </button>
                  <Link
                    to="/dashboard"
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 12px",
                      width: "100%",
                      textAlign: "left",
                      fontSize: "14px",
                    }}
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-sign">
              <Link to="/login"><p>Sign in</p></Link>
              <Link to="/signup"><button type='button'>Sign up</button></Link>
            </div>
          )}

          {/* 🔹 Responsive hamburger menu */}
          <div className="navbar-menu">
            {toggleMenu
              ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
              : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
            }
            {toggleMenu && (
              <div className="navbar-menu_container scale-up-center">
                <div className="navbar-menu_container-links">
                  <Menu />
                </div>
                <div className="navbar-menu_container-links-sign">
                  {user ? (
                    <button onClick={handleLogout} style={{ cursor: "pointer" }}>
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link to="/login"><p>Sign in</p></Link>
                      <Link to="/signup"><button type='button'>Sign up</button></Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
