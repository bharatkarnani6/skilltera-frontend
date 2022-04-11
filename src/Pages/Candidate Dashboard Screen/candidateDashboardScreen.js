import react, { useState, useEffect } from "react";
import axios, { useMemo } from "axios";
import DataTable from "react-data-table-component";
import ApiConstants from "../../Services/apiconstants";
import './candidateDashboardScreen.css'

export default function CandidateDashboardScreen() {
    const [values, setValues] = useState({
        candidateSelectionData: {},
    });
    const candidateData = JSON.parse(sessionStorage.getItem("candidate_data"));
    const [filterData, setFilterData] = useState("Shortlisted");
    const columnsList = [
        {
            name: "SR No.",
            cell: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Company Name",
            selector: (row) => row.companyId.companyName,
            sortable: true,
        },
        {
            name: filterData + " On",
            selector: (row) => dateConverter(row.currentStatusDate),
            sortable: true,
        },
    ];
    function dateConverter(str) {
        var date = new Date(str)
        var mnth = ("0" + (date.getMonth() + 1)).slice(-2)
        var day = ("0" + date.getDate()).slice(-2);
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);
        var seconds = ("0" + date.getSeconds()).slice(-2);
        var year = date.getFullYear();
        return `${year}-${mnth}-${day}`
    }

    const candidateSelectionUserData = () => {
        axios
            .get(ApiConstants.CANDIDATE_SHORTLISTED_DATA_BY_COMPANY, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    token: candidateData.token,
                    _id: candidateData.candidate._id,
                    "Access-Control-Allow-Origin": true,
                    "Access-Control-Allow-Methods": "GET, POST, PATCH",
                },
            })
            .then((response) => {
                setValues({ ...values, candidateSelectionData: response.data.shortlisted });
            }).catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        candidateSelectionUserData();
    }, []);

    const filterForCandidate = (data) => {
        setFilterData(data);
        if (data == "Shortlisted") {
            axios
                .get(ApiConstants.CANDIDATE_SHORTLISTED_DATA_BY_COMPANY, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: candidateData.token,
                        _id: candidateData.candidate._id,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    },
                })
                .then((response) => {
                    setValues({ ...values, candidateSelectionData: response.data.shortlisted });
                }).catch((err) => {
                    console.log(err);
                })
        }
        if (data == "Interviewed") {
            axios
                .get(ApiConstants.CANDIDATE_INTERVIEWED_DATA_BY_COMPANY, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: candidateData.token,
                        _id: candidateData.candidate._id,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    },
                })
                .then((response) => {
                    setValues({ ...values, candidateSelectionData: response.data.interviewed });
                }).catch((err) => {
                    console.log(err);
                })
        }
        if (data == "Rejected") {
            axios
                .get(ApiConstants.CANDIDATE_REJECTED_DATA_BY_COMPANY, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: candidateData.token,
                        _id: candidateData.candidate._id,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    },
                })
                .then((response) => {
                    setValues({ ...values, candidateSelectionData: response.data.rejected });
                }).catch((err) => {
                    console.log(err);
                })
        }
        if (data == "Saved") {
            axios
                .get(ApiConstants.CANDIDATE_SAVED_DATA_BY_COMPANY, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: candidateData.token,
                        _id: candidateData.candidate._id,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    },
                })
                .then((response) => {
                    setValues({ ...values, candidateSelectionData: response.data.saved });
                }).catch((err) => {
                    console.log(err);
                })
        }
        if (data == "Selected") {
            axios
                .get(ApiConstants.CANDIDATE_SELECTED_DATA_BY_COMPANY, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: candidateData.token,
                        _id: candidateData.candidate._id,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    },
                })
                .then((response) => {
                    setValues({ ...values, candidateSelectionData: response.data.selected });
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <>
            <div className="btn-group flex-wrap mt-4" role="group">
                <button type="button" class="btn btn btn-primary" onClick={() => filterForCandidate("Shortlisted")}>Shortlisted</button>
                <button type="button" class="btn btn btn-primary" onClick={() => filterForCandidate("Interviewed")}>Interviewed</button>
                <button type="button" class="btn btn btn-primary" onClick={() => filterForCandidate("Rejected")}>Rejected</button>
                <button type="button" class="btn btn btn-primary" onClick={() => filterForCandidate("Selected")}>Selected</button>
                <button type="button" class="btn btn btn-primary" onClick={() => filterForCandidate("Saved")}>Saved</button>
            </div>


            <div className="data-table">
                {Object.keys(values.candidateSelectionData).length == 0 &&
                    <><h5>As of today, there are no companies to display in this page. Please
                        check back later.</h5><h6>Please do check Skilltera website for additional features that we are about
                            to add to help your profile stand out.</h6></>
                }
                {Object.keys(values.candidateSelectionData).length != 0 && (
                    <DataTable
                        striped
                        responsive
                        pagination
                        paginationRowsPerPageOptions={[10, 15, 20]}
                        paginationPerPage={5}
                        highlightOnHover
                        dense
                        columns={columnsList}
                        data={values.candidateSelectionData}

                    />
                )}
            </div>


        </>
    )
}