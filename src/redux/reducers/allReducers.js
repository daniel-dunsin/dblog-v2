import authReducer from './authReducer';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import fetchReducer from './fetchReducers';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    blog: blogReducer,
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
    fetch: fetchReducer
});

export default allReducers;