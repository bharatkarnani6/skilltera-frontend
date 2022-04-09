import axios, { useMemo } from "axios";
import React, { useEffect, useState, useCallback } from "react";
import ApiConstants from "../../Services/apiconstants";
import "./jobs.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Card from "../../Component/Card/card";

export default function Jobs() {

  const [allData, setAllData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [role, setRole] = useState([]);

  const [clickRole, setClickRole] = useState([]);
  const [uniqueRole ,setUniqueRole] =useState([])

  const userData = () => {
    axios
      .get(ApiConstants.CANDIDATE_DATA)
      .then((response) => {
       // console.log( "res : " ,response)
        setAllData(response.data.candidate)
        setFlag(true)
      })
      .catch((err) => {
        console.log(err)
      })
  };

 const filterRoles = () => {
    if (Object.keys(allData).length > 0 && flag) {
      let arrByID = allData.filter((item) => {
        role.push(item.currentRole);
      });
    }
   setUniqueRole([...[...new Set(role)]])
  }


const filterByRole = (clickItem) => {
    if (Object.keys(allData).length > 0 && flag){
      let arrByID = allData.filter((item) => {
        if (clickItem === item.currentRole ) {
          return item;
           }
      })
      setClickRole(arrByID);
    }
}

useEffect(() => {
    userData()   
    filterRoles()
 }, [flag])

const defaultFilterByRole = () => {
    if (Object.keys(allData).length > 0 && flag){
          const fr = uniqueRole[0]
      let arrByID = allData.filter((item) => {
        if (fr === item.currentRole ) {
          return item;
          }
      })
     setClickRole(arrByID)
    }
}

useEffect(() => {

  defaultFilterByRole()

},[uniqueRole[0]])


return (
    <>
      <div className="table-responsive job-table mt-4">
        <div className="filter-menu" style={{ overflowX:"auto"}}>
          <div className="btn-group" role="group">
            {uniqueRole.map((data, i) => (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => filterByRole(data)}
              >
                 {data}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div class="mr-4 ml-4">
        {clickRole.map((data, i) => {      
          return (
           <Card
              interestedRole={data.interestedRole}
              currentCompany={data.currentCompany}
              currentRole={data.currentRole}
              experience={data.experience}
              timeToJoin={data.timeToJoin}
              expectedRateC2CorC2H={data.expectedRateC2CorC2H}
              experienceDescription={data.experienceDescription}
              knownTechnologies={data.knownTechnologies}
              previousEmployers={data.previousEmployers}
              typeOfJob={data.typeOfJob}
              userData={data}
            /> 
          )       
        })}
      </div>
    </>
  );
}
