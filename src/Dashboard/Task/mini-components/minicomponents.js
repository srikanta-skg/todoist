import "../Style.scss";
// import img from '../../SideBar/assets/circle.svg';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import { red, grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CommentIcon from "@mui/icons-material/Comment";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

export const AddTaskBlock = ({ setAddTaskBlock }) => (
  <div className="addtask-icon" onClick={() => setAddTaskBlock(false)}>
    <AddIcon sx={{ color: red[500] }} />{" "}
    <span className="addtask-header"> Add Task</span>
  </div>
);

export const TaskBar = (
  { todoList, taskComplete, onClose, isBottom } // implisit return function
) =>
  todoList?.map((item, idx) => {
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
            {item?.title}
          </h3>
          {item?.details && (
            <p style={{ margin: "-15px 0 5px 0" }}>{item.details}</p>
          )}
        </span>
        <br/>
      </div>
    );
  });

export const CommentBox = ({
  onSubmit,
  onCommentChange,
  comment = '',
}) => {
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
        <div className={comment?.length === 0 ? 'button-css' : 'button-css btn-submit'}>
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
            <CommentIcon sx={{ color: grey[800] }} />
            <span
              style={{ margin: "-20px 0 10px 10px", width: "100%" }}
              // onClick={() => onClose(idx)}
            >
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
