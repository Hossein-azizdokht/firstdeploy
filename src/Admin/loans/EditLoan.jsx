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

import { SaveOutlined } from "@mui/icons-material";
import moment from "moment-jalaali";
import { GoPencil } from "react-icons/go";
import { PageHead } from "../../components/pageHead/pageHead";
import Services from "../../helper/http";
import {
  FoodEdition,
  GetFoodDetial,
  GetLoanDetail,
  UpdateFood,
  UpdateLoan,
} from "../../helper/requestList";
import { fetchFoods } from "../../redux/foods/foodsActions";
moment.loadPersian({ usePersianDigits: true });

//ADD ROLE COMPONENT
const EditLoan = (props) => {
  const services = new Services();
  const history = useHistory();

  const Authorization = getAccessToken();
  const dispatch = useDispatch();

  //دریافت آی دی کاربر انتخاب شده
  const WinUrl = window.location.href;
  const urlParams = new URLSearchParams(new URL(WinUrl).search);
  const foodTitle = urlParams.get("name");
  const loanId = urlParams.get("id");

  // permissian multi select  states
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({});

  const [selectedLocations, setSelectedLocations] = useState({});
  const [addressData, setAddressData] = useState({});
  const childRef = useRef();

  const [myFormData, setformData] = useState({
    title: "",
    amount: "",
  });

  function getFoodDetail() {
    services.get(`${GetLoanDetail}/${loanId}`).then(async (res) => {
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
      .put(UpdateLoan + `/${loanId}`, { ...myFormData })
      .then(async (res) => {
        if (res.isSuccess) {
          toast.success("تسهیلات با موفقیت ویرایش شد", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(fetchFoods(0));
          setTimeout(() => {
            history.push(`/admin/loans`);
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
    history.push(`/admin/loans`);
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

export default EditLoan;
