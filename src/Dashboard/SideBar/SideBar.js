import React, { useState } from "react";
import inbox from "./assets/inbox.svg";
import "./Style.scss";

export const SideBar = ({}) => {
  return (
    <div className="sidebar">
      <div>
        <img scr={inbox} alt="inbox" />
        Inbox
      </div>
      <div>Today</div>
      <div>Upcoming</div>
    </div>
  );
};
