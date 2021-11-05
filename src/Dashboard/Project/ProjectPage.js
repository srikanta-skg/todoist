import React from "react";
import { AddTask } from "../Task/AddTask.js";
import { storageService } from "../../Dashboard/Utility/function";
import { ReturnTodoList } from "./functions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NavigateFunc } from "../../Navigate/Navigate.js";
import isEmpty from "lodash/isEmpty";

export const ProjectPage = (props) => {
  const {
    match: { url },
  } = props;

  const navigate = NavigateFunc.bind(props);
  const pathName = url?.split("/")[3] || "";
  const Projects = storageService().getObject("todoProjects");
  const ProjectData = Projects[pathName - 1];
  storageService().set("currentProjectID", ProjectData?.projectID || pathName);

  const todoList = ReturnTodoList(
    ProjectData?.projectID || pathName,
    isEmpty(storageService().getObject("todoList"))
      ? []
      : storageService().getObject("todoList")
  );

  const DeleteProject = () => {
    // eslint-disable-next-line no-restricted-globals
    let yesNo = confirm("Are you sure you want to delete this project");
    if (yesNo) {
      Projects.splice(ProjectData?.projectID - 1, 1);
      storageService().setObject("todoProjects", Projects);
      navigate("/home/Today");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: "20px 0 0 20%",
        }}
      >
        <div style={{ textAlign: "right" }}>
          Your On {ProjectData?.projectName} Project
        </div>
        <div
          style={{
            position: "absolute",
            right: "30%",
            borderBottom: "2px solid black",
            cursor: "pointer",
          }}
        >
          <DeleteForeverIcon onClick={DeleteProject} />
        </div>
      </div>
      <AddTask propsValue={props} ProjectData={todoList}/>
      {/* <Switch>
        <Route path={`${url}`} exact component={AddTask} />
      </Switch> */}
    </div>
  );
};