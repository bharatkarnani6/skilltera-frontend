import react, { useContext, useEffect, useState } from "react";
import "./companyDashboard.css";
import Navbar from "../../Component/Navbar/navbar";
import Sidebar from "../../Component/Sidebar/sidebar";
import { useSelector } from "react-redux";
import Aboutus from "../About/about";
import Profile from "../Profile/profile";
import Jobs from "../Jobs/jobs";
import CompanySidebar from "../../Component/Company Sidebar/companySidebar";

export default function CompanyDashboard() {
  const menu = useSelector((state) => state.toggleMenu);
  const titleSelection = useSelector(
    (state) => state.sidebarMenuSelectionReducer
  );
  const data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data"));


  const logout = () => {
    sessionStorage.clear();
    window.location.pathname = "/";
  };

  return (
    <div>
      <Navbar />
      <div class="row patchBar" style={{ backgroundColor: "#9b51e0" }}>
        <div class="col-2">
          <CompanySidebar />
        </div>

        <div className="col-10">
          <div className="patch ">
            <div className="row username">
              <div className="col justify-content-start">
                <h4 className="p-2" style={{ color: "white" }}>
                  {titleSelection.menuSelection}
                </h4>
              </div>
              <div className="col px-4 d-flex justify-content-end">
                <h4 className="p-2" style={{ color: "white" }}>
                  {data.company.companyName}
                </h4>
              </div>
            </div>
            {(() => {
              switch (titleSelection.menuSelection) {
                case "Dashboard":
                  return;
                  break;
                case "Profile":
                  return <Profile />;
                  break;
                case "Candidates":
                  return <Jobs />;
                  break;
                case "logout":
                  return logout();
                  break;
                default:
                  <h1>Error</h1>;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
