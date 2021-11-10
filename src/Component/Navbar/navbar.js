import React from 'react'
import Logo from '../../Assets/skilltera_logo.png'
import './navbar.css'
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-z">
        <div className="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={Logo} alt="logo" className="img-fluid" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end menu-items" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active px-4 fonts" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4 fonts">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4 fonts">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4 fonts">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
