import { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
//DATE PICKER
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

//REDUX
import { useDispatch } from "react-redux";
import getAccessToken from "../../helper/getAccesstoken";

import { Save } from "@material-ui/icons";
import moment from "moment-jalaali";
import { FormControl, MenuItem } from "mui-core";
import { RiUser6Line } from "react-icons/ri";
import { PageHead } from "../../components/pageHead/pageHead";
import Services from "../../helper/http";
import { InsertUser } from "../../helper/requestList";
import { fetchUsers } from "../../redux/users/usersActions";
// import { Select } from "@mui/material";
moment.loadPersian({ usePersianDigits: true });

//ADD ROLE COMPONENT
const AddUser = (props) => {
  const history = useHistory();
  const services = new Services();
  const Authorization = getAccessToken();
  const dispatch = useDispatch();
  //دریافت آی دی نقش انتخاب شده
  const WinUrl = window.location.href;

  // permissian multi select  states
  const [allRoles, setAllRoles] = useState([]);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({});

  const [addressData, setAddressData] = useState({});

  const childRef = useRef();

  const [myFormData, setformData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    personNumber: "",
    username: "",
    phoneNumber: "",
    active: true,
  });

  //validation
  var p = /^[\u0600-\u06FF\s]+$/;
  const submitMyForm = () => {
    // const isEmpty = Object.values(myFormData).every(x => x === null || x === '');
    setError({});
    if (myFormData.firstName == "") {
      setError({ firstName: true });
      toast.error("نام را وارد نمایید", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (myFormData.family == "") {
      setError({ family: true });
      toast.error("نام خانوادگی را وارد نمایید", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (myFormData.personalNumber == "") {
      setError({ personalNumber: true });
      toast.error("کد پرسنلی را وارد نمایید", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (myFormData.passwrod == "") {
      setError({ passwrod: true });
      toast.error("کلمه عبور را وارد نمایید", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (myFormData.phoneNumber == "") {
      setError({ phoneNumber: true });
      toast.error("شماره تلفن همراه را وارد نمایید", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (myFormData.passwrod == "") {
      setError({ passwrod: true });
      toast.error("کلمه عبور را وارد نمایید", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (myFormData.userName == "") {
      setError({ userName: true });
      toast.error(" نام کاربری را وارد نمایید", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      setisLoading(true);
      services.post(InsertUser, myFormData).then(async (response) => {
        if (response.isSuccess) {
          toast.success("کاربر با موفقیت ثبت شد", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(fetchUsers(0));
          setTimeout(() => {
            history.push(`/admin/users`);
          }, 2000);
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setisLoading(false);
        }
      });
    }
  };

  //cancel form
  function cancelHandler() {
    history.push(`/admin/users`);
  }
  return (
    <div className="page">
      <PageHead>
        <Typography>
          <RiUser6Line style={{ marginLeft: "8px" }} />
          ثبت کاربر جدید
        </Typography>
      </PageHead>

      <form>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="firstName"
                  label="نام  "
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.firstName}
                  onChange={(e) =>
                    setformData({ ...myFormData, firstName: e.target.value })
                  }
                  value={myFormData?.firstName}
                  type="text"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="lastName"
                  label="نام خانوادگی  "
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.family}
                  onChange={(e) =>
                    setformData({ ...myFormData, lastName: e.target.value })
                  }
                  value={myFormData?.lastName}
                  type="text"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="personNumber"
                  label="کد پرسنلی"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.personNumber}
                  // onKeyDown={e => JustNumberInputCheck(e)}
                  onChange={(e) =>
                    setformData({
                      ...myFormData,
                      personNumber: e.target.value,
                    })
                  }
                  value={myFormData?.personNumber}
                  type="text"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="phoneNumber"
                  label="شماره تلفن همراه"
                  variant="outlined"
                  size="small"
                  error={error.phoneNumber}
                  type="text"
                  fullWidth
                  // onKeyDown={e => JustNumberInputCheck(e)}
                  onChange={(e) =>
                    setformData({ ...myFormData, phoneNumber: e.target.value })
                  }
                  value={myFormData?.phoneNumber}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="username"
                  label="نام کاربری"
                  variant="outlined"
                  size="small"
                  // error={error.username}
                  type="text"
                  fullWidth
                  onChange={(e) =>
                    setformData({ ...myFormData, username: e.target.value })
                  }
                  value={myFormData?.username}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="password"
                  label="کلمه عبور "
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.password}
                  onChange={(e) =>
                    setformData({ ...myFormData, password: e.target.value })
                  }
                  value={myFormData?.passwrod}
                  type="password"
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    select
                    labelId="userEnable"
                    id="userEnable"
                    value={myFormData?.active}
                    label="وضعیت کاربر"
                    size="small"
                    error={error.active}
                    placeholder="وضعیت کاربر"
                    name="active"
                    onChange={(e) =>
                      setformData({ ...myFormData, active: e.target.value })
                    }
                  >
                    <MenuItem value={true}>فعال</MenuItem>
                    <MenuItem value={false}>غیرفعال</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ background: "#fff", mt: 1, borderTop: "1px solid #ddd" }}>
          <Box sx={{ m: 1, mr: 1.3 }}>
            <Button
              disabled={isLoading}
              loadingPosition="start"
              color="success"
              sx={{ boxShadow: 0 }}
              variant="contained"
              onClick={submitMyForm}
            >
              {isLoading ? (
                <>
                  <CircularProgress
                    size={21.5}
                    sx={{ color: "white", marginLeft: 1 }}
                  />
                  <span>صبر کنید..</span>
                </>
              ) : (
                <>
                  <Save sx={{ marginLeft: 1 }} />
                  <span>ذخیــره</span>
                </>
              )}
            </Button>
            <Button onClick={cancelHandler} color="error" variant="contained">
              انصراف
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default AddUser;
