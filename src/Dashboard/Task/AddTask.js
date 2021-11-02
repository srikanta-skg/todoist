import React, { useState } from "react";
import { Time } from "./function";
import AddIcon from "@mui/icons-material/Add";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import "./Style.scss";

export const AddTask = (props, { event }) => {
  const [todoList, setTodoList] = useState([]);
  const [addTaskIcon, setAddTaskIcon] = useState(false);
  const [value, setValue] = useState("");
  const [valueDec, setValueDec] = useState("");

  const {
    match: { url },
  } = props;
  const pathName = url.split("/")[2];

  const handleChange = (event) => {
    return setValue(event.target.value);
  };

  const handleChangeDec = (event) => {
    return setValueDec(event.target.value);
  };

  const onCancle = () => {
    return setAddTaskIcon(true);
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
    todoList.splice(idx, 1);
    todoList.map((item, idx) => {
      return {
        ...item,
        index: idx,
      };
    });
    setTodoList(todoList);
    setAddTaskIcon(!addTaskIcon);
  };

  return (
    <>
      <div style={{ marginLeft: "20%" }}>
        <h3>
          {pathName}{" "}
          <span style={{ fontSize: "12px", color: "gray" }}> {Time()}</span>
        </h3>

        {todoList &&
          todoList.map((item, idx) => {
            return (
              <div className="checkcircle-outlineicon">
                <Radio
                  checked={false}
                  onClick={() => taskComplete(idx)}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <span style={{ margin: "-20px 0 10px 10px" }}>
                  <h3>{item.title}</h3>
                  {item.details && (
                    <p style={{ margin: "-15px 0 5px 0" }}>{item.details}</p>
                  )}
                </span>
              </div>
            );
          })}

        {addTaskIcon && (
          <div className="addtask-icon" onClick={() => setAddTaskIcon(false)}>
            <AddIcon sx={{ color: red[500] }} />{" "}
            <span className="addtask-header"> Add Task</span>
          </div>
        )}

        {!addTaskIcon && (
          <Task
            handleChange={handleChange}
            handleChangeDec={handleChangeDec}
            onCancle={onCancle}
            onSubmit={onSubmit}
            value={value}
            valueDec={valueDec}
            disabled={value.length > 0 ? false : true}
          />
        )}
      </div>
    </>
  );
};

const Task = ({
  disabled,
  handleChange,
  handleChangeDec,
  onCancle,
  onSubmit,
  value,
  valueDec,
}) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        display: "flex",
        flexDirection: "column",
        width: "520px",
        padding: "5px",
        borderRadius: "8px",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "500px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          onChange={handleChange}
          multiline
          value={value}
          variant="standard"
        />
        <div>
          <TextField
            id="standard-multiline-static"
            label=""
            multiline
            rows={4}
            value={valueDec}
            placeholder="eg,. Get pastries Sun at 9 #Family"
            onChange={handleChangeDec}
            variant="standard"
          />
        </div>
      </Box>
      <div>
        <Button
          onClick={onSubmit}
          disabled={disabled}
          variant="contained"
          color="error"
        >
          Add Task
        </Button>{" "}
        <Button onClick={onCancle} variant="outlined">
          Cancle
        </Button>
      </div>
    </div>
  );
};
