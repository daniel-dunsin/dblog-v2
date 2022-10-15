import { SET_USER, SET_AUTH_USER, HANDLE_EDIT_USER_CHANGE, SET_EDIT_USER, ADD_EDIT_USER_IMAGE } from "../actions";
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
    },
    editUser: {
        displayName: '',
        email: '',
        phoneNumber: '',
        linkedin: '',
        github: '',
        portfolio: '',
        twitter: '',
        photoURL: '',
    }
};

const reducer = (state = initialState, action) => {
    if (action.type === SET_AUTH_USER) {
        return { ...state, authUser: action.payload.user };
    }
    if (action.type === SET_USER) {
        return { ...state, userData: action.payload.user }
    }
    if (action.type === SET_EDIT_USER) {
        return { ...state, editUser: { ...state.authUser } }
    }
    if (action.type === ADD_EDIT_USER_IMAGE) {
        return { ...state, editUser: { ...state.editUser, photoURL: action.payload.photoURL } }
    }
    if (action.type === HANDLE_EDIT_USER_CHANGE) {
        // edit dynamically
        const { name, value } = action.payload;
        return {
            ...state,
            editUser: {
                ...state.editUser,
                [name]: value,
            }
        }
    }
    return state;
};

export default reducer