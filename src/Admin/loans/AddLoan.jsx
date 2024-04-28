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
  FormControl,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { LuClipboardEdit } from "react-icons/lu";
//REDUX
import { useDispatch } from "react-redux";
import getAccessToken from "../../helper/getAccesstoken";

import { LunchDining, SaveOutlined } from "@material-ui/icons";
import moment from "moment-jalaali";
import { PageHead } from "../../components/pageHead/pageHead";
import Services from "../../helper/http";
import { InsertLoan } from "../../helper/requestList";
import NumberWithCommas from "../../helper/price";

moment.loadPersian({ usePersianDigits: true });
//ADD ROLE COMPONENT
const AddLoan = (props) => {
  const history = useHistory();
  const services = new Services();
  const Authorization = getAccessToken();
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({});

  const childRef = useRef();

  const [myFormData, setformData] = useState({
    title: "",
    amount: "",
    // maximumCapacity: "",
    // foodPrice: "",
  });
  const [displayValue, setDisplayValue] = useState(""); // Stores the formatted display value
  const [value, setValue] = useState(""); // Stores the numeric value

  //validation
  const submitMyForm = () => {
    setError({});
    if (myFormData.title == "") {
      setError({ title: true });
      toast.error("عنوان تسهیلات را وارد نمایید", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (myFormData.amount == "") {
      setError({ amount: true });
      toast.error("مبلغ تسهیلات را وارد نمایید", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setisLoading(true);
      services.post(InsertLoan, myFormData).then(async (response) => {
        if (response.isSuccess) {
          toast.success(response.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            history.push(`/admin/loans`);
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
          <LuClipboardEdit style={{ marginLeft: "8px" }} />
          ثبت تسهبلات جدید
        </Typography>
      </PageHead>

      <form>
        <Box>
          <Grid container>
            <Grid item xs={12} lg={2} md={3}>
              <Box sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="title"
                  label="عنوان تسهیلات"
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
                  name="amount"
                  label="مبلغ تسهیلات"
                  variant="outlined"
                  size="small"
                  fullWidth
                  className="hasEndMark rials"
                  error={error.amount}
                  onChange={(e) =>
                    setformData({
                      ...myFormData,
                      amount: e.target.value,
                    })
                  }
                  value={myFormData?.amount}
                  type="text"
                />
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

export default AddLoan;
