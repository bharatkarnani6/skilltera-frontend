import react, { useState, useEffect } from "react";
import axios, { useMemo } from "axios";
import ApiConstants from "../../../Services/apiconstants";
import DataTable from "react-data-table-component";

import "./allCompanies.css";

export default function AllCompanies() {
  const [values, setValues] = useState({
    companyData: {},
  });
  const [searchTerm, setSearchTerm] = useState("")
  const columnsList = [
    {
      name: "ID",
      cell: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "Company Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];
  const companyUserData = () => {
    axios
      .get(ApiConstants.COMPANY_DATA)
      .then((response) => {
        setValues({ ...values, companyData: response.data.company });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    companyUserData();
  }, []);

  const handleSearch = (searchData) => {
    console.log(searchData.target.value);
  }
  return (
    <>
      <div className="table">
        <div className="search-box mt-3 mb-3 d-flex justify-content-end">
          <div className="form-group mb-2">
            <input type="search" className="form-control" size="24" placeholder="Search by Company Name" onChange={event => setSearchTerm(event.target.value)} />
          </div>
        </div>

        {Object.keys(values.companyData).length && (
          <DataTable
            striped
            responsive
            pagination
            paginationRowsPerPageOptions={[10, 15, 20]}
            paginationPerPage={10}
            highlightOnHover
            columns={columnsList}
            data={values.companyData.filter((item) => {
              if (searchTerm === "") {
                return item;
              } else if (
                item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return item;
              }
            })}
          />
        )}
      </div>
    </>
  );
}
