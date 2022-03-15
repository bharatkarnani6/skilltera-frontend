import produce from "immer"
const initialState = {
    toogleUpdate: ''
}
export const stateChangeForUpdate = (state = initialState, action) => {
    return produce(
        state, (draft) => {
            switch (action.type) {
                case 'STATE_CHANGE_FOR_UPDATE':
                    draft.toogleUpdate = action.data
                    console.log(draft.toogleUpdate);
                    break;
                default:
                    break;
            }
        }
    )

}
