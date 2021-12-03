import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../Assets/skilltera_logo.png'
import './navbar.css'
const Navbar = () => {
  const [dashboard, setDashboard] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('login') != null) {
      setDashboard(!dashboard)
    }
  }, [])
  return (

    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-z">
        <div className="container-fluid">
          <a className="navbar-brand">
            <NavLink exact to='/' activeClassName="active" activeStyle={{ color: "red" }}><img src={Logo} alt="logo" className="img-fluid" /></NavLink>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end menu-items" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link px-4 fonts" aria-current="page"><NavLink exact to='/' activeStyle={{ color: "red" }}>Home</NavLink></a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4 fonts"><NavLink exact to='/about' activeStyle={{ color: "red" }}>About Us</NavLink ></a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4 fonts"><NavLink exact to='/blog' activeStyle={{ color: "red" }}>Blog</NavLink></a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4 fonts"><NavLink exact to='/contact' activeStyle={{ color: "red" }}>Contact Us</NavLink></a>
              </li>
              {
                dashboard && <li className="nav-item">
                  <a className="nav-link px-4 fonts"><NavLink exact to='/dashboard' activeStyle={{ color: "red" }}>Dashboard</NavLink></a>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
