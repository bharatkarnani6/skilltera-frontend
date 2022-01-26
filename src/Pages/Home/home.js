import React from "react";
import Navbar from "../../Component/Navbar/navbar";
import Banner from "../../Assets/banner.png";
import Banner1 from "../../Assets/bannerimg.png";

import "./home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Navbar />

      <div class="container-fluid w-100">
        <div
          class="banner w-100  banner1"
          style={{ backgroundColor: "#dddddd" }}
        >
          <div class="row">
            <div class="col">
              <div class="for-companies fonts">
                <h3 style={{ fontWeight: "800" }}>For Companies</h3>
                <p>
                  There are many portals where you can get a list of candidates
                  and job portals to list your jobs with a hope that right
                  talent will apply for jobs. We are trying to turn this upside
                  down - If you are looking for talent and want to build a
                  talent pipeline for in demand skills, then please try
                  Skilltera and let us know how we can help better?
                </p>
                <Link to="/company_login">
                  {" "}
                  <button class="btn btn-primary ">Sign Up</button>
                </Link>
              </div>
            </div>
            <div class="col-12 col-md-6 banner-image-section bannerImage1">
              <div class="banner-image">
                <img src={Banner} alt="banner" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>

        <div
          class=" banner banner2"
          style={{ backgroundColor: "rgb(196 197 194)" }}
        >
          <div class="row">
            <div class="col-md-5 banner-image-section bannerImage2">
              <div class="banner-image  bg-transparent">
                <img src={Banner1} alt="banner" height="468" width="500" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="for-developers fonts">
                <h3 style={{ fontWeight: "800" }}>For Developers</h3>
                <p>
                  Our highly experienced founders have felt that putting your
                  profile in known portals or applying for jobs does not really
                  yeild expected results. Profile is more than just a resume'.
                  Building trust around your profile and experience is the key
                  to get the attention of potential employers. We are about to
                  launch some features that are not offered by any other job
                  portal including the likes of LinkedIn. Try Skilltera and
                  explore the upcoming features that will be shared first with
                  those who join us by March 2022
                </p>
                <Link to="/login">
                  {" "}
                  <button class="btn btn-primary  h-20 ">Sign Up</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
