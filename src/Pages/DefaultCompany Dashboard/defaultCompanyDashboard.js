import React ,{useState,useEffect} from 'react'
import "./defaultCompanyDashboard.css"
import ApiConstants from '../../Services/apiconstants';
import axios from 'axios'
import { setAutoFreeze } from 'immer';




const DefaultCompanyDashboard = () => {

const [flag, setFlag] = useState(false);
const [flag2 ,setFlag2] = useState(false);

const [allData ,setAllData] = useState([])
const [countData ,setCountData] = useState([])


const company_loggedin_user_data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data"))
const token = company_loggedin_user_data.token
const userId = company_loggedin_user_data.company._id

const requestOne = axios.get(ApiConstants.GET_SHORTLISTED_CANDIDATE ,{
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    token: token,
    _id: userId,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Methods":"GET, POST, PATCH",
  }
});

const requestTwo = axios.get(  ApiConstants.GET_INTERVIEWING_CANDIDATE,{
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    token: token,
    _id: userId,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Methods":"GET, POST, PATCH",
  }
});

const requestThree = axios.get(ApiConstants.GET_REJECTED_CANDIDATE ,{
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    token: token,
    _id: userId,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Methods":"GET, POST, PATCH",
  }
});

const requestFour = axios.get(ApiConstants.GET_FUTURE_CANDIDATE,{
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    token: token,
    _id: userId,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Methods":"GET, POST, PATCH",
  }
})

const requestFive = axios.get(ApiConstants.CANDIDATE_DATA);

const multipleAxiosCall = () => {

axios.all([requestOne,requestTwo,requestThree,requestFour ,requestFive] ).then(axios.spread((...responses) => {
  const responseOne = responses[0].data.shortlisted
  const responseTwo = responses[1].data.interviewed
  const responesThree = responses[2].data.rejected
  const responseFour = responses[3].data.saved
  const responseFive = responses[4].data.candidate

 // console.log("multipleRes : " ,responseOne ,responseTwo,responesThree,responseFour, responseFive)

  setFlag(true)

 setAllData([responseOne ,responseTwo,responesThree,responseFour, responseFive])

setCountData([responseOne.length ,responseTwo.length ,responesThree.length ,responseFour.length,responseFive.length])

  
})).catch((error) => {

    console.log(error)

})}




useEffect(() => {

  multipleAxiosCall()

  setFlag2(true);

},[flag])




const [currentStatus , setCurrentStatus] = useState([])


const [requireDate , setRequireDate] = useState('shortlistingDate')
const [label ,setLabel] = useState(["Role shortlisted for" ,"Shortlisted date","Days since shortlisted"])


const requireStatus = (enterStatus) => {
 if(flag === true){
     if(enterStatus === "Shortlisted"){
       setCurrentStatus( allData[0])
       setRequireDate("shortlistingDate")
       setLabel(["Role shortlisted for" ,"Shortlisted date","Days since shortlisted"])
     }
     else if(enterStatus === "Rejected"){
      setCurrentStatus( allData[2] )
      setRequireDate("rejectionDate")
      setLabel(["Role for Rejected " ,"Rejected date","Days since Rejected"])
     }
     else if(enterStatus === "Interviewing"){
      setCurrentStatus( allData[1] )
      setRequireDate("interviewingDate")
      setLabel(["Role for interview " ," Interviewing date","Days since interview"])

    }else if(enterStatus === "Saved"){
      setCurrentStatus( allData[3] )
      setRequireDate("savedDate")
      setLabel(["Role saved for " ," Saved date","Days since saved"])


    }
  }

}

const defaultShown = () => {

   if(flag2===true){

    setCurrentStatus( allData[0])

   }
}

useEffect(() => {

  defaultShown();
  
},[allData[0]])


function dateConverter(str) {
  var date = new Date(str)
  var mnth = ("0" + (date.getMonth() + 1)).slice(-2)
  var day = ("0" + date.getDate()).slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = ("0" + date.getSeconds()).slice(-2);
  var year = date.getFullYear();
  return `${day}`
}


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


function dateConverterTypeSec(str) {
  var date = new Date(str)
  var mnth = ("0" + (date.getMonth() + 1)).slice(-2)
  var day = ("0" + date.getDate()).slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = ("0" + date.getSeconds()).slice(-2);
  var year = date.getFullYear();
  return `${day + " " + monthNames[mnth-1] + " " +year}`
  
}
const d = new Date()

console.log(currentStatus)

return (
        <>


 <h3 class="text-center mt-5">Total Candidate  - {countData[4]}</h3>
       <div className="d-flex justify-content-center" >  
          <button
           type="button"
          className="btn btn-outline-primary btn-sm m-1"

    onClick = {() => requireStatus("Shortlisted") } 
>
  Shortlisted (#{countData[0]})
</button>
<button
type="button"
className="btn btn-outline-primary btn-sm m-1"
onClick = {() => requireStatus("Rejected") } 
>
Rejected  (#{countData[2]})
</button>
<button
type="button"
className="btn btn-outline-primary btn-sm m-1"
onClick = {() => requireStatus("Interviewing") } 
>
 Interviewing (#{countData[1]})
</button>
<button
type="button"
className="btn btn-outline-primary btn-sm m-1 " 
onClick = {() => requireStatus("Saved") } 
>
 Saved (#{countData[3]})
</button>    
    </div> 
         

<table class="table table-sm w-75 myTable">

<thead className="thead-dark">
<tr>
<th scope="col"> Candidate Name</th>
<th scope="col"> {label[0]}</th>
<th scope="col">{label[1]} </th>
<th scope="col">{label[2]}</th>
</tr>
</thead>

<tbody >
{currentStatus.map((data, i) => {      
        return (
    <tr> 
    <td class="text-center" > {data.candidateId.fullname} </td>
    <td class="text-center">{data.candidateId.currentRole}</td>        
    <td class="text-center" >{ dateConverterTypeSec(data.selectionTimeline[requireDate])}</td>
    <td class="text-center">{-(dateConverter( data.selectionTimeline[requireDate]) - d.getDate()) } </td>
    </tr>
        )})}
</tbody>

</table>



        </>
    )
}

export default DefaultCompanyDashboard





