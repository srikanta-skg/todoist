import React, { useEffect, useState } from "react";
import { Time } from "./function";
import WVBottomSheet from "./WVBottomSheet";
import { Taskbox } from "./TaskBox";
import "./Style.scss";
import DemoTabs from "./Tabs";
import { storageService } from "../Utility/function";
import { AddTaskBlock, TaskBar } from "./mini-components/minicomponents.js";

export const AddTask = (props, { event }) => {
  const [todoList, setTodoList] = useState([]);
  const [addTaskBlock, setAddTaskBlock] = useState(false);
  const [value, setValue] = useState("");
  const [valueDec, setValueDec] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [bottomsheet, setBottomSheet] = useState([]);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    if (openDialog) {
      let [obj] = bottomsheet;
      let arr = [...todoList].splice(obj?.index - 1, 1);
      setBottomSheet(arr);
    }
  }, [todoList]);

  const {
    match: { url },
  } = props;
  const pathName = url.split("/")[2];

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
    todoList.push({
      title: value,
      details: valueDec,
      index: todoList.length + 1,
      createdTime: Time(),
      complitionTime: "",
      subtask: [],
    });
    setTodoList(todoList);
    setValue("");
    setValueDec("");
    storageService().setObject("todoList", todoList);
  };

  const taskComplete = (idx) => {
    todoList.splice(idx - 1, 1);
    todoList.map((item, idx) => {
      item.index = idx + 1;
      return {
        ...item,
      };
    });
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
            subtitle={"Description goes here bro"}
            children={
              <DemoTabs
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
