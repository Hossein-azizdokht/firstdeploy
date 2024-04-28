import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UseAuth } from "./_context/auth";
import getAccessToken from "./helper/getAccesstoken";
//REDUX
import { useDispatch, useSelector } from "react-redux";

import { storePermissionsData } from "./redux/permissions/PermActions";
function PrivateRoute({ component: Component, ...rest }) {

  //redux
  const dispatch = useDispatch();

  const Authorization = getAccessToken();

  const res = JSON.parse(localStorage.getItem('res'));
  dispatch(storePermissionsData(res));
  const { authTokens } = UseAuth();


  return (
    <Route
      {...rest}
      render={(props) =>
        //authTokens ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { referer: props.location } }} />
        (authTokens || Authorization) ? (<Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;

