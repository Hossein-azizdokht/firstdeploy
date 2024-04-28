

import {
    FETCH_FOODS_REQUEST,
    FETCH_FOODS_FAILURE,
    FETCH_FOODS_SUCCESS
} from './foodsTypes'
//initial state 
const initState = {
    loading: false,
    allFoods: [],
    error: false,
    totalElements: 1,
    totalPages: 1,
    totalRecords: 1,
    currentPage: 1
    // permissions:{activate}

}

//reducer
const foodsReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_FOODS_REQUEST:
            return { ...state, loading: true }
        case FETCH_FOODS_FAILURE:
            return { loading: false, error: true, allFoods: [] }
        case FETCH_FOODS_SUCCESS:
            return { loading: false, error: "", allFoods: action.payload, totalElements: action.payload }
        default:
            return state
    }
}

export default foodsReducer;