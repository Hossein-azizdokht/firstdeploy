import React, { useState, useEffect } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Admin_TopBar = (props) => {
  const [user, setuser] = useState();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setuser(user.firstName + " " + user.lastName);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="admin-topbar">
      <a href="" onClick={props.onClickToggleMenu} style={{ width: "40px" }}>
        <MdMenu />
      </a>
      <span style={{ flexGrow: "1" }}>
        <div>
          <Button
            aria-describedby={id}
            variant="text"
            color="inherit"
            onClick={handleClick}
          >
            <FaUserCircle style={{ marginLeft: "0.5rem", opacity: "0.7" }} />
            {user}
          </Button>
          {/* <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            className="dropDown"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 1,pr:2,pl:2,fontSize:'14px',width:'200px' }}>
              <Link to='/admin/account'>پروفایل</Link>
              <hr style={{margin:'8px 0'}}/>
              <Link to='/admin/account'>تغییر رمز</Link>
            </Typography>
          </Popover> */}
        </div>
      </span>
      <a
        title="خروج از سیستم"
        href=""
        onClick={props.onClickLogOut}
        className="left"
      >
        <BiLogOutCircle />
      </a>
    </div>
  );
};

export default Admin_TopBar;
