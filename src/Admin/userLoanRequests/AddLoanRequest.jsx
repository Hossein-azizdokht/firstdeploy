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

//REDUX
import { useDispatch } from "react-redux";
import getAccessToken from "../../helper/getAccesstoken";

import { LunchDining, SaveAltOutlined, SaveOutlined } from "@material-ui/icons";
import moment from "moment-jalaali";
import { PageHead } from "../../components/pageHead/pageHead";
import Services from "../../helper/http";
import { InserFood, PostFoodAdd } from "../../helper/requestList";
import Calendar from "../../components/bigCalendar/showLoanCalendar";
import Calendarssss from "../../components/bigCalendar/showLoanCalendar";
import MyCalendar from "../../components/bigCalendar/showLoanCalendar";
import { FormControl, MenuItem } from "mui-core";
import NumberWithCommas, { NumberRemoveCommas } from "../../helper/price";

moment.loadPersian({ usePersianDigits: true });
//ADD ROLE COMPONENT
const AddLoanRequest = (props) => {
  const history = useHistory();
  const services = new Services();
  const Authorization = getAccessToken();
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({});

  const childRef = useRef();

  const [myFormData, setformData] = useState({
    foodName: "",
    // maximumCapacity: "",
    // foodPrice: "",
  });
  const [displayValue, setDisplayValue] = useState(""); // Stores the formatted display value
  const [value, setValue] = useState(""); // Stores the numeric value

  //validation
  const submitMyForm = () => {
    setError({});
    if (myFormData.foodName == "") {
      setError({ foodName: true });
      toast.error("عنوان غذا را وارد نمایید", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setisLoading(true);
      services.post(InserFood, myFormData).then(async (response) => {
        if (response.isSuccess) {
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            history.push(`/admin/foods`);
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
    history.push(`/admin/foods`);
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
          <LunchDining style={{ marginLeft: "8px" }} />
          ثبت غـذای جـدید
        </Typography>
      </PageHead>

      <form>
        <Box>
          <Grid container>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="foodName"
                  label="عنوان غذا"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.foodName}
                  onChange={(e) =>
                    setformData({ ...myFormData, foodName: e.target.value })
                  }
                  value={myFormData?.foodName}
                  type="text"
                />
              </Box>
            </Grid>
            {/* <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="maximumCapacity"
                  label="حداکثر سفارش"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.maximumCapacity}
                  onChange={(e) =>
                    setformData({
                      ...myFormData,
                      maximumCapacity: e.target.value,
                    })
                  }
                  value={myFormData?.maximumCapacity}
                  type="text"
                />
              </Box>
            </Grid> */}
          </Grid>
          {/* <Grid container>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="foodPrice"
                  label="قیمت غذا"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={error.foodPrice}
                  // onKeyDown={e => JustNumberInputCheck(e)}
                  value={displayValue}
                  onChange={handleOnChange}
                  onBlur={() =>
                    setDisplayValue(formatWithCommas(myFormData?.foodPrice))
                  }
                  type="text"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    select
                    labelId="isActive"
                    id="isActive"
                    value={myFormData?.isActive}
                    label="وضعیت"
                    size="small"
                    error={error.isActive}
                    placeholder="وضعیت"
                    name="isActive"
                    onChange={(e) =>
                      setformData({ ...myFormData, isActive: e.target.value })
                    }
                  >
                    <MenuItem value={true}>موجود</MenuItem>
                    <MenuItem value={false}>ناموجود</MenuItem>
                  </TextField>
                </FormControl>
              </Box>
            </Grid>
          </Grid> */}
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

export default AddLoanRequest;
