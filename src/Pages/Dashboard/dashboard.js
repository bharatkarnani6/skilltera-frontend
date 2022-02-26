import react, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../../Component/Navbar/navbar";
import Sidebar from "../../Component/Sidebar/sidebar";
import { useSelector } from "react-redux";
import Aboutus from "../About/about";
import Personal from "../Personal/Personal";
import Professional from "../Professional/professional";
import Jobs from "../Jobs/jobs";

//comment for presonal
export default function Dashboard() {
  const candidateData = JSON.parse(localStorage.getItem("candidate_data"));

  console.log(candidateData);

  const userName = candidateData.candidate.fullname;
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
          <Sidebar />
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
                  Hi {userName}
                </h4>
              </div>
            </div>

            {titleSelection.menuSelection === "Dashboard" ? <Personal /> : " "}

            {(() => {
              switch (titleSelection.menuSelection) {
                case "Personal Info" || "Dashboard":
                  return <Personal />;
                case "Professional Info":
                  return <Professional />;
                  break;
                case "Jobs":
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
