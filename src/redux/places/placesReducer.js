

import {
    FETCH_PLACES_REQUEST,
    FETCH_PLACES_FAILURE,
    FETCH_PLACES_SUCCESS
} from './placesTypes'
//initial state 
const initState = {
    loading: false,
    allPlaces: [],
    error: false,
    totalElements: 1,
    totalPages: 1,
    totalRecords: 1,
    currentPage: 1
    // permissions:{activate}

}

//reducer
const placesReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_PLACES_REQUEST:
            return { ...state, loading: true }
        case FETCH_PLACES_FAILURE:
            return { loading: false, error: true, allPlaces: [] }
        case FETCH_PLACES_SUCCESS:
            return { loading: false, error: "", allPlaces: action.payload, totalElements: action.payload }
        default:
            return state
    }
}

export default placesReducer;