import { Box, Grid, TextField } from "@material-ui/core";
import BigCalendar from "jalali-react-big-calendar";
import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoFastFoodOutline } from "react-icons/io5";
// import events from "../../_mock/events";
import FoodIcon from "../../assets/images/food.png";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import { Button } from "mui-core";
import Select from "react-select";
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { RiFileList3Fill } from "react-icons/ri";
import Services from "../../helper/http";
import { CalendarPlaces } from "../../helper/requestList";
import { Delete, Edit } from "@material-ui/icons";
// ​‌‌​‌‌‍‍‍big-calendar ------------------------------------

export const MyCustomEvent = ({ event }) => {
  return (
    <span
      className="eventItem d-flex p-1 align-item-center text-black text-center"
      title={`${event.title} - ${event.capacity} نفر`}
    >
      {/* <img src={FoodIcon} alt="food" /> */}
      <RiFileList3Fill
        size={21}
        className="position-absolute"
        style={{ minWidth: "21px", left: "0", top: "-35px" }}
      />

      {/* <IoFastFoodOutline className="m-1" size={28} color="rgb(251, 132, 96)" /> */}
      <span
        className="ml-2 pl-3 border-left"
        style={{
          fontSize: "16px",
          paddingLeft: "8px",
          borderLeft: "1px solid rgba(0,0,0,0.2)",
          marginLeft: "8px",
        }}
      >
        <strong>{event.title} </strong>
      </span>
      <span>
        ظرفیت : <strong>{event.capacity}</strong> نفر
      </span>
      {/* <div className="flex align-item-center mr-auto">
        <Edit onClick={() => alert("dddddddddddddd")} />
        <Delete  onClick={() => alert("dddddddddddddd")}/>
      </div> */}
      {/* {event.desc && ":  " + event.desc} */}
    </span>
  );
};
export const ShowLoanCalendar = () => {
  const [show, setshow] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [confirmDialog, SetConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  // useEffect(() => {
  //     debugger
  //     console.log(events);
  //     const eventsFromServer = events.map(event => ({
  //         ...event,
  //         start: new Date(event.start), // Ensure the start date is a Date object
  //         end: new Date(event.end), // Ensure the end date is a Date object
  //     }));
  //     console.log(eventsFromServer);
  //     setEventsData(events);
  // }, [])

  const [formData, setFormData] = useState({
    foodName: "",
    fullServing: 0,
    halfServing: 0,
    desc: "",
  });
  const [orderLimitCount, setOrderLimitCount] = useState(4);

  function cancelOrder() {
    setFormData({ ...formData, fullServing: 0, halfServing: 0 });
  }

  const [events, setEvents] = useState([]);
  const services = new Services();
  useEffect(() => {
    services.get(CalendarPlaces).then((res) =>
      setEvents(
        res.data?.map((item) => ({
          id: item._id,
          title: item.title,
          start: item.dateFrom,
          end: item.dateTo,
          capacity: item.capacity,
          color: item.color,
        }))
      )
    );
  }, []);

  // custom toolbar for big calendar
  const CustomToolbar = ({ onNavigate, label }) => {
    return (
      <div className="d-flex align-items-center">
        <button
          title="هفته قبل"
          class="back calendar"
          onClick={() => onNavigate("PREV")}
        >
          <span class="circle" aria-hidden="true">
            <FiChevronRight />
          </span>
          {/* <span class="button-text">هفته قبل</span> */}
        </button>
        <button onClick={() => onNavigate("TODAY")} class="today calendar">
          <span class="circle px-4" aria-hidden="true">
            ماه جاری
          </span>
        </button>
        <button
          title="هفته بعد"
          onClick={() => onNavigate("NEXT")}
          class="next calendar"
        >
          <span class="circle" aria-hidden="true">
            <FiChevronLeft />
          </span>
          {/* <span class="button-text">هفته بعد</span> */}
        </button>
        <span className="mx-4">{label}</span>
      </div>
    );
  };

  return (
    <div className="" style={{ height: "80vh" }}>
      {show && <p onClick={() => setshow(false)}>{JSON.stringify(show)}</p>}
      <BigCalendar
        events={events}
        defaultView="month"
        views="dayGridMonth"
        scrollToTime={new Date()}
        components={{
          event: MyCustomEvent,
          toolbar: CustomToolbar,
        }}
        selectable={true}
        defaultDate={new Date()}
        onSelectEvent={(event) => {
          SetConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: `${event.title}`,
            subTitle: `حداکثر تعداد رزرو : ${event.capacity}`,
            date: event,
          });
        }}
        onSelectSlot={(slotInfo) => {
          setshow(slotInfo);
        }}
        eventPropGetter={(event) => {
          console.log(event);
          let newStyle = {
            background: event.color,
            borderRadius: "20px",
            color: "#fff",
            border: `2px solid ${event.color}`,
            display: "block",
          };

          // if (event.isMine) {
          //   newStyle.background = "lightgreen";
          // }

          return {
            className: "",
            style: newStyle,
          };
        }}
      />

      {/* Add new order by user */}
      <ConfirmDialog
        ConfirmDialog={confirmDialog}
        setConfirmDialog={SetConfirmDialog}
        cancel={cancelOrder}
      >
        <Box>
          <Grid container>
            <Grid item xs={12} lg={12} md={12}>
              <Box sx={{ mt: 1 }}>
                <TextField
                  id="description"
                  name="desc"
                  label="توضیحات"
                  variant="outlined"
                  size="small"
                  multiline
                  fullWidth
                  // error={error.desc}
                  // onChange={(e) =>
                  //   setformData({
                  //     ...myFormData,
                  //     decs: e.target.value,
                  //   })
                  // }
                  // value={myFormData?.decs}
                  type="text"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ConfirmDialog>
    </div>
  );
};
