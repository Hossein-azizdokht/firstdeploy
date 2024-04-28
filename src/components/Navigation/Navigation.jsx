import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { IconContext } from "react-icons";

//permision import

//ICONS
import * as AiIcons from "react-icons/ai";
import Logo from "../../assets/images/logo.png";

import {
  CalendarToday,
  History,
  RefreshTwoTone,
  Settings,
} from "@material-ui/icons";
import { IoFastFoodOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { DateRange } from "@mui/icons-material";
import { SidebarData } from "./navData";

//permission

export default function Navbar() {
  const [hideSplash, sethideSplash] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      sethideSplash(true);
    }, 4050);
  }, []);

  const [sidebar, setSidebar] = useState(true);
  const [updateVersion, setUpdateVersion] = useState("");
  const showSidebar = () => setSidebar(!sidebar);

  //windows size detect
  const [windowSize, setWindowSize] = useState(getWindowSize());
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const version = "1.0.3";

  function doUpdate() {
    localStorage.setItem("v", version);
    window.location.href = window.location.href;
  }
  const UpdateMessage = () => (
    <div className="d-flex align-items-center">
      <RefreshTwoTone
        style={{ fontSize: "2.5rem", marginLeft: "1rem" }}
        className="ml-4 text-info"
      />
      <div>
        <h6 className="text-white m-0">بروزرسانی</h6>
        <p className="m-0" style={{ color: "#aaa" }}>
          جهت بروزرسانی کلیک نمایید
        </p>
      </div>
    </div>
  );
  useEffect(() => {
    //get client version from localStorage
    let ver = localStorage.getItem("v");

    if (ver != null || ver != undefined) {
      if (ver != version) {
        toast.info(UpdateMessage, {
          position: toast.POSITION.BOTTOM_RIGHT,
          closeOnClick: false,
          onClick: () => doUpdate(),
          theme: "dark",
          icon: false,
          autoClose: false,
        });
      }
    } else {
      localStorage.setItem("v", version);
    }
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    if (windowSize.innerWidth < 992) {
      setSidebar(false);
    }

    if (windowSize.innerWidth > 992) {
      setSidebar(true);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="navbar" onClick={showSidebar}>
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineMenuFold />
            </Link>
          </div>
          {/* <ul className="nav-menu-items" onClick={windowSize.innerWidth < 992 ? showSidebar : ""}> */}
          <ul className="nav-menu-items">
            <li className="navbar-toggle p-4">
              <Link to="#" className="menu-bars">
                <img width={130} src={Logo} alt="App logo" />
              </Link>
            </li>
            {/* <MenuList /> */}
            {SidebarData.map((item, index) => {
              if (item) {
                return (
                  // <li key={index} className={item.cName} onClick={windowSize.innerWidth < 992 ? showSidebar : ""}>
                  <li key={index} className={item.cName}>
                    <NavLink to={item.path} activeClassName="active">
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
          <div className="navFooter">
            کلیه حقوق محفوظ می باشد
            <br />
            {version}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}
