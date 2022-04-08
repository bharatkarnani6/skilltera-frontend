import React ,{useEffect,useState} from 'react'
import './interviewingCand.css'
import axios from "axios";
import Card from "../../Component/Card/card"
import ApiConstants from "../../Services/apiconstants";

const InterviewingCand = () => {
  const [interviewedCand ,setInterviewedCand] = useState([])
  const [flag, setFlag] = useState(false);
  const [role, setRole] = useState([]);

  const company_loggedin_user_data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data")) 

  const token = company_loggedin_user_data.token
  const userId = company_loggedin_user_data.company._id

  const userData = () => {
    axios
      .get(ApiConstants.GET_INTERVIEWING_CANDIDATE ,{
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          token: token,
          _id: userId,
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Methods": "GET, POST, PATCH",
        },
      })
      .then((response) => {
        console.log("intervied : ", response)
        setInterviewedCand(response.data.interviewed);
        setFlag(true)
      }).catch((err) => {
       console.log(err);
      })
  }
  
  const filterRoles = () => {
    if (Object.keys(interviewedCand).length > 0 && flag) {
      let arrByID = interviewedCand.filter((item) => {
         role.push(item.candidateId.currentRole);
      });
    }
  }
  useEffect(() => {

    userData()
    if (flag) {
     filterRoles();
   }
   
   }, [flag])

   
let uniqueRole = [...new Set(role)]

const defaultRole = uniqueRole[0]   


const [clickRole, setClickRole] = useState([]);

const filterByRole = (clickItem ) => {
  if (Object.keys(interviewedCand).length > 0 && flag) {
    let arrByID = interviewedCand.filter((item) => {
      if (clickItem === item.candidateId.currentRole ) {
        return item;
      }
    });
    setClickRole(arrByID);
  }
}

useEffect(() => {
  
    
  filterByRole( defaultRole)


}, [flag]);


    return (
        <>

        
<div className="table-responsive job-table mt-4">
        <div className="filter-menu" style={{ overflowX: "auto" }}>
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
            interestedRole={data.candidateId.interestedRole}
            currentCompany={data.candidateId.currentCompany}
            currentRole={data.candidateId.currentRole}
            experience={data.candidateId.experience}
            timeToJoin={data.candidateId.timeToJoin}
            expectedRateC2CorC2H={data.candidateId.expectedRateC2CorC2H}
            experienceDescription={data.candidateId.experienceDescription}
            knownTechnologies={data.candidateId.knownTechnologies}
            previousEmployers={data.candidateId.previousEmployers}
            typeOfJob={data.candidateId.typeOfJob}
            userData={data.candidateId}
            interviewTabs = {true}
            />
          );
        })}
      </div> 

        </>
    )
}

export default InterviewingCand
