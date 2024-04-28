import { useRef, useState } from "react";

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

//DATE PICKER
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

//REDUX
import { useDispatch } from "react-redux";
import getAccessToken from "../../helper/getAccesstoken";

import { HotelOutlined, SaveOutlined } from "@material-ui/icons";
import moment from "moment-jalaali";
import { PageHead } from "../../components/pageHead/pageHead";
import Services from "../../helper/http";
import { InsertPlace } from "../../helper/requestList";

moment.loadPersian({ usePersianDigits: true });

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const colors = [
  "#EC7063",
  "#BB8FCE",
  "#73C6B6",
  "#7DCEA0",
  "#EB984E",
  "#6495ED",
  "#99BD98",
  "#aaaaff",
  "#A18648",
  "#8648A1",
  "#48A186",
  "#3BB9FF",
];

//ADD Place COMPONENT
const AddPlace = (props) => {
  const rgbaColors = colors.map((color) => hexToRgba(color, 0.9));
  const history = useHistory();
  const services = new Services();
  const Authorization = getAccessToken();
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({});

  const childRef = useRef();

  const [myFormData, setformData] = useState({});
  const [displayValue, setDisplayValue] = useState(""); // Stores the formatted display value
  const [value, setValue] = useState(""); // Stores the numeric value

  //validation
  const submitMyForm = () => {
    const randomIndex = Math.floor(Math.random() * rgbaColors.length);
    setError({});
    if (myFormData.code === undefined) {
      setError({ code: true });
      toast.error("کد اقامتگاه را وارد نمایید", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (myFormData.title === undefined) {
      setError({ title: true });
      toast.error("عنوان اقامتگاه را وارد نمایید", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (myFormData.code == "") {
      setError({ code: true });
      toast.error("مبلغ اقامتگاه را وارد نمایید", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setisLoading(true);
      services
        .post(InsertPlace, { ...myFormData, color: rgbaColors[randomIndex] })
        .then(async (response) => {
          if (response.isSuccess) {
            toast.success(response.message, {
              position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => {
              history.push(`/admin/places`);
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

  // function priceToNumber(string) {
  //   let price = NumberRemoveCommas(string);
  //   setformData({
  //     ...myFormData,
  //     foodPrice: price,
  //   });
  // }

  //cancel form
  function cancelHandler() {
    history.push(`/admin/loans`);
  }

  const handleOnChange = (event) => {
    // Get current input value
    const input = event.target.value;

    // Remove any non-numeric characters (except decimal point) from the input
    const unformattedValue = input.replace(/[^0-9.]/g, "");

    // Update state
    setformData((prevState) => {
      // If input is not a number, return the previous state
      if (isNaN(unformattedValue))
        return { ...myFormData, foodPrice: prevState };
      return { ...myFormData, foodPrice: unformattedValue };
    });

    // Update the formatted value for display
    setDisplayValue(formatWithCommas(unformattedValue));
  };
  // Function to format number with commas
  const formatWithCommas = (value) => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <div className="page">
      <PageHead>
        <Typography>
          <HotelOutlined style={{ marginLeft: "8px" }} />
          ثبت اقامتگاه جدید
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
                  <span>ذخیــره</span>
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

export default AddPlace;
