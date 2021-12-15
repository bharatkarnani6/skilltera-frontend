import react, { useContext, useEffect, useState } from 'react';
import './companyDashboard.css'
import Navbar from '../../Component/Navbar/navbar'
import Sidebar from '../../Component/Sidebar/sidebar';
import { useSelector } from 'react-redux';
import Aboutus from '../About/about';
import Profile from '../Profile/profile';
import Jobs from '../Jobs/jobs'
import CompanySidebar from '../../Component/Company Sidebar/companySidebar';

export default function CompanyDashboard() {
    const menu = useSelector((state) => state.toggleMenu);
    const titleSelection = useSelector((state) => state.sidebarMenuSelectionReducer);
    const data = JSON.parse(localStorage.getItem('company_loggedin_user_data'));
    console.log(data);
    return (
        <div>
            <Navbar />
            <div className="container-fluid overflow-hidden">
                <div className="row g-0 no-gutters">
                    <div className={!menu.toggleValue ? 'toggle-width-sidebar' : 'col-2'} >
                        <CompanySidebar />
                    </div>
                    <div className={!menu.toggleValue ? 'toggle-width-dashboard' : 'col-10'} style={{ 'padding': '0' }}>
                        <div className="patch">
                            <div className="row">
                                <div className="col">
                                    <h4 className="p-2">{titleSelection.menuSelection}</h4>
                                </div>
                                <div className="col px-4 d-flex justify-content-end">
                                    <h4 className="p-2">Hi Bharat</h4>
                                </div>
                            </div>
                            {(() => {
                                switch (titleSelection.menuSelection) {
                                    case 'Dashboard':
                                        return
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