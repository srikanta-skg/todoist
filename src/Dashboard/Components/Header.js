import React from "react";
import PropTypes from "prop-types";
import { grey } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { NavigateFunc } from "../../Navigate/Navigate.js";
import "./Style.scss";

export const Header = ({ props, showSideBar, setShowSideBar }) => {
  const navigate = NavigateFunc.bind(props);
  return (
    <div className="header">
      <div
        style={{ margin: "0px 10px 0px 40px", cursor: "pointer" }}
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        <MenuIcon sx={{ color: grey[50] }} />
      </div>

      <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <HomeIcon sx={{ color: grey[50] }} />
      </div>
    </div>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
