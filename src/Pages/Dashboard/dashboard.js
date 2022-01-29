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

  return (
    <div>
      <Navbar />
      <div class="container-fluid">
        <div class="row">
          <div class="col-1">
            <Sidebar />
          </div>

          <div className="col-11">
            <div className="patch ">
              <div className="row username">
                <div className="col">
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
              {(() => {
                switch (titleSelection.menuSelection) {
                  case "Personal Info":
                    return <Personal />;
                  case "Professional Info":
                    return <Professional />;
                    break;
                  case "Jobs":
                    return <Jobs />;
                    break;
                  default:
                    <h1>Error</h1>;
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
