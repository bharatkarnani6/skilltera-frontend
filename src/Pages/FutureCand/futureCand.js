import React ,{useState,useEffect} from "react";
import "./futureCand.css";
import axios from "axios";
import Card from "../../Component/Card/card"
import ApiConstants from "../../Services/apiconstants";

const FutureCand = () => {

  const company_loggedin_user_data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data")) 

  const token = company_loggedin_user_data.token
  const userId = company_loggedin_user_data.company._id

  const [futureCand ,setFutureCand] = useState([])
    
  const userData = () => {
    axios
      .get(ApiConstants.GET_FUTURE_CANDIDATE ,{
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
        console.log(response)
         setFutureCand(response.data.saved);
      }).catch((err) => {
       console.log(err);
      })
  }
  
  useEffect(() => {
   userData()
  }, [])

  return (
    <>
    <div class="mr-4 ml-4">
        {futureCand.map((data, i) => {
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
            />
          );
        })}
      </div>
    </>
  );
};

export default FutureCand;
