import axios, { useMemo } from 'axios';
import React, { useEffect, useState } from 'react'
import ApiConstants from '../../Services/apiconstants';
import './jobs.css'
import Swal from 'sweetalert2'
import { useTable } from 'react-table'
import ShowMoreText from "react-show-more-text";
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

export default function Jobs() {



    const columnsList = [
        {
            Header: 'ID',
        }, {
            Header: 'Overall Exprience (Years)',
            accessor: 'experience'
        }, {
            Header: 'Current Role',
            accessor: 'currentRole'
        }, {
            Header: 'Current Client/Company',
            accessor: 'currentCompany'
        }, {
            Header: 'Companies/Client worked with',
            accessor: 'previousEmployers'
        }, {
            Header: 'Available In (Weeks)',
            accessor: 'timeToJoin'
        }, {
            Header: 'Key Skill Areas',
            accessor: 'knownTechnologies'
        }, {
            Header: 'Brief about experience/ skills / key aspects of projects',
            accessor: 'experienceDescription'
        }, {
            Header: 'Looking for',
            accessor: 'typeOfJob'
        }, {
            Header: 'Expected Salary per year / Rate per hour (C2H/C2C)',
            accessor: 'expectedRateC2CorC2H'
        }, {
            Header: 'Open to relocation',
            accessor: 'relocation'
        }, {
            Header: 'Do you want to Interview ?'
        }
    ]
    const [values, setValues] = useState({
        jobData: {}
    })
    const [filterToggle, setFilterToggle] = useState(false);
    const [filterData, setFilterData] = useState('');
    const userData = () => {
        axios.get(ApiConstants.COMPANY_DATA).then((response) => {
            var dataTest = [];
            for (var i = 0; i < Object.keys(response.data.candidate).length; i++) {
                if (Object.keys(response.data.candidate[i]).length > 8) {
                    dataTest.push(response.data.candidate[i]);
                }
            }
            setValues({
                ...values, jobData:
                    dataTest
            })
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        userData()
        setTimeout(() => {
            $(() => {
                $('#myTable').DataTable({
                    "lengthMenu": [2, 3, 5, 100],
                    "searching": false,
                    "ordering": false,
                });
            });
        }, 1000)



    }, [])



    function filterByRole(item) {
        setFilterToggle(!filterToggle);
        setFilterData(item)

        // values.jobData.filter(data => data.interestedRole.includes(item)).map(filterDatas => {
        //     filterData.push(filterDatas)
        // })
        // console.log(filterData);
        // setValues({ ...values, jobData: filterData })
        // setTimeout(() => {

        //     console.log(values.jobData);
        // }, 5000)


    }

    const [isExpanded, setIsExpanded] = useState(false)
    const executeOnClick = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <>
            <div className="table-responsive job-table">
                <div className="filter-menu">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={() => filterByRole("Data Engineer")}>Data Engineers</button>
                        <button type="button" className="btn btn-primary" onClick={() => filterByRole("Full Stack Engineer")}>Full Stack Engineers</button>
                        <button type="button" className="btn btn-primary" onClick={() => filterByRole("Cloud Engineer")}>Cloud Engineers</button>
                    </div>
                </div>
                <table id="myTable" className="table-light">
                    <thead>
                        <tr>
                            {columnsList.map(column => {
                                return (
                                    <th>{column.Header}</th>
                                )
                            })}
                        </tr>

                    </thead>
                    <tbody>
                        {
                            !filterToggle && Object.keys(values.jobData).length != 0 && values.jobData.map((data, i) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{++i}</td>
                                            <td>{data.experience}</td>
                                            <td>{data.currentRole}</td>
                                            <td>{data.currentCompany}</td>
                                            <td>{data.previousEmployers}</td>
                                            <td>{data.timeToJoin}</td>
                                            <td>{data.knownTechnologies}</td>
                                            <td>
                                                <ShowMoreText
                                                    /* Default options */
                                                    lines={1}
                                                    more="Show more"
                                                    less="Show less"
                                                    className="content-css"
                                                    anchorClass="my-anchor-css-class"
                                                    onClick={executeOnClick}
                                                    expanded={isExpanded}
                                                    width={280}
                                                    truncatedEndingComponent={"... "}
                                                >{data.experienceDescription}</ShowMoreText>
                                            </td>
                                            <td>{data.typeOfJob}</td>
                                            <td>{data.expectedRateC2CorC2H}</td>
                                            <td>{data.relocation ? 'Yes' : 'No'}</td>
                                            <td><input className="form-check-input" type="checkbox" /></td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                        {
                            filterToggle && Object.keys(values.jobData).length != 0 && values.jobData.filter(data => data.interestedRole.includes(filterData)).map((data, i) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{++i}</td>
                                            <td>{data.experience}</td>
                                            <td>{data.currentRole}</td>
                                            <td>{data.currentCompany}</td>
                                            <td>{data.previousEmployers}</td>
                                            <td>{data.timeToJoin}</td>
                                            <td>{data.knownTechnologies}</td>
                                            <td>
                                                <ShowMoreText
                                                    /* Default options */
                                                    lines={1}
                                                    more="Show more"
                                                    less="Show less"
                                                    className="content-css"
                                                    anchorClass="my-anchor-css-class"
                                                    onClick={executeOnClick}
                                                    expanded={isExpanded}
                                                    width={280}
                                                    truncatedEndingComponent={"... "}
                                                >{data.experienceDescription}</ShowMoreText>
                                            </td>
                                            <td>{data.typeOfJob}</td>
                                            <td>{data.expectedRateC2CorC2H}</td>
                                            <td>{data.relocation ? 'Yes' : 'No'}</td>
                                            <td><input className="form-check-input" type="checkbox" /></td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}