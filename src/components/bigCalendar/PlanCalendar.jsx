import { Box, Grid, TextField } from "@material-ui/core";
import BigCalendar from "jalali-react-big-calendar";
import { Button } from "mui-core";
import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import Select from "react-select";
import { toast } from "react-toastify";
import events from "../../_mock/events";
import FoodsData from "../../_mock/foods";
import FoodIcon from "../../assets/images/food.png";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
// ​‌‌​‌‌‍‍‍big-calendar ------------------------------------

export const MyCustomEvent = ({ event }) => {
  return (
    <span className="d-flex align-items-center">
      <img src={FoodIcon} alt="food" />
      {/* <IoFastFoodOutline className="m-1" size={28} color="rgb(251, 132, 96)" /> */}
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
};
export const DefinitionFoodOnCalendar = () => {
  const [show, setshow] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [confirmDialog, SetConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    date: {},
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

  let [count, setCount] = useState(1);
  let [orderLimitCount, setOrderLimitCount] = useState(4);

  function incrementCount() {
    count = count + 1;
    if (count >= orderLimitCount) {
      toast.error("محدودیت در تعداد سفارش!", {
        position: toast.POSITION.TOP_CENTER,
      });
      count = count - 1;
    } else {
      setCount(count);
    }
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }

  function cancelOrder() {
    setCount(1);
  }

  const CustomToolbar = ({ onNavigate, label }) => {
    return (
      <div className="d-flex align-items-center">
        <button
          title="ماه قبل"
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
          title="ماه بعد"
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
    <div className="adminCalendar">
      {show && <p onClick={() => setshow(false)}>{JSON.stringify(show)}</p>}
      <BigCalendar
        events={events}
        rtl={true}
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
          debugger
          SetConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: `${event.title} از تقویم حذف گردد؟`,
            subTitle: "",
            date: event,
          });
        }}
        onSelectSlot={(slotInfo) => {
          console.log(slotInfo);
          SetConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: "",
            subTitle: "",
            date: slotInfo,
          });
          // setshow(slotInfo);
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
                <Select
                  name="foodname"
                  placeholder="انتخاب غذا"
                  noOptionsMessage={() => "ردیفی وجود ندارد!"}
                  closeMenuOnSelect={true}
                  // value={data?.foodname}
                  // onChange={(item) =>
                  //   setData({ ...data, ["foodname"]: item.foodname })
                  // }
                  getOptionLabel={(option) => option.title}
                  getOptionValue={(option) => option.id}
                  options={FoodsData}
                  isLoading={isLoading}
                  className="mb-2"
                  loadingMessage="در حال بارگذاری..."
                  styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
                />

                {/* <TextField
                  id="outlined-basic"
                  name="maximumCapacity"
                  label="حداکثر سفارش هر نفر"
                  variant="outlined"
                  size="small"
                  fullWidth
                  // error={error.maximumCapacity}
                  // onChange={(e) =>
                  //   setformData({
                  //     ...myFormData,
                  //     maximumCapacity: e.target.value,
                  //   })
                  // }
                  // value={myFormData?.maximumCapacity}
                  type="text"
                /> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ConfirmDialog>

      {/* Add new food on calendar by admin */}
      {/* <ConfirmDialog
        ConfirmDialog={confirmDialog}
        setConfirmDialog={SetConfirmDialog}
        cancel={cancelOrder}
      >
        <Box>
          <Grid container>
            <Grid item xs={12} lg={12} md={12}>
              <Box sx={{ mt: 1 }}>

                <Select
                  id="outlined-basic"
                  name="maximumCapacity"
                  label="عنوان غذا"
                  variant="outlined"
                  size="small"
                  fullWidth
                  // error={error.maximumCapacity}
                  // onChange={(e) =>
                  //   setformData({
                  //     ...myFormData,
                  //     maximumCapacity: e.target.value,
                  //   })
                  // }
                  // value={myFormData?.maximumCapacity}
                  type="text"
                />


                <div className="d-flex align-items-center">
                  <Button
                    variant="contained"
                    style={{ boxShadow: "none", borderRadius: "9px" }}
                    color="inherit"
                    onClick={incrementCount}
                  >
                    <FiPlus />
                  </Button>
                  <div
                    className="form-control text-center p-1 m-2"
                    style={{ width: "80px" }}
                  >
                    {count}
                  </div>
                  <Button
                    variant="contained"
                    style={{ boxShadow: "none", borderRadius: "9px" }}
                    color="inherit"
                    onClick={decrementCount}
                  >
                    <FiMinus />
                  </Button>
                </div>


              </Box>
            </Grid>
          </Grid>
        </Box>
      </ConfirmDialog> */}

      {/* Add new Food to calendar */}
    </div>
  );
};

// ​‌‌‍full calendar​-------------------------------------------------------------

// Custom hook to format the Jalali dates
// function useJalaliEvents(events) {
//     return events.map((event) => {
//         const start = moment(event.start).locale('fa').format('YYYY-MM-DD');
//         const end = event.end ? moment(event.end).locale('fa').format('YYYY-MM-DD') : null;
//         return { ...event, start, end };
//     });
// }
// export function renderEventContent(eventInfo) {
//     console.log(eventInfo.timeText);
//     return (
//         <div className='d-felx align-items-center'>
//             <span style={{ position: 'relative', top: '3px' }}>{eventInfo.event.title}</span>
//             <IoFastFoodOutline className="m-1" size={26} color='rgb(251, 132, 96)' />
//         </div>
//     )
// }

// export const MyCalendar1 = (props) => {
//     // Assuming your events are passed in the Gregorian calendar and need to be converted
//     const gregorianEvents = [
//         {
//             "title": "Meeting",
//             "start": "2023-12-26T17:22:59.479Z",
//             "end": "2023-12-26T17:22:59.479Z"
//         }
//     ];
//     // Convert to Jalali
//     const [calendarEvents, setCalendarEvents] = useState([
//         {
//             "title": "قرمه سبزی",
//             "start": "2023-12-14T17:22:59.479Z"
//         },
//         {
//             "title": "زرشک پلو",
//             "start": "2023-12-06T17:22:59.479Z"
//         },
//         {
//             "title": "کوکوسبزی",
//             "start": "2023-12-18T17:22:59.479Z"
//         },
//         {
//             "title": "سبزی پلو با ماهی",
//             "start": "2023-12-11T17:22:59.479Z"
//         },
//         {
//             "title": "ماکارانی",
//             "start": "2023-12-09T17:22:59.479Z"
//         },
//     ]); // Store calendar events in state
//     const jalaliEvents = useJalaliEvents(gregorianEvents);

//     console.log(gregorianEvents);
//     console.log(jalaliEvents);
//     // Handler for date click
//     const handleDateClick = (arg) => {
//         // prompt user to enter a title for the event

//         const title = prompt('عنوان غذا');
//         if (title) {
//             setCalendarEvents([...calendarEvents, { title: title, start: arg.date }]);
//         }
//     };

//     return (
//         <div className={`custom-calendar ${props.fit ? 'p-0' : ''}`}>
//             <FullCalendar
//                 plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
//                 initialView="dayGridMonth"
//                 editable
//                 direction='rtl'
//                 firstDay={6}
//                 // headerToolbar={{
//                 //     start: 'prev,next today', // buttons for switching between views
//                 //     center: '', // we will leave this empty to remove the title
//                 //     // end: 'dayGridMonth,timeGridWeek,timeGridDay', // buttons for changing views
//                 //     end: '', // buttons for changing views
//                 // }}
//                 dateClick={handleDateClick}
//                 selectable={true}
//                 locale={faLocale}  // Set the locale to Persian
//                 weekends={true}
//                 events={calendarEvents}
//                 eventContent={renderEventContent}
//                 eventClick={handleDateClick}
//                 fixedWeekCount={false}
//                 showNonCurrentDates={false}
//             />
//         </div>
//     );
// };
