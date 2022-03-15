import { combineReducers } from "redux";
import { menuReducer } from "./menuReducer";
import { sidebarMenuSelectionReducer } from "./sidebarMenuSelectionReducer";
import { stateChangeForUpdate } from './stateChangeForUpdate'

const rootReducer = combineReducers({
    toggleMenu: menuReducer,
    sidebarMenuSelectionReducer: sidebarMenuSelectionReducer,
    stateChangeForUpdate: stateChangeForUpdate
});

export default rootReducer