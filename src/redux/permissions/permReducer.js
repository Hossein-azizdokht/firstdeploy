
import ADD_PERM from './permTypes';
//initial state 
const initState = {
    data: []
}

//reducer
const permissionReducer = (state = initState, action) => {
    
    switch (action.type) {
        case ADD_PERM:
            return { ...state, data: action.payload }
        default:
            return state
    }
}

export default permissionReducer;