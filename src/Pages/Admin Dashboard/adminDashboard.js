import react, { useContext, useEffect, useState } from "react";
import "./adminDashboard.css";
import Navbar from "../../Component/Navbar/navbar";
import Sidebar from "../../Component/Sidebar/sidebar";
import { useSelector } from "react-redux";
import Aboutus from "../About/about";
import Profile from "../Profile/profile";
import Jobs from "../Jobs/jobs";
import AdminSidebar from "../../Component/Admin Sidebar/adminSidebar";
import CompanyAdminPage from "../Admin/Company Admin Page/companyAdminPage";
import ResetCompanyPassword from "../Admin/Reset Company Password/resetCompanyPassword";
import AllCompanies from "../Admin/All Companies/allCompanies";
import AllCandidates from "../Admin/All Candidates/allCandidates";
import CandidateAdminSignup from "../Admin/Cadidate Admin Signup/candidateAdminSignup";

export default function AdminDashboard() {
  const menu = useSelector((state) => state.toggleMenu);
  const titleSelection = useSelector(
    (state) => state.sidebarMenuSelectionReducer
  );

  const logout = () => {
    localStorage.clear();
    window.location.pathname = "/";
  };

  return (
    <div>
      <Navbar />
      <div class="row patchBar" style={{ backgroundColor: "#9b51e0" }}>
        <div class="col-2">
          <AdminSidebar />
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
                  Hi Admin
                </h4>
              </div>
            </div>
            {(() => {
              switch (titleSelection.menuSelection) {
                case "Company Admin Page":
                  return <CompanyAdminPage />;
                  break;
                case "Reset Company Password":
                  return <ResetCompanyPassword />;
                  break;
                case "All Companies":
                  return <AllCompanies />;
                  break;
                case "All Candidates":
                  return <AllCandidates />;
                  break;
                case "Candidate Admin Signup":
                  return <CandidateAdminSignup />;
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
