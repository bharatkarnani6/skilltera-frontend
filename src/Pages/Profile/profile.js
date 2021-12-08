import React from 'react'
import { useState } from 'react'
import './profile.css'
import Personal from '../Personal/Personal'
import Professional from '../Professonal/Professional'



const Profile = () => {


    const [showPers, setShowPers] = useState(false)
    const [showProf, setShowProf] = useState(false)

    const handlePersonalPage = () => {

        if(!showPers){
            
            setShowPers(true)
            setShowProf(false)

        }else{
            setShowPers(false)
        } 
    }

    const handlePerofessionalPage = () =>{

       if(!showProf){

             setShowProf(true)
             setShowPers(false)

      }else{

            setShowProf(false)
        }
    }

    return (
      <>

      <div className ="personalPage">
        <input type="submit" value="Personal Info" onClick={handlePersonalPage} />
        
        { showPers ? <Personal/> : null }
      </div>

      <div className="professionalPage">
        <input type="submit" value="Professional Info" onClick={handlePerofessionalPage} />
        { showProf ? <Professional/>  : null }

      </div>


      </>
    )

}

export default Profile
