import { combineReducers } from "redux";
import permissionReducer from "./permissions/permReducer";
import foodsReducer from "./foods/foodsReducer";
import loansReducer from "./loans/loansReducer";
import usersReducer from "./users/usersReducer";
import placesReducer from "./places/placesReducer";

const rootReducer = combineReducers({
  foodList: foodsReducer,
  loans: loansReducer,
  places: placesReducer,
  users: usersReducer,
  permissions: permissionReducer
});

export default rootReducer;
