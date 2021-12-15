import react, { useContext, useEffect, useState } from 'react';
import './dashboard.css'
import Navbar from '../../Component/Navbar/navbar'
import Sidebar from '../../Component/Sidebar/sidebar';
import { useSelector } from 'react-redux';
import Aboutus from '../About/about';
import Profile from '../Profile/profile';
import Jobs from '../Jobs/jobs'

export default function Dashboard() {

     const candidateData =  JSON.parse( localStorage.getItem('candidate_data'))

     console.log(candidateData)
    
     const userName = candidateData.candidate.fullname

    const menu = useSelector((state) => state.toggleMenu);
    const titleSelection = useSelector((state) => state.sidebarMenuSelectionReducer);
    return (
        <div>
            <Navbar />
            <div className="container-fluid overflow-hidden">
                <div className="row g-0 no-gutters">
                    <div className={!menu.toggleValue ? 'toggle-width-sidebar' : 'col-2'} >
                        <Sidebar />
                    </div>
                    <div className={!menu.toggleValue ? 'toggle-width-dashboard' : 'col-10'} style={{ 'padding': '0' }}>
                        <div className="patch">
                            <div className="row">
                                <div className="col">
                                    <h4 className="p-2">{titleSelection.menuSelection}</h4>
                                </div>
                                <div className="col px-4 d-flex justify-content-end">
                                    <h4 className="p-2">Hi {userName}</h4>
                                </div>
                            </div>
                            {(() => {
                                switch (titleSelection.menuSelection) {
                                    case 'Dashboard':
                                        return <Aboutus />
                                        break;
                                    case 'Profile':
                                        return <Profile />
                                        break;
                                    case 'Jobs':
                                        return <Jobs />
                                        break;
                                    default:
                                        <h1>Error</h1>
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}