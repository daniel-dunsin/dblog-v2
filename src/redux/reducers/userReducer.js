import { auth } from "../../firebase-config";
import { SET_USER, SET_AUTH_USER } from "../actions";
const initialState = {
    userData: {
        email: '',
        displayName: '',
        github: '',
        linkedin: '',
        phoneNumber: '',
        photoURL: '',
        portfolio: '',
        twitter: '',
        uid: '',
    },
    authUser: {
        email: '',
        displayName: '',
        phoneNumber: '',
        photoURL: '',
        uid: '',
    }
};

const reducer = (state = initialState, action) => {
    if (action.type === SET_AUTH_USER) {
        return { ...state, authUser: action.payload.user };
    }
    if (action.type === SET_USER) {
        return { ...state, userData: action.payload.user }
    }
    return state;
};

export { reducer }