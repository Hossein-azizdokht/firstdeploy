import { DateRange } from "@material-ui/icons";
import { Typography } from "mui-core";
import React, { useEffect } from "react";
import { ShowLoanCalendar } from "../../components/bigCalendar/showLoanCalendar";
import { PageHead } from "../../components/pageHead/pageHead";
import { CalendarPlaces } from "../../helper/requestList";
import Services from "../../helper/http";

const ViewLoanCalendar = () => {


  return (
    <div className="page">
      <PageHead>
        <Typography>
          <DateRange style={{ marginLeft: "8px" }} />
          تقویم
        </Typography>
      </PageHead>
      <ShowLoanCalendar fit />
      {/* <MyCalendar1 fit /> */}
    </div>
  );
};

export default ViewLoanCalendar;
