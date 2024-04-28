

import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_FAILURE,
    FETCH_USERS_SUCCESS
} from './usersTypes'
//initial state 
const initState = {
    loading: false,
    allUsers: [],
    error: false,
    totalElements: 1,
    totalPages: 1,
    totalRecords: 1,
    currentPage: 1
    // permissions:{activate}

}

//reducer
const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true }
        case FETCH_USERS_FAILURE:
            return { loading: false, error: true, allUsers: [] }
        case FETCH_USERS_SUCCESS:
            return { loading: false, error: "", allUsers: action.payload, totalElements: action.payload }
        default:
            return state
    }
}

export default usersReducer;