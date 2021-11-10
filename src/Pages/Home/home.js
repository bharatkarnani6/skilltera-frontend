import React from 'react'
import Navbar from '../../Component/Navbar/navbar'
import Banner from '../../Assets/banner.png'
import './home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid banner">
        <div className="row">
          <div className="col">
            <div className="for-companies fonts">
              <h3 style={{ 'fontWeight': '800' }}>For Companies</h3>
              <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestias aut, repellat ipsum facere voluptate dicta obcaecati
                deserunt nobis suscipit eaque?</p>
              <button className="btn btn-primary">Start Hiring</button>
            </div>
            <div className="for-developers fonts">
              <h3 style={{ 'fontWeight': '800' }}>For Developers</h3>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestias aut, repellat ipsum facere voluptate dicta obcaecati
                deserunt nobis suscipit eaque?</p>
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </div>
          <div className="col banner-image-section">
            <div className="banner-image">
              <img src={Banner} alt="banner" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
