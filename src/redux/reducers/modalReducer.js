import { CLOSE_MODAL, OPEN_MODAL } from "../actions";

const initalState = {
    modalOpen: false,
    modalText: '',
}

const modalReducer = (state = initalState, action) => {
    if (action.type === CLOSE_MODAL) {
        return { modalOpen: false, modalText: '' };
    }
    if (action.type === OPEN_MODAL) {
        return { modalOpen: true, modalText: action.payload.modalText }
    }

    return state;
}

export default modalReducer;