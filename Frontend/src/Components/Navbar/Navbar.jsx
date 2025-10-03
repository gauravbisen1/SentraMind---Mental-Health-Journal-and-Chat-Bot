import React, { useState } from 'react'
import logo from "../../assets/sun.png"
import { Link } from "react-router-dom"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"
import "./Navbar.css"

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

          <div className="navbar-sign">
            <Link to="/login">
              <p >Sign in</p>
            </Link>
            <Link to="/signup">
              <button type='button'>Sign up</button>
            </Link>
          </div>
          {/* Responsive part for mobiles devices */}
          {/* hamburger menu */}
          <div className="navbar-menu">
            {toggleMenu
              ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
              : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
            }
            {toggleMenu &&
              <div className="navbar-menu_container scale-up-center">
                <div className="navbar-menu_container-links">
                  <Menu />
                </div>
                <div className="navbar-menu_container-links-sign">
                  <Link to="/login">
                    <p>Sign in</p>
                  </Link>
                  <Link to="/signup">
                    <button type='button'>Sign up</button>
                  </Link>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar