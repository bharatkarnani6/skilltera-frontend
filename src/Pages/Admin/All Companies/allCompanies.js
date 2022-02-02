import react, { useState, useEffect } from "react";
import axios, { useMemo } from "axios";
import ApiConstants from "../../../Services/apiconstants";
import DataTable from "react-data-table-component";

import "./allCompanies.css";

export default function AllCompanies() {
  const [values, setValues] = useState({
    companyData: {},
  });
  const columnsList = [
    {
      name: "ID",
      cell: (row, index) => index + 1,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
    },
    {
      name: "Company Email",
      selector: (row) => row.email,
    },
  ];
  const companyUserData = () => {
    axios
      .get(ApiConstants.COMPANY_DATA)
      .then((response) => {
        console.log(response.data.company);
        setValues({ ...values, companyData: response.data.company });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    companyUserData();
  }, []);
  return (
    <>
      <div className="table">
        {Object.keys(values.companyData).length && (
          <DataTable
            striped
            responsive
            pagination
            paginationRowsPerPageOptions={[10, 15, 20]}
            paginationPerPage={10}
            highlightOnHover
            columns={columnsList}
            data={values.companyData}
          />
        )}
      </div>
    </>
  );
}
