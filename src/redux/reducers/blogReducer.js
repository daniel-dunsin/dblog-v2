import { CLEAR_BLOG_DETAILS, UPDATE_BLOG_CREDENTIALS, UPLOAD_IMAGE, GET_ALL_BLOGS, SET_USERS_BLOGS } from "../actions";
const initialState = {
    uploads: {
        title: '',
        image: null,
        body: '',
        tagsText: '',
        convertedTagsList: [],
    },
    allBlogs: [],
    userBlogs: []
};

const reducer = (state = initialState, action) => {
    if (action.type === UPDATE_BLOG_CREDENTIALS) {
        if (action.payload.type === 'title') {
            return { ...state, uploads: { ...state.uploads, title: action.payload.variable } }
        }
        if (action.payload.type === 'body') {
            return { ...state, uploads: { ...state.uploads, body: action.payload.variable } }
        }
        if (action.payload.type === 'tags') {
            let convertedTags = action.payload.variable.split(',');
            // trim it to remove white spaces;
            convertedTags = convertedTags.map(tag => tag.trim());
            return { ...state, uploads: { ...state.uploads, convertedTagsList: convertedTags, tagsText: action.payload.variable } }
        }
    }
    if (action.type === CLEAR_BLOG_DETAILS) {
        return {
            ...state, uploads: {
                title: '',
                image: null,
                body: '',
                tagsText: '',
                convertedTagsList: [],
            }
        }
    }
    if (action.type === UPLOAD_IMAGE) {
        return { ...state, uploads: { ...state.uploads, image: action.payload.imageURL } }
    }
    if (action.type === GET_ALL_BLOGS) {
        return { ...state, allBlogs: action.payload.blogs }
    }
    if(action.type === SET_USERS_BLOGS){
        return {...state, userBlogs: action.payload.blogs}
    }
    return state;
};

export { reducer }