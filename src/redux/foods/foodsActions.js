import {
  FETCH_FOODS_REQUEST,
  FETCH_FOODS_FAILURE,
  FETCH_FOODS_SUCCESS,
} from "./foodsTypes";
import errorHandler from "../../helper/errorHandler";
import { FoodGetAll } from "../../helper/requestList";
import Services from "../../helper/http";
import unAuthorizedHandler from "../../helper/unAuthorizedHandler";
import { toast } from "react-toastify";
//action creators

//fetch user request
export function fetchFoodsRequest(allFoods) {
  return {
    type: FETCH_FOODS_REQUEST,
    payload: allFoods,
  };
}

// fetch error
export function fetchFoodsFailure(error) {
  return {
    type: FETCH_FOODS_FAILURE,
    payload: error,
  };
}

//fetch success
export function fetchFoodsSuccess(allFoods) {
  return {
    type: FETCH_FOODS_SUCCESS,
    payload: allFoods,
  };
}

//asunc action creator
export const fetchFoods = (filterData) => {
  debugger;
  let PageNumber = filterData?.PageNumber;
  let PageSize = filterData?.PageSize;
  if (filterData?.PageNumber == null) {
    PageNumber = "";
  }
  if (filterData?.PageSize == null) {
    PageSize = "";
  }

  const services = new Services();
  return function (dispatch) {
    dispatch(fetchFoodsRequest());
    // services.get(FoodGetAll + `?PageNumber=${PageNumber}&PageSize=${PageSize}`)
    services
      .get(FoodGetAll)
      .then((res) => {
        if (res.statusCode === 500) {
          toast.error(res.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
        const allFoods = res;
        dispatch(fetchFoodsSuccess(allFoods));
      })
      .catch((Error) => {
        dispatch(fetchFoodsFailure(Error));
        errorHandler(Error);
      });
  };
};
