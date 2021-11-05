import "./Style.scss";
import React, { useEffect, useState } from "react";
import { Time, FilterTodayTaskOnly } from "./function";
import WVBottomSheet from "./WVBottomSheet";
import { Taskbox } from "./TaskBox";
import SlidingTabs from "./Tabs";
import { storageService } from "../Utility/function";
import { AddTaskBlock, TaskBar } from "./mini-components/minicomponents.js";
import isEmpty from "lodash/isEmpty";
import { ReturnTodoList } from "../Project/functions";

const TaskList = () =>
  isEmpty(storageService().getObject("todoList"))
    ? []
    : storageService().getObject("todoList");

export const AddTask = (props, {}) => {
  const ProjectData = props?.ProjectData || TaskList();
  const [todoList, setTodoList] = useState(ProjectData);
  const [addTaskBlock, setAddTaskBlock] = useState(false);
  const [value, setValue] = useState("");
  const [valueDec, setValueDec] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [bottomsheet, setBottomSheet] = useState([]);
  const [isBottom, setIsBottom] = useState(false);
  const {
    match: { url },
  } = props?.propsValue || props;
  const pathName = url?.split("/")[2] || "";
  const isProject = url?.split("/")[3];
  if (!isProject) {
    storageService().set("currentProjectID", 0);
  } else {
    storageService().set("currentProjectID", isProject);
  }

  useEffect(() => {
    todoListUpdateFunc();
  }, [pathName, url]);
  const todoListUpdateFunc = (list) => {
    let isToday, isIndox, isProjectTest;
    if (pathName === "Today") {
      isToday = true;
    } else if (pathName === "Inbox") {
      isIndox = true;
    } else if (pathName === "project") {
      isProjectTest = true;
    }

    if (!list) list = TaskList();
    if (pathName === "Today" && isToday) {
      isToday = false;
      setTodoList(FilterTodayTaskOnly(list));
      console.log("yes");
    } else if (pathName === "Inbox" && isIndox) {
      isIndox = false;
      setTodoList(list);
    } else if (pathName === "project" && isProject) {
      isProjectTest = false;
      setTodoList(
        ReturnTodoList(
          storageService().get("currentProjectID") || isProject,
          list
        )
      );
    }
  };


  useEffect(() => {
    if (openDialog) {
      let [obj] = bottomsheet;
      let arr = [...todoList].splice(obj?.index - 1, 1);
      setBottomSheet(arr);
    }
  }, [todoList]);

  const onClose = (idx) => {
    const arr = [...todoList];
    setBottomSheet(arr.splice(idx, 1));
    return setOpenDialog(!openDialog);
  };

  const handleChange = (event) => {
    return setValue(event.target.value);
  };

  const handleChangeDec = (event) => {
    return setValueDec(event.target.value);
  };

  const onCancle = (idx) => {
    setIsBottom(false);
    return setAddTaskBlock(!addTaskBlock);
  };

  const onSubmit = () => {
    const list = TaskList();
    list.push({
      title: value,
      details: valueDec,
      index: list.length + 1,
      createdTime: Time(),
      complitionTime: "",
      currentProjectID: storageService().get("currentProjectID") || 0,
      subtask: [],
    });
    storageService().setObject("todoList", list);
    setValue("");
    setValueDec("");
    todoListUpdateFunc(list);
  };

  const taskComplete = (idx, taskDates) => {
    if (isEmpty(taskDates)) todoList.splice(idx - 1, 1);
    todoList.map((item, idx) => {
      item.index = idx + 1;
      if (taskDates) item.complitionTime = Time(taskDates.end);
      return {
        ...item,
      };
    }); // Fix the Multi Project Deleting Task Issue Pending
    setTodoList(todoList);
    setIsBottom(true);
    setAddTaskBlock(!addTaskBlock);
    storageService().setObject("todoList", todoList);
  };

  return (
    <>
      <div style={{ marginLeft: "20%" }}>
        <h3>
          {pathName}{" "}
          <span style={{ fontSize: "12px", color: "gray" }}> {Time()}</span>
        </h3>
        {/* This is the List of Task shown in the body*/}
        {todoList && (
          <TaskBar
            todoList={todoList}
            taskComplete={taskComplete}
            onClose={onClose}
          />
        )}
        {/* This is the Plus Button  AddTaskBlock*/}
        {addTaskBlock && <AddTaskBlock setAddTaskBlock={setAddTaskBlock} />}

        {!addTaskBlock && (
          <Taskbox
            handleChange={handleChange}
            handleChangeDec={handleChangeDec}
            onCancle={onCancle}
            onSubmit={onSubmit}
            value={value}
            valueDec={valueDec}
            disabled={value.length > 0 ? false : true}
          />
        )}
        {openDialog && (
          <WVBottomSheet
            isOpen={openDialog}
            onClose={onClose}
            title={
              <TaskBar
                todoList={bottomsheet}
                taskComplete={taskComplete}
                onClose={onClose}
                isBottom={isBottom}
                setTodoList={setTodoList}
              />
            }
            subtitle={"Description goes here"}
            children={
              <SlidingTabs
                setAddTaskBlock={() => setAddTaskBlock(!addTaskBlock)}
                addTaskBlock={addTaskBlock}
                taskbar={bottomsheet}
                setTodoList={setTodoList}
              />
            }
          />
        )}
      </div>
    </>
  );
};