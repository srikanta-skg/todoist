import React, { useState } from "react";
import { Header } from "../Dashboard/Components/Header.js";
import { SideBar } from "../Dashboard/SideBar/SideBar.js";
import { Route, Switch } from "react-router-dom";
import { NavigateFunc } from "../Navigate/Navigate";
import { AddTask } from "./Task/AddTask";
import { ProjectPage } from "../Dashboard/Project/ProjectPage.js"

// Using Implicit function with out return keyword.
export const Dashboard = (
  props,
  { showSideBarDefault = true }
) => {
  const [showSideBar, setShowSideBar] = useState(showSideBarDefault);
  const {
    match: { url },
    location,
  } = props;

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
        <Switch>
          <Route path={`${url}`} exact component={AddTask} />
          <Route path={`${url}/Inbox`} component={AddTask} />
          <Route path={`${url}/Today`} component={AddTask} />
          <Route path={`${url}/Upcoming`} component={PageNotFound} />
          <Route path={`${url}/project/:ProjectId`} component={ProjectPage} />
        </Switch>
      </div>
    </>
  );
};

const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center", width: "100%" }}>Page Not Found!</div>
  );
};

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDU4NPcXp8nQ_ya0bKXlVdhWaVtVDV6GuE",
//   authDomain: "todoist-46a90.firebaseapp.com",
//   projectId: "todoist-46a90",
//   storageBucket: "todoist-46a90.appspot.com",
//   messagingSenderId: "973392416861",
//   appId: "1:973392416861:web:b180a0dbeb0447fce23db4",
//   measurementId: "G-DX0614J6FW"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);