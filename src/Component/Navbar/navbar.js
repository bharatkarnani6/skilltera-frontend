import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import Logo from '../../Assets/skilltera_logo.png'
import './navbar.css'
const Navbar = () => {

  // const candidateData = sessionStorage.getItem('candidate_data')
  // const adminData = sessionStorage.getItem('ADMIN')
  // const companyData = sessionStorage.getItem('company_loggedin_user_data')

  const [candidateData, setCandidateData] = useState(false);
  const [adminData, setAdminData] = useState(false);
  const [companyData, setCompanyData] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('candidate_data') != null) {
      setCandidateData(true)
    }
    if (sessionStorage.getItem('ADMIN') != null) {
      setAdminData(true)
    }
    if (sessionStorage.getItem('company_loggedin_user_data') != null) {
      setCompanyData(true)
    }
  }, [])
  return (
    <div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <NavLink exact to='/' activeClassName="active" activeStyle={{ color: "red" }}><img src={Logo} alt="logo" className="img-fluid logo" /></NavLink>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item  pl-2">
                <a class="nav-link px-4 fonts" aria-current="page"><NavLink class="navItem" exact to='/'>Home</NavLink></a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-4 fonts"><NavLink exact to='/about' class="navItem" >About Us </NavLink></a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link px-4 fonts"><NavLink exact to='/blog' class="navItem" >Blog</NavLink></a>
              </li> */}
              <li class="nav-item">
                <a class="nav-link px-4 fonts"><NavLink exact to='/contact' activeStyle={{ color: "red" }}>Contact Us</NavLink></a>
              </li>
              {
                candidateData && <li class="nav-item">
                  <a class="nav-link px-4 fonts"><NavLink exact to='/dashboard' activeStyle={{ color: "red" }}>Dashboard</NavLink></a>
                </li>
              }
              {
                adminData && <li class="nav-item">
                  <a class="nav-link px-4 fonts"><NavLink exact to='/adminDashboard' activeStyle={{ color: "red" }}>Dashboard</NavLink></a>
                </li>
              }
              {
                companyData && <li class="nav-item">
                  <a class="nav-link px-4 fonts"><NavLink exact to='/companyDashboard' activeStyle={{ color: "red" }}>Dashboard</NavLink></a>
                </li>
              }
            </ul>

          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar
