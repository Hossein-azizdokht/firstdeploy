import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import moment from "moment-jalaali";
import { Icon } from "mui-core";
import React from "react";
import { RiFileList3Fill } from "react-icons/ri";
moment.loadPersian({ usePersianDigits: true });

export default function ConfirmDialog(props) {
  const { ConfirmDialog, setConfirmDialog, isOpen } = props;

  return (
    <Dialog open={props.ConfirmDialog.isOpen}>
      <DialogTitle>
        <Icon disableRipple className="d-block text-center w-auto h-auto">
          {/* <img
            src={props.ConfirmDialog.delete ? QuestionIcon : FoodIcon}
            // src={FoodDeleteIcon}
            alt="confirm"
            className="m-auto d-block mb-4"
            style={{
              width: "80px",
              filter: "hue-rotate(740deg) saturate(1.2)",
            }}
          /> */}
          <RiFileList3Fill
            size={60}
            className="m-auto"
            style={{ minWidth: "21px", left: "0", top: "-35px" }}
          />
        </Icon>
        <Typography
          style={{ color: "#f97500" }}
          className="text-center"
          variant="subtitle1"
        >
          {props.ConfirmDialog.title}
        </Typography>
        <Typography
          className="text-center d-block"
          variant="caption"
          style={{ color: "#777" }}
        >
          {props.ConfirmDialog.subTitle}
        </Typography>
      </DialogTitle>
      <DialogContent className="p-4">{props.children}</DialogContent>
      <hr className="mb-0 mx-3" style={{ opacity: "0.1" }} />
      <DialogActions>
        <div className="d-flex align-items-center justify-content-center w-100">
          <Button
            //   disabled={isLoading}
            loadingPosition="start"
            color="success"
            onClick={props.ConfirmDialog.onConfirm}
            variant="contained"
            sx={{ boxShadow: 0, minWidth: "100px" }}
            text="تایید"
          >
            تایید
          </Button>
          <Button
            sx={{ boxShadow: 0, minWidth: "100px" }}
            color="inherit"
            variant="contained"
            onClick={() => {
              setConfirmDialog({ isOpen: false });
              // props?.cancel();
            }}
            text="انصراف"
          >
            انصراف
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
