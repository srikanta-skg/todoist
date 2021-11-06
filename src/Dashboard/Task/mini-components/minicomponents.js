import "../Style.scss";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import { red, grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EventIcon from "@mui/icons-material/Event";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CommentIcon from "@mui/icons-material/Comment";

export const AddTaskBlock = ({ setAddTaskBlock }) => (
  <div className="addtask-icon" onClick={() => setAddTaskBlock(false)}>
    <AddIcon sx={{ color: red[500] }} />{" "}
    <span className="addtask-header"> Add Task</span>
  </div>
);

export const TaskBar = ({
  todoList,
  taskComplete,
  onClose,
  isBottom,
  subtask,
  addComment,
}) => {
  const [showCalander, setshowCalander] = useState(false);
  const classes = useStyles();
  return todoList?.map((item, idx) => {
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
          <h3
            style={{
              textDecoration: isBottom ? "line-through" : "",
              color: "#696969",
            }}
          >
            {item?.title}
          </h3>
          {item?.details && (
            <p
              style={{
                margin: "-15px 0 5px 0",
                fontSize: "16px",
                color: "#808080",
              }}
            >
              {item.details}
            </p>
          )}
          {item?.complitionTime && (
            <p
              style={{
                margin: "5px 0 5px 0",
                fontSize: "12px",
                color: "#A9A9A9",
              }}
            >
              {item.complitionTime}
            </p>
          )}
        </span>
        {!showCalander && (
          <EventIcon
            onClick={() => {
              setshowCalander(true);
              toast("Please Select the start Date");
            }}
            sx={{ color: grey[300] }}
          />
        )}
        {/* {subtask && (
          <IconButton
            className={classes.customHoverFocus}
            aria-label="add to shopping cart"
            onClick={() => addComment(item.index)}
          >
            <AddCommentIcon sx={{}} />
          </IconButton>
        )} */}
        <br />
        {showCalander && (
          <DatePickerComp
            setshowCalander={setshowCalander}
            timeCallBack={(time) => taskComplete(item.index, time)}
          />
        )}
      </div>
    );
  });
};

export const CommentBox = ({ onSubmit, onCommentChange, comment = "" }) => {
  return (
    <div className="comment-box">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          rows={6}
          value={comment}
          placeholder="Write a comment"
          onChange={onCommentChange}
        />
      </Box>
      <div className="btn-comment">
        <div
          className={
            comment?.length === 0 ? "button-css" : "button-css btn-submit"
          }
        >
          <Button
            onClick={onSubmit}
            disabled={comment?.length === 0}
            variant="contained"
            color="error"
          >
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CommentTextRender = ({ taskbar, deleteComment }) => {
  const classes = useStyles();
  return taskbar?.map((item) => {
    return (
      <>
        {item.comment && (
          <div className="checkcircle-outlineicon">
            <span style={{ margin: "-10px 0 0 -20px" }}>
              <IconButton
                className={classes.customHoverFocus}
                aria-label="add to shopping cart"
              >
                <CommentIcon sx={{}} />
              </IconButton>
            </span>
            <span style={{ margin: "-20px 0 10px", width: "100%" }}>
              {item.comment && <h3 style={{}}>{item.title}</h3>}
              {item.comment && (
                <p style={{ margin: "-15px 0 5px 0" }}>{item.comment}</p>
              )}
            </span>
            <IconButton
              className={classes.customHoverFocus}
              aria-label="Delete"
              onClick={() => deleteComment(item.index, true)}
            >
              <DeleteIcon sx={{}} />
            </IconButton>
          </div>
        )}
      </>
    );
  });
};

const useStyles = makeStyles((theme) => ({
  customHoverFocus: {
    "&.MuiButtonBase-root": {
      color: "#e0e0e0",
    },
    "&:hover, &.Mui-focusVisible": {
      color: "#212121",
    },
  },
}));

export const DatePickerComp = ({ setshowCalander, timeCallBack }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && !end) {
      toast("Please Select End Date");
    } else if (start && end) {
      toast("Todo Task Calendar is Updated");
      timeCallBack({ start, end });
      setTimeout(() => {
        setshowCalander(false);
      }, [1500]);
    }
  };
  return (
    <div style={{ position: "absolute", right: 0, zIndex: 1 }}>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </div>
  );
};