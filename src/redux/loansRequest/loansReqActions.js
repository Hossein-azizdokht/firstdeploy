import {
  FETCH_LOANS_REQ_REQUEST,
  FETCH_LOANS_REQ_FAILURE,
  FETCH_LOANS_REQ_SUCCESS,
} from "./loansTypes";
import errorHandler from "../../helper/errorHandler";
import { LoanGetAll } from "../../helper/requestList";
import Services from "../../helper/http";
import unAuthorizedHandler from "../../helper/unAuthorizedHandler";
import { toast } from "react-toastify";
//action creators

//fetch user request
export function fetchLoansRequest(allLoans) {
  return {
    type: FETCH_LOANS_REQ_REQUEST,
    payload: allLoans,
  };
}

// fetch error
export function fetchLoansFailure(error) {
  return {
    type: FETCH_LOANS_REQ_FAILURE,
    payload: error,
  };
}

//fetch success
export function fetchLoansSuccess(allLoans) {
  return {
    type: FETCH_LOANS_REQ_SUCCESS,
    payload: allLoans,
  };
}

//asunc action creator
export const fetchLoans = (filterData) => {
  debugger
  let PageNumber = filterData?.PageNumber;
  let PageSize = filterData?.PageSize;
  let loanNumber = filterData?.filter?.loanNumber;
  let title = filterData?.filter?.title;

  let apiUrl = LoanGetAll; // Replace with your actual API endpoint
  const queryStringParams = {};

  if (filterData.PageNumber) {
    queryStringParams.PageNumber = PageNumber;
  }
  if (filterData.PageSize) {
    queryStringParams.PageSize = PageSize;
  }
  if (loanNumber) {
    queryStringParams.loanNumber = loanNumber;
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
    dispatch(fetchLoansRequest());
    // services.get(FoodGetAll + `?PageNumber=${PageNumber}&PageSize=${PageSize}`)
    services
      .get(apiUrl)
      .then((res) => {
        if (res.statusCode === 500) {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        const allLoans = res;
        dispatch(fetchLoansSuccess(allLoans));
      })
      .catch((Error) => {
        dispatch(fetchLoansFailure(Error));
        errorHandler(Error);
      });
  };
};
