import {
    UPDATE_CREDENTIALS,
    VERIFY_PATTERNS,
    CLEAR_VERIFICATIONS,
    LOGIN,
    SIGNUP_WITH_EMAIL_AND_PASSWORD,
    CHECK_LOCALSTORAGE_AUTH
} from '../actions';


const authPatterns = {
    password: /^[\w@\-_?.]{6,}$/,
    email: /^([a-z\d\.\-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}

const initialState = {
    isAuth: false,
    credentials: {
        email: '',
        password: ''
    },
    errors: {
        password: '',
        email: '',
    }

};


const reducer = (state = initialState, action) => {
    if (action.type === UPDATE_CREDENTIALS) {
        if (action.payload.email != undefined) {
            return { ...state, credentials: { ...state.credentials, email: action.payload.email } }
        } else {
            return { ...state, credentials: { ...state.credentials, password: action.payload.password } }
        }
    }
    if (action.type === CLEAR_VERIFICATIONS) {
        return { ...state, errors: { email: '', password: '' }, credentials: { email: '', password: '' } }
    }
    if (action.type === VERIFY_PATTERNS) {
        // if they match the patterns remove the error message, else add it
        if (action.payload.type === 'email') {
            if (!authPatterns.email.test(state.credentials.email)) {
                return { ...state, errors: { ...state.errors, email: 'Please input a valid email' } }
            } else {
                return { ...state, errors: { ...state.errors, email: '' } }
            }
        }
        if (action.payload.type === 'password') {
            if (!authPatterns.password.test(state.credentials.password)) {
                return { ...state, errors: { ...state.errors, password: 'Password must be at least 6 characters' } }
            } else {
                return { ...state, errors: { ...state.errors, password: '' } }
            }
        }
    }

    if (action.type === LOGIN) {
        localStorage.setItem('dblogAuth', JSON.stringify({ isAuth: true, uid: action.payload.user.uid }))

        return { ...state, isAuth: true };
    }
    if (action.type === SIGNUP_WITH_EMAIL_AND_PASSWORD) {
        localStorage.setItem('dblogAuth', JSON.stringify({ isAuth: true, uid: action.payload.user.uid }))

        return { ...state, isAuth: true };
    }
    if (action.type == CHECK_LOCALSTORAGE_AUTH) {
        const auth = localStorage.getItem('dblogAuth') ? true : false
        return { ...state, isAuth: auth };
    }
    return state;
};

export default reducer;