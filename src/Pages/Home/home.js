import React from 'react'
import Navbar from '../../Component/Navbar/navbar'
import Banner from '../../Assets/banner.png'
import './home.css'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid banner">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <div className="row">
              <div className="col">
                <div className="for-companies fonts">
                  <h3 style={{ 'fontWeight': '800' }}>For Companies</h3>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias aut, repellat ipsum facere voluptate dicta obcaecati
                    deserunt nobis suscipit eaque?</p>
                  <Link to='/company_login'> <button className="btn btn-primary">Start Hiring</button></Link>
                </div>
              </div>
              <div className="col">
                <div className="for-developers fonts">
                  <h3 style={{ 'fontWeight': '800'   }}>For Developers</h3>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias aut, repellat ipsum facere voluptate dicta obcaecati
                    deserunt nobis suscipit eaque?</p>
                  <Link to='/login'> <button className="btn btn-primary w-50 h-20 ">Sign Up</button></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 banner-image-section">
            <div className="banner-image">
              <img src={Banner} alt="banner" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
