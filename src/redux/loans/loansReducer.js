

import {
    FETCH_LOANS_REQUEST,
    FETCH_LOANS_FAILURE,
    FETCH_LOANS_SUCCESS
} from './loansTypes'
//initial state 
const initState = {
    loading: false,
    allLoans: [],
    error: false,
    totalElements: 1,
    totalPages: 1,
    totalRecords: 1,
    currentPage: 1
    // permissions:{activate}

}

//reducer
const loansReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_LOANS_REQUEST:
            return { ...state, loading: true }
        case FETCH_LOANS_FAILURE:
            return { loading: false, error: true, allLoans: [] }
        case FETCH_LOANS_SUCCESS:
            return { loading: false, error: "", allLoans: action.payload, totalElements: action.payload }
        default:
            return state
    }
}

export default loansReducer;