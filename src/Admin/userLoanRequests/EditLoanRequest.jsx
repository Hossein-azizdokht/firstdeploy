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
import { FoodEdition, GetFoodDetial, UpdateFood } from "../../helper/requestList";
import { fetchFoods } from "../../redux/foods/foodsActions";
moment.loadPersian({ usePersianDigits: true });

//ADD ROLE COMPONENT
const EditLoanRequest = (props) => {
  const services = new Services();
  const history = useHistory();

  const Authorization = getAccessToken();
  const dispatch = useDispatch();

  //دریافت آی دی کاربر انتخاب شده
  const WinUrl = window.location.href;
  const urlParams = new URLSearchParams(new URL(WinUrl).search);
  const foodTitle = urlParams.get("name");
  const foodId = urlParams.get("id");

  // permissian multi select  states
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({});

  const [selectedLocations, setSelectedLocations] = useState({});
  const [addressData, setAddressData] = useState({});
  const childRef = useRef();

  const [myFormData, setformData] = useState({
    foodName: "",
  });

  function getFoodDetail() {
    services.get(`${GetFoodDetial}/${foodId}`).then(async (res) => {
      console.log(res);
      if (res.isSuccess) {
        setformData({ foodName: res.data.foodName });
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
    // setformData({ ...myFormData, foodName: foodTitle });
  }, []);

  const submitMyForm = () => {
    setisLoading(true);
    services
      .put(UpdateFood + `/${foodId}`, { ...myFormData, _id: foodId })
      .then(async (res) => {
        if (res.isSuccess) {
          toast.success("غذا با موفقیت ویرایش شد", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          dispatch(fetchFoods(0));
          setTimeout(() => {
            history.push(`/admin/foods`);
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
    history.push(`/admin/foods`);
  }
  return (
    <div className="page">
      <PageHead>
        <Typography>
          <GoPencil style={{ marginLeft: "8px" }} />
          ویرایش {myFormData.foodName}
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
                  error={error.foodName}
                  type="text"
                  fullWidth
                  onChange={(e) =>
                    setformData({ ...myFormData, foodName: e.target.value })
                  }
                  value={myFormData?.foodName}
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

export default EditLoanRequest;
