import "./Style.scss";
import React, { useState } from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { blue, lightGreen, purple } from "@mui/material/colors";
import { CreateProject } from "./CreateProject";

export const SideBar = ({ navigate }) => {
  const [showProjects, setShowProjects] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const onChange = () => {
    setOpenDialog(!openDialog);
  };
  return (
    <div className="sidebar">
      <div
        style={{ marginTop: "30px" }}
        onClick={() => navigate("/home/Inbox")}
      >
        <InboxIcon sx={{ color: blue[300] }} />
        <span>Inbox</span>
      </div>
      <div onClick={() => navigate("/home/Today")}>
        <TodayIcon sx={{ color: lightGreen[500] }} />
        <span>Today</span>
      </div>
      <div onClick={() => navigate("/home/Upcoming")}>
        <DateRangeIcon sx={{ color: purple[500] }} />
        <span>Upcoming</span>
      </div>

      <div
        className="sidebar-project"
        onClick={() => setShowProjects(!showProjects)}
      >
        {!showProjects && <KeyboardArrowRightIcon />}
        {showProjects && <KeyboardArrowDownIcon />}
        <h4>Projects</h4>
        <div className="hide" onClick={onChange}>
          +
        </div>
      </div>
      <CreateProject openDialog={openDialog} onClose={onChange} />
    </div>
  );
};
