import produce from "immer"
const initialState = {
    toggleValue: false
}
export const menuReducer = (state = initialState, action) => {
    return produce(
        state, (draft) => {
            switch (action.type) {
                case 'TOGGLE_MENU':
                    draft.toggleValue = action.data
                    break;
                default:
                    break;
            }
        }
    )
}