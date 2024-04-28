import { useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";


//DATE PICKER
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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

import { SaveOutlined } from "@mui/icons-material";
import moment from "moment-jalaali";
import { GoPencil } from "react-icons/go";
import { PageHead } from "../../components/pageHead/pageHead";
import Services from "../../helper/http";
import {
  GetPlaceDetail,
  UpdatePlace
} from "../../helper/requestList";
import { fetchFoods } from "../../redux/foods/foodsActions";
moment.loadPersian({ usePersianDigits: true });

//ADD Place COMPONENT
const EditPlace = (props) => {
  const services = new Services();
  const history = useHistory();

  const Authorization = getAccessToken();
  const dispatch = useDispatch();

  //دریافت آی دی کاربر انتخاب شده
  const WinUrl = window.location.href;
  const urlParams = new URLSearchParams(new URL(WinUrl).search);
  const foodTitle = urlParams.get("name");
  const placeId = urlParams.get("id");

  // permissian multi select  states
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({});

  const [selectedLocations, setSelectedLocations] = useState({});
  const [addressData, setAddressData] = useState({});
  const childRef = useRef();

  const [myFormData, setformData] = useState({
    title: "",
    code: 0,
    capacity: 0,
    dateFrom: "",
    dateTo: "",
    color: "",
  });

  function getFoodDetail() {
    services.get(`${GetPlaceDetail}/${placeId}`).then(async (res) => {
      console.log(res);
      if (res.isSuccess) {
        setformData(res.data);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setisLoading(false);
      }
    });
  }

  useEffect(() => {
    getFoodDetail();
    // setformData({ ...myFormData, title: foodTitle });
  }, []);

  const submitMyForm = () => {
    setisLoading(true);
    services
      .put(UpdatePlace + `/${placeId}`, { ...myFormData })
      .then(async (res) => {
        if (res.isSuccess) {
          toast.success("اقامتگاه با موفقیت ویرایش شد", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(fetchFoods(0));
          setTimeout(() => {
            history.push(`/admin/places`);
          }, 2000);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setisLoading(false);
        }
      });
  };

  // useEffect(() => {
  //   getFormData();
  // }, []);

  //cancel form
  function cancelHandler() {
    history.push(`/admin/places`);
  }
  return (
    <div className="page">
      <PageHead>
        <Typography>
          <GoPencil style={{ marginLeft: "8px" }} />
          ویرایش {myFormData.title}
        </Typography>
      </PageHead>
      <form>
        <Box>
        <Grid container>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="code"
                  label="کد اقامتگاه"
                  variant="outlined"
                  size="small"
                  fullWidth
                  // className="hasEndMark rials"
                  error={error.code}
                  onChange={(e) =>
                    setformData({
                      ...myFormData,
                      code: e.target.value,
                    })
                  }
                  value={myFormData?.code}
                  type="text"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="title"
                  label="عنوان اقامتگاه"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.title}
                  onChange={(e) =>
                    setformData({ ...myFormData, title: e.target.value })
                  }
                  value={myFormData?.title}
                  type="text"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="capacity"
                  label="ظرفیت اقامتگاه"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.capacity}
                  onChange={(e) =>
                    setformData({ ...myFormData, capacity: e.target.value })
                  }
                  value={myFormData?.capacity}
                  type="number"
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={2} md={2}>
              <Box sx={{ m: 1 }}>
                <LocalizationProvider dateAdapter={AdapterJalali}>
                  <DatePicker
                    // disableFuture={!option.future}
                    // disablePast={!option.past}
                    disableHighlightToday
                    disableMaskedInput
                    inputFormat="yyyy/MM/dd"
                    labelFunc={(date) =>
                      date ? date.format("jYYYY/jMM/jDD") : ""
                    }
                    value={myFormData?.dateFrom}
                    onChange={async (date) => {
                      setformData({ ...myFormData, dateFrom: date });
                      // setFilterData({ ...filterData, dateFrom: date });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        placeholder="از تاریخ"
                        label="از تاریخ"
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={2}>
              <Box sx={{ m: 1 }}>
                <LocalizationProvider dateAdapter={AdapterJalali}>
                  <DatePicker
                    // disableFuture={!option.future}
                    // disablePast={!option.past}
                    disableHighlightToday
                    disableMaskedInput
                    inputFormat="yyyy/MM/dd"
                    labelFunc={(date) =>
                      date ? date.format("jYYYY/jMM/jDD") : ""
                    }
                    value={myFormData?.dateTo}
                    onChange={async (date) => {
                      setformData({ ...myFormData, dateTo: date });
                      // setFilterData({ ...filterData, dateFrom: date });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        placeholder="تا تاریخ"
                        label="تا تاریخ"
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                </LocalizationProvider>
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
                  <SaveOutlined sx={{ marginLeft: 1 }} />
                  <span>ذخیــره تغییرات</span>
                </>
              )}
            </Button>
            <Button
              onClick={cancelHandler}
              sx={{ boxShadow: 0 }}
              color="inherit"
              variant="contained"
            >
              انصراف
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default EditPlace;
