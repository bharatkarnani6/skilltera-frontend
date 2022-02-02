import react, { useState, createContext, useContext, useEffect } from "react";
import "./sidebar.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import {
  SidebarMenuSelectionAction,
  ToggleAction,
} from "../../Redux/Action/toggleAction";

export default function Sidebar() {
  const dispatch = useDispatch();

  const menuSelection = (data) => {
    dispatch(SidebarMenuSelectionAction(data));
  };

  return (
    <div>
      <button
        class="btn btn-primary border border-dark  sidebarBtn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        <GiHamburgerMenu />
      </button>

      <div
        class="offcanvas offcanvas-start canvas collapseOnSelect"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
        data-trap-focus="true"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Dashboard Item
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <button
                class="btn btn-primary  mr-1"
                active={true}
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("Dashboard")}
              >
                <FiHome />
              </button>
              <span> Dashboard</span>
            </li>

            <li class="list-group-item">
              <button
                active={true}
                class="btn btn-primary mr-1"
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("Personal Info")}
              >
                <RiPencilLine />
              </button>
              <span> Personal Info</span>
            </li>
            <li class="list-group-item">
              <button
                active={true}
                class="btn btn-primary mr-1"
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("Professional Info")}
              >
                <RiPencilLine />
              </button>
              <span>Professional</span>
            </li>

            <li class="list-group-item">
              <button
                class="btn btn-primary mr-1"
                active={true}
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("Settings")}
              >
                <BiCog />
              </button>
              <span>Settings</span>
            </li>

            <li class="list-group-item">
              <button
                class="btn btn-primary mr-1"
                active={true}
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("logout")}
              >
                <FiLogOut />
              </button>
              logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
