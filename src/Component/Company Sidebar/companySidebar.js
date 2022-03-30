import react, { useState, createContext, useContext } from "react";
import "./companySidebar.css";
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
  BsCurrencyDollar,
  BsQuestionLg,
  BsCheckLg,
  BsXCircle,
  BsFillPersonCheckFill
} from "react-icons/bs";

import {
  SidebarMenuSelectionAction,
  ToggleAction,
} from "../../Redux/Action/toggleAction";

export default function CompanySidebar() {
  const dispatch = useDispatch();
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    dispatch(ToggleAction(menuCollapse));
  };
  const menuSelection = (data) => {
    dispatch(SidebarMenuSelectionAction(data));
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.pathname = "/";
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
                onClick={() => menuSelection("All Candidates")}
              >
                <FaList />
              </button>
              <span> All Candidates</span>
            </li>
            <li class="list-group-item">
              <button
                active={true}
                class="btn btn-primary mr-1"
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("Shortlisted Candidates")}
              >
                <BsCheckLg />
              </button>
              <span>Shortlisted Candidates</span>
            </li>
            <li class="list-group-item">
              <button
                active={true}
                class="btn btn-primary mr-1"
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("Rejected Candidates ")}
              >
                <BsXCircle />
              </button>
              <span>Rejected Candidates</span>
            </li>
            <li class="list-group-item">
              <button
                active={true}
                class="btn btn-primary mr-1"
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("Interviewing Candidates")}
              >
                <BsFillPersonCheckFill />
              </button>
              <span>Interviewing Candidates</span>
            </li>
            <li class="list-group-item">
              <button
                active={true}
                class="btn btn-primary mr-1"
                data-bs-dismiss="offcanvas"
                onClick={() => menuSelection("Future Candidates")}
              >
                <BsQuestionLg />
              </button>
              <span>Future Candidates</span>
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
