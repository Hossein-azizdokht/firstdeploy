import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { UseAuth } from "../_context/auth";
import Navbar from "../components/Navigation/Navigation";
import Dashboard from "./Dashboard";
import Admin_TopBar from "./_layout/Admin_TopBar";
//permission
import getAccessToken from "../helper/getAccesstoken";
import Services from "../helper/http";
import DefFoodOnCalendar from "./calendar/setFoodOnCalendar";
import AddLoan from "./loans/AddLoan";
import EditLoan from "./loans/EditLoan";
import LoanList from "./loans/LoanList";
import AddLoanRequest from "./userLoanRequests/AddLoanRequest";
import EditLoanRequest from "./userLoanRequests/EditLoanRequest";
import LoanRequestList from "./userLoanRequests/LoanRequestList";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import UserList from "./users/UserList";
import { ReservaitonCalendar } from "../components/bigCalendar/showLoanCalendar";
import ResFoodCalendar from "./calendar/viewLoanCalendar";
import PlacesList from "./places/PlacesList";
import AddPlace from "./places/AddPlace";
import EditPlace from "./places/EditPlace";
const AdminPanel = (props) => {
  const [username, setUsername] = useState("");
  const { setAuthTokens } = UseAuth();
  const [toggleMenu, setToggleMenu] = useState(false);
  const services = new Services();
  useEffect(() => {
    getAccessToken();
  }, []);

  function logOut() {
    setAuthTokens("");
    localStorage.removeItem("token");
    localStorage.removeItem("un");
    localStorage.removeItem("res");
  }

  function menuClick(e) {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  }

  return (
    <>
      <div className={`admin-main ${toggleMenu ? "collapsed" : ""}`}>
        <Navbar />
        <div className="admin-wrapper">
          <Admin_TopBar
            onClickLogOut={logOut}
            onClickToggleMenu={menuClick}
            username={username}
          />
          <div className="admin-content">
            <Route path="/admin/dashboard" exact component={Dashboard} />
            {/* loans -----------------------------------------*/}
            <Route path="/admin/loans" component={LoanList} />
            <Route path="/admin/add-loan" component={AddLoan} />
            <Route path="/admin/edit-loan" component={EditLoan} />
            {/* places -----------------------------------------*/}
            <Route path="/admin/places" component={PlacesList} />
            <Route path="/admin/add-place" component={AddPlace} />
            <Route path="/admin/edit-place" component={EditPlace} />
            {/* users -----------------------------------------*/}
            <Route path="/admin/users" component={UserList} />
            <Route path="/admin/add-user" component={AddUser} />
            <Route path="/admin/edit-user" component={EditUser} />

            <Route path="/admin/add-loan-request" component={AddLoanRequest} />
            <Route
              path="/admin/edit-loan-request"
              component={EditLoanRequest}
            />
            <Route path="/admin/loan-requests" component={LoanRequestList} />
            <Route path="/admin/calendar" component={ResFoodCalendar} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
