import axios, { useMemo } from "axios";
import React, { useEffect, useState, useCallback } from "react";
import ApiConstants from "../../Services/apiconstants";
import "./jobs.css";
import Swal from "sweetalert2";
import { useTable } from "react-table";
import ShowMoreText from "react-show-more-text";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import DataTable from "react-data-table-component";

export default function Jobs() {
  const [id, setId] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const columnsList = [
    {
      name: "ID",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Overall Exprience (Years)",
      selector: (row) => row.experience,
      sortable: true,
    },
    {
      name: "Current Role",
      selector: (row) => row.currentRole,
      sortable: true,
    },
    {
      name: "Current Client/Company",
      selector: (row) => row.currentCompany,
      sortable: true,
    },
    {
      name: "Companies/Client worked with",
      selector: (row) => row.previousEmployers,
      sortable: true,
    },
    {
      name: "Available In (Weeks)",
      selector: (row) => row.timeToJoin,
      sortable: true,
    },
    {
      name: "Key Skill Areas",
      selector: (row) => row.knownTechnologies,
      sortable: true,
    },
    {
      name: "Brief about experience/ skills / key aspects of projects",
      cell: (row) => (
        <ShowMoreText
          lines={1}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="my-anchor-css-class"
          onClick={executeOnClick}
          expanded={isExpanded}
          width={280}
          truncatedEndingComponent={"... "}
        >
          {row.experienceDescription}
        </ShowMoreText>
      ),
      sortable: true,
    },
    {
      name: "Looking for",
      selector: (row) => row.typeOfJob,
      sortable: true,
    },
    {
      name: "Interested Role",
      selector: (row) => row.interestedRole,
      sortable: true,
    },
    {
      name: "Expected Salary per year / Rate per hour (C2H/C2C)",
      selector: (row) => row.expectedRateC2CorC2H,
      sortable: true,
    },
    {
      name: "Open to relocation",
      selector: (row) => (row.relocation ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Selection",
      cell: (row) => (
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => test(row)}
        />
      ),
      sortable: true,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const [values, setValues] = useState({
    jobData: {},
  });
  const [filterData, setFilterData] = useState("");
  const userData = () => {
    axios
      .get(ApiConstants.CANDIDATE_DATA)
      .then((response) => {
        var dataTest = [];
        for (var i = 0; i < Object.keys(response.data.candidate).length; i++) {
          if (Object.keys(response.data.candidate[i]).length > 10) {
            dataTest.push(response.data.candidate[i]);
          }
        }
        setValues({
          ...values,
          jobData: dataTest,
        });

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    userData();
  }, []);

  const filterByRole = (item) => {
    setFilterData(item);
  };

  const executeOnClick = () => {
    setIsExpanded(!isExpanded);
  };
  const test = (data) => {
    console.log("clicked");
    console.log(data);
  };

  return (
    <>
      <div className="table-responsive job-table">
        <div className="filter-menu">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => filterByRole("Data Engineer")}
            >
              Data Engineers
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => filterByRole("Full Stack Engineer")}
            >
              Full Stack Engineers
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => filterByRole("Cloud Engineer")}
            >
              Cloud Engineers
            </button>
          </div>
        </div>
        {Object.keys(values.jobData).length && (
          <DataTable
            striped
            responsive
            pagination
            paginationRowsPerPageOptions={[2, 3, 5]}
            paginationPerPage={5}
            highlightOnHover
            columns={columnsList}
            data={values.jobData.filter((item) => {
              if (filterData === "") {
                return item;
              } else if (item.interestedRole.includes(filterData)) {
                return item;
              }
            })}
          />
        )}
      </div>
    </>
  );
}
