import React, { useState, useEffect } from "react";
import { Header } from "../Dashboard/Components/Header.js";
import { SideBar } from "../Dashboard/SideBar/SideBar.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavigateFunc } from "../Navigate/Navigate";

// Using Implicit function with out return keyword.
export const Dashboard = (
  props,
  { darkModeDefault = false, showSideBarDefault = true }
) => {
  const [showSideBar, setShowSideBar] = useState(showSideBarDefault);
  const [sideBarPath, setSideBarPath] = useState("");
  const {
    match: { url },
    location,
  } = props;

  console.log(url, url.split("/") , "props : ", props);

  const navigate = NavigateFunc.bind(props);

  return (
    <>
      <Header
        props={props}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
      />

      <div style={{ display: "flex" }}>
        {showSideBar && <SideBar navigate={navigate} />}
        <BrowserRouter>
          <Switch>
            <Route path={`${url}`} exact component={PageNotFound} />
            <Route path={`${url}/inbox`} component={SideBar} />
            <Route path={`${url}/today`} component={SideBar} />
            <Route path={`${url}/Upcoming`} component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      Page Not Found! siuggdy~
    </div>
  );
};
