import authReducer from './authReducer';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    blog: blogReducer,
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
});

export default allReducers;