import React, { useState } from "react";
import PropTypes from "prop-types";
import { grey } from "@mui/material/colors";
import "./Style.scss";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

// import { FaPizzaSlice } from "react-icons/fa";

export const Header = ({ showSideBar, setShowSideBar }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);

  //   const [showSideBar, setShowSideBar] = useState(false);

  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <div className="header">
      <div
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        <MenuIcon sx={{ color: grey[50] }} />
      </div>

      <div>
        <HomeIcon sx={{ color: grey[50] }} />
      </div>
    </div>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
