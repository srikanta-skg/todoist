import React, { useState } from "react";
// import inbox from "./assets/inbox.svg";
import InboxIcon from "@mui/icons-material/Inbox";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { blue, lightGreen, purple } from "@mui/material/colors";
import "./Style.scss";

export const SideBar = ({}) => {
  return (
    <div className="sidebar">
      <div>
        <InboxIcon sx={{ color: blue[300] }} />
        <span>Inbox</span>
      </div>
      <div>
        <TodayIcon sx={{ color: lightGreen[500] }} />
        <span>Today</span>
      </div>

      <div>
        <DateRangeIcon sx={{ color: purple[500] }} />
        <span>Upcoming</span>
      </div>
    </div>
  );
};
