import { reducer as authReducer } from './authReducer';
import { reducer as blogReducer } from './blogReducer';
import { reducer as userReducer } from './userReducer';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    blog: blogReducer,
    auth: authReducer,
    user: userReducer
});

export default allReducers;