import react, { useState, createContext, useContext } from 'react'
import './sidebar.css'
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
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch } from 'react-redux';
import { SidebarMenuSelectionAction, ToggleAction } from '../../Redux/Action/toggleAction';



export default function Sidebar() {

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
            <ProSidebar collapsed={menuCollapse} width="14rem" style={{ 'height': '100vh' }}>
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
                        <MenuItem active={true} icon={<FiHome />} onClick={() => menuSelection('Dashboard')}>
                            Dashboard
                        </MenuItem>
                        {/* <MenuItem icon={<FaList />} onClick={() => menuSelection('Jobs')}>Jobs</MenuItem> */}
                        {/* <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem> */}
                        <MenuItem icon={<RiPencilLine />} onClick={() => menuSelection('Profile')}>Profile</MenuItem>
                        <MenuItem icon={<BiCog />} onClick={() => menuSelection('Settings')}>Settings</MenuItem>
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