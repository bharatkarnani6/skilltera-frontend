import react, { useState } from 'react'
import './adminSidebar.css'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch } from 'react-redux';
import { SidebarMenuSelectionAction, ToggleAction } from '../../Redux/Action/toggleAction';



export default function AdminSidebar() {

    const dispatch = useDispatch();
    const [menuCollapse, setMenuCollapse] = useState(false)

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
        dispatch(ToggleAction(menuCollapse))
    };
    const menuSelection = (data) => {
        dispatch(SidebarMenuSelectionAction(data))
    }

    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/";
    }

    return (
        <div>
            <ProSidebar collapsed={menuCollapse} width="14rem" style={{ 'height': '87vh' }}>
                <SidebarHeader>
                    {/* <div className="logotext">
                        <h5>Skilltera</h5>
                    </div> */}
                    <div className="closemenu d-flex justify-content-center" onClick={menuIconClick}>
                        {menuCollapse ? (
                            <GiHamburgerMenu size="2rem" />
                        ) : (
                            <GiHamburgerMenu size="2rem" />
                        )}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem active={true} icon={<FiHome />} onClick={() => menuSelection('Company Admin Page')}>
                            Company Admin Page
                        </MenuItem>
                        <MenuItem icon={<FaList />} onClick={() => menuSelection('Reset Company Password')}>Reset Company Password</MenuItem>
                        <MenuItem icon={<BiCog />} onClick={() => menuSelection('All Companies')}>All Companies</MenuItem>
                        <MenuItem icon={<BiCog />} onClick={() => menuSelection('All Candidates')}>All Candidates</MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                        <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
    )
}