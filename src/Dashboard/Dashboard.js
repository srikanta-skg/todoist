import React, { useState, useEffect } from "react";
import { Header } from "../Dashboard/Components/Header.js";
import { SideBar } from "../Dashboard/SideBar/SideBar.js";

// Using Implicit function with out return keyword.
export const Dashboard = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  const [showSideBar, setShowSideBar] = useState(false);

  console.log(showSideBar);

  return (
    <>
      <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      {showSideBar && <SideBar />}
    </>
  );
};
