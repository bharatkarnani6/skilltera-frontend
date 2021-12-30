import react, { useContext, useEffect, useState } from 'react';
import './adminDashboard.css'
import Navbar from '../../Component/Navbar/navbar'
import Sidebar from '../../Component/Sidebar/sidebar';
import { useSelector } from 'react-redux';
import Aboutus from '../About/about';
import Profile from '../Profile/profile';
import Jobs from '../Jobs/jobs'
import AdminSidebar from '../../Component/Admin Sidebar/adminSidebar';
import CompanyAdminPage from '../Admin/Company Admin Page/companyAdminPage';
import ResetCompanyPassword from '../Admin/Reset Company Password/resetCompanyPassword';
import AllCompanies from '../Admin/All Companies/allCompanies';
import AllCandidates from '../Admin/All Candidates/allCandidates';
import CandidateAdminSignup from '../Admin/Cadidate Admin Signup/candidateAdminSignup';

export default function AdminDashboard() {
    const menu = useSelector((state) => state.toggleMenu);
    const titleSelection = useSelector((state) => state.sidebarMenuSelectionReducer);
    // const data = JSON.parse(localStorage.getItem('company_loggedin_user_data'));
    // console.log(data);
    return (
        <div>
            <Navbar />
            <div className="container-fluid overflow-hidden">
                <div className="row g-0 no-gutters">
                    <div className={!menu.toggleValue ? 'toggle-width-sidebar' : 'col-2'} >
                        <AdminSidebar />
                    </div>
                    <div className={!menu.toggleValue ? 'toggle-width-dashboard' : 'col-10'} style={{ 'padding': '0' }}>
                        <div className="patch">
                            <div className="row">
                                <div className="col">
                                    <h4 className="p-2">{titleSelection.menuSelection}</h4>
                                </div>
                                <div className="col px-4 d-flex justify-content-end">
                                    <h4 className="p-2">Hi Admin</h4>
                                </div>
                            </div>
                            {(() => {
                                switch (titleSelection.menuSelection) {
                                    case 'Company Admin Page':
                                        return <CompanyAdminPage />
                                        break;
                                    case 'Reset Company Password':
                                        return <ResetCompanyPassword />
                                        break;
                                    case 'All Companies':
                                        return <AllCompanies />
                                        break;
                                    case 'All Candidates':
                                        return <AllCandidates />
                                        break;
                                    case 'Candidate Admin Signup':
                                        return <CandidateAdminSignup />
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