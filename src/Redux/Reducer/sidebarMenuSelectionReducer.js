import produce from "immer"
const initialState = {
    menuSelection: 'Dashboard'
}
export const sidebarMenuSelectionReducer = (state = initialState, action) => {
    return produce(
        state, (draft) => {
            switch (action.type) {
                case 'SIDEBAR_MENU_SELECTION':
                    draft.menuSelection = action.data
                    break;
                default:
                    break;
            }
        }
    )
}