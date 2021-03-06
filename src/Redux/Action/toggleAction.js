export const ToggleAction = (value) => {
    return (dispatch) => {
        dispatch({
            type: "TOGGLE_MENU",
            data: value
        })
    };
}
export const SidebarMenuSelectionAction = (value) => {
    return (dispatch) => {
        dispatch({
            type: "SIDEBAR_MENU_SELECTION",
            data: value
        })
    };
}
export const StateChangeForUpdate = (value) => {
    return (dispatch) => {
        dispatch({
            type: "STATE_CHANGE_FOR_UPDATE",
            data: value
        })
    };
}