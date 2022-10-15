import { START_LOADING, STOP_LOADING } from "../actions";

const initialState = {
    loading: '',
}

const fetchReducer = (state = initialState, action) => {
    if (action.type === START_LOADING) {
        return { loading: true };
    }
    if (action.type === STOP_LOADING) {
        return { loading: false };
    }
    return state;
};

export default fetchReducer;