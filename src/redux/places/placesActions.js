import {
  FETCH_PLACES_REQUEST,
  FETCH_PLACES_FAILURE,
  FETCH_PLACES_SUCCESS,
} from "./placesTypes";
import errorHandler from "../../helper/errorHandler";
import { PlaceGetAll } from "../../helper/requestList";
import Services from "../../helper/http";
import unAuthorizedHandler from "../../helper/unAuthorizedHandler";
import { toast } from "react-toastify";
//action creators

//fetch user request
export function fetchPlacesRequest(allPlaces) {
  return {
    type: FETCH_PLACES_REQUEST,
    payload: allPlaces,
  };
}

// fetch error
export function fetchPlacesFailure(error) {
  return {
    type: FETCH_PLACES_FAILURE,
    payload: error,
  };
}

//fetch success
export function fetchPlacesSuccess(allPlaces) {
  return {
    type: FETCH_PLACES_SUCCESS,
    payload: allPlaces,
  };
}

//asunc action creator
export const fetchPlaces = (filterData) => {
  debugger
  let PageNumber = filterData?.PageNumber;
  let PageSize = filterData?.PageSize;
  let placeNumber = filterData?.filter?.placeNumber;
  let title = filterData?.filter?.title;

  let apiUrl = PlaceGetAll; // Replace with your actual API endpoint
  const queryStringParams = {};

  if (filterData?.PageNumber) {
    queryStringParams.PageNumber = PageNumber;
  }
  if (filterData?.PageSize) {
    queryStringParams.PageSize = PageSize;
  }
  if (placeNumber) {
    queryStringParams.placeNumber = placeNumber;
  }
  if (title) {
    queryStringParams.title = title;
  }

  const queryString = new URLSearchParams(queryStringParams).toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  const services = new Services();
  return function (dispatch) {
    dispatch(fetchPlacesRequest());
    // services.get(FoodGetAll + `?PageNumber=${PageNumber}&PageSize=${PageSize}`)
    services
      .get(apiUrl)
      .then((res) => {
        if (res.statusCode === 500) {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        const allPlaces = res;
        dispatch(fetchPlacesSuccess(allPlaces));
      })
      .catch((Error) => {
        dispatch(fetchPlacesFailure(Error));
        errorHandler(Error);
      });
  };
};
