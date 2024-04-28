import { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

//DATE PICKER
import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@material-ui/core";

//REDUX
import { useDispatch } from "react-redux";
import getAccessToken from "../../helper/getAccesstoken";

import { Save } from "@material-ui/icons";
import moment from "moment-jalaali";
import { FormControl, MenuItem } from "mui-core";
import { GoPencil } from "react-icons/go";
import { PageHead } from "../../components/pageHead/pageHead";
import Services from "../../helper/http";
import JustNumberInputCheck from "../../helper/justNumberInputCheck";
import { GetUserDetail, UpdateUser } from "../../helper/requestList";
import { fetchUsers } from "../../redux/users/usersActions";
moment.loadPersian({ usePersianDigits: true });



//ADD COMPONENT
const EditUser = (props) => {
  const services = new Services();
  const history = useHistory();

  const Authorization = getAccessToken();
  const dispatch = useDispatch();

  //دریافت آی دی کاربر انتخاب شده
  const WinUrl = window.location.href;
  const UserId = WinUrl.split("id=").pop();

  // permissian multi select  states
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({});

  const [selectedLocations, setSelectedLocations] = useState({});
  const [addressData, setAddressData] = useState({});
  const childRef = useRef();

  const [myFormData, setformData] = useState({
    firstName: "",
    lastName: "",
    personNumber: "",
    username: "",
    phoneNumber: "",
    isActive: ""
  });


  const submitMyForm = () => {
    setisLoading(true)
    services.put(UpdateUser + `?id=${UserId}`, {
      ...myFormData,
      ['province']: addressData?.provinceId,
      ['city']: addressData?.countyId
    })
      .then(async (res) => {
        if (res.statusCode == '200') {
          toast.success("کاربر با موفقیت ویرایش شد", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          dispatch(fetchUsers(0));
          setTimeout(() => {
            history.push(`/admin/persons`);
          }, 2000);
        }
        else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_CENTER
          });
          setisLoading(false)
        }
      })

  }

  //get form data
  async function getFormData() {
    //get all resource data
    let response = await services.get(`${GetUserDetail}/${UserId}`)
    console.log(response);
    let data = response.data;
    setformData({
      ...myFormData,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "personNumber": data.personNumber,
      "username": data.username,
      "phoneNumber": data.phoneNumber,
      "isActive": true
    });

  }


  useEffect(() => {
    getFormData();
    // setformData({
    //   ...myFormData,
    //   ['cityId']: addressData?.countyId
    // })
  }, []);



  // useEffect(() => {
  //   debugger
  //   console.log(addressData);
  // }, [addressData]);



  //cancel form
  function cancelHandler() {
    history.push(`/admin/users`);
  }
  return (
    <div className="page">
      <PageHead>
        <Typography><GoPencil style={{ marginLeft: '8px' }} />ویرایش کاربر</Typography>
      </PageHead>
      <form>
        <Box >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>

                <TextField
                  id="outlined-basic"
                  name="username"
                  disabled
                  aria-readonly
                  label="نام کاربری"
                  variant="outlined"
                  size="small"
                  // error={error.username}
                  type="text"
                  fullWidth
                  onChange={e => setformData({ ...myFormData, username: e.target.value })}
                  value={myFormData?.username}
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>

                <TextField
                  id="firstName"
                  name="firstName"
                  label="نام"
                  variant="outlined"
                  size="small"
                  error={error.firstName}
                  type="text"
                  fullWidth
                  onChange={e => setformData({ ...myFormData, firstName: e.target.value })}
                  value={myFormData?.firstName}
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
                  error={error.lastName}
                  onKeyDown={e => JustNumberInputCheck(e)}
                  onChange={e => setformData({ ...myFormData, lastName: e.target.value })}
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
                  onKeyDown={e => JustNumberInputCheck(e)}
                  onChange={e => setformData({ ...myFormData, personNumber: e.target.value })}
                  value={myFormData?.personNumber}
                  type="text"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
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
                  onKeyDown={e => JustNumberInputCheck(e)}
                  onChange={e => setformData({ ...myFormData, phoneNumber: e.target.value })}
                  value={myFormData?.phoneNumber}
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <FormControl fullWidth>
                  <TextField fullWidth select
                    labelId="isActive"
                    id="isActive"
                    value={myFormData?.isActive}
                    label="وضعیت کاربر"
                    size="small"
                    error={error.isActive}
                    placeholder="وضعیت کاربر"
                    name="isActive"
                    onChange={e => setformData({ ...myFormData, isActive: e.target.value })}
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
                  <CircularProgress size={21.5} sx={{ color: 'white', marginLeft: 1 }} />
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

export default EditUser;



