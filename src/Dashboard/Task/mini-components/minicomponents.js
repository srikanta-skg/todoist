import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import { red } from "@mui/material/colors";
import "../Style.scss"

export const AddTaskBlock = ({setAddTaskBlock}) => (
  <div className="addtask-icon" onClick={() => setAddTaskBlock(false)}>
    <AddIcon sx={{ color: red[500] }} />{" "}
    <span className="addtask-header"> Add Task</span>
  </div>
);


export const TaskBar = (
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