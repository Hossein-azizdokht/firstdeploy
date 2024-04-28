import React, { useState, useEffect } from "react";
// import "../node_modules/antd/dist/antd.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./_context/auth";
import "./sass/pars.scss";

//admin pages
import Login from "./Admin/Login";
import AdminPanel from "./Admin/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("token", data);
    setAuthTokens(data);
  };

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      lightOrange: {
        main: "#f39c69",
        darker: "#053e85",
      },
      success: {
        main: "#7cb342",
        contrastText: "#fff",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AuthContext.Provider
            value={{ authTokens, setAuthTokens: setTokens }}
          >
            <Switch>
              <div className="App">
                <section className="admin">
                  <Route exact path="/" component={Login} />
                  <PrivateRoute path="/admin" component={AdminPanel} />
                  {/* <Route path="*" component={ChangePassword} /> */}
                </section>
              </div>
            </Switch>
          </AuthContext.Provider>
        </Provider>
        <ToastContainer
          theme="colored"
          autoClose={5000}
          rtl
          limit={10}
          draggable={true}
        />
      </ThemeProvider>
    </>
  );
}

export default App;
