import React, { useState } from "react";
import { Time } from "./function";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import WVBottomSheet from "./WVBottomSheet";
import { Taskbox } from "./TaskBox";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import "./Style.scss";
import  DemoTabs from './Tabs'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

export const AddTask = (props, { event }) => {
  const [todoList, setTodoList] = useState([]);
  const [addTaskBlock, setAddTaskBlock] = useState(false);
  const [value, setValue] = useState("");
  const [valueDec, setValueDec] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [bottomsheet, setBottomSheet] = useState([]);
  const [isBottom, setIsBottom] = useState(false);

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
    });
    setTodoList(todoList);
    setValue("");
    setValueDec("");
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
  };

  return (
    <>
      <div style={{ marginLeft: "20%" }}>
        <h3>
          {pathName}{" "}
          <span style={{ fontSize: "12px", color: "gray" }}> {Time()}</span>
        </h3>

        {todoList && (
          <TodoListBlock
            todoList={todoList}
            taskComplete={taskComplete}
            onClose={onClose}
          />
        )}

        {addTaskBlock && (
          <div className="addtask-icon" onClick={() => setAddTaskBlock(false)}>
            <AddIcon sx={{ color: red[500] }} />{" "}
            <span className="addtask-header"> Add Task</span>
          </div>
        )}

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
            children={<Taskbox />}
            subtitle={
              <DemoTabs />
              // <SwipeableViews
              //   // ref={this.swipeableViewsRef}
              //   index={0}
              //   className="tab-wrapper"
              //   id="tab-wrapper"
                // animateHeight
                // enableMouseEvents
              // >
              //   <TabContainer dir={"ltr"}></TabContainer>
              //   <TabContainer dir={"ltr"}></TabContainer>
              //   <TabContainer dir={"ltr"}></TabContainer>
              // </SwipeableViews>
            }
            title={
              <TodoListBlock
                todoList={bottomsheet}
                taskComplete={taskComplete}
                onClose={onClose}
                isBottom={isBottom}
              />
            }
          />
        )}
      </div>
    </>
  );
};

const TodoListBlock = (
  { todoList, taskComplete, onClose, isBottom } // implisit return function
) =>
  todoList.map((item, idx) => {
    return (
      <div className="checkcircle-outlineicon">
        <Radio
          checked={false}
          onClick={() => taskComplete(item.index)}
          value="a"
          name="radio-buttons"
          inputProps={{ "aria-label": "A" }}
        />
        <span
          style={{ margin: "-20px 0 10px 10px", width: "100%" }}
          onClick={() => onClose(idx)}
        >
          <h3 style={{ textDecoration: isBottom ? "line-through" : "" }}>
            {item.title}
          </h3>
          {item.details && (
            <p style={{ margin: "-15px 0 5px 0" }}>{item.details}</p>
          )}
        </span>
      </div>
    );
  });