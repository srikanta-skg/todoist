import "./Style.scss";
import React, { useState } from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { blue, lightGreen, purple } from "@mui/material/colors";
import { CreateProject } from "./CreateProject";
import { storageService } from "../Utility/function";
import isEmpty from "lodash/isEmpty";

export const SideBar = ({ navigate }) => {
  const [showProjects, setShowProjects] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const projectList = isEmpty(storageService().getObject("todoProjects"))
    ? []
    : storageService().getObject("todoProjects");

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
      {showProjects &&
        projectList.map((item) => {
          return (
            <div onClick={() => navigate(`/home/project/${item?.projectID}`)}>
              {" "}
              <span
                style={{ backgroundColor: item?.selectedColor }}
                className="project-itemcolor"
              />
              {item.projectName.substring(0, 10)}{" "}
            </div>
          );
        })}

      <CreateProject
        navigate={navigate}
        openDialog={openDialog}
        onClose={onChange}
      />
    </div>
  );
};
