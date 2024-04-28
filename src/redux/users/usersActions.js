import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from "./usersTypes";
import errorHandler from "../../helper/errorHandler";
import { UserGetAll } from "../../helper/requestList";
import Services from "../../helper/http";
import unAuthorizedHandler from "../../helper/unAuthorizedHandler";
import { toast } from "react-toastify";
//action creators

//fetch user request
export function fetchUsersRequest(allUsers) {
  return {
    type: FETCH_USERS_REQUEST,
    payload: allUsers,
  };
}

// fetch error
export function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
}

//fetch success
export function fetchUsersSuccess(allUsers) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: allUsers,
  };
}

//asunc action creator
export const fetchUsers = (filterData) => {
  debugger;
  let PageNumber = filterData?.PageNumber;
  let PageSize = filterData?.PageSize;
  let personNumber = filterData?.filter?.personNumber;
  let username = filterData?.filter?.username;

  let apiUrl = UserGetAll; // Replace with your actual API endpoint
  const queryStringParams = {};

  if (filterData.PageNumber) {
    queryStringParams.PageNumber = PageNumber;
  }
  if (filterData.PageSize) {
    queryStringParams.PageSize = PageSize;
  }
  if (personNumber) {
    queryStringParams.personNumber = personNumber;
  }
  if (username) {
    queryStringParams.username = username;
  }

  const queryString = new URLSearchParams(queryStringParams).toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  const services = new Services();
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    // services.get(FoodGetAll + `?PageNumber=${PageNumber}&PageSize=${PageSize}`)
    services
      .get(apiUrl)
      .then((res) => {
        if (res.statusCode === 500) {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        const allUsers = res;
        dispatch(fetchUsersSuccess(allUsers));
      })
      .catch((Error) => {
        dispatch(fetchUsersFailure(Error));
        errorHandler(Error);
      });
  };
};
