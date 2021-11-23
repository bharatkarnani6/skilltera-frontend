import { combineReducers } from "redux";
import { menuReducer } from "./menuReducer";
import { sidebarMenuSelectionReducer } from "./sidebarMenuSelectionReducer";

const rootReducer = combineReducers({
    toggleMenu: menuReducer,
    sidebarMenuSelectionReducer: sidebarMenuSelectionReducer
});

export default rootReducer