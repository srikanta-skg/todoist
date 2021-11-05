import "./Style.scss";
import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import WVBottomSheet from "../Task/WVBottomSheet.js";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "react-tooltip-lite";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { storageService } from "../Utility/function";

const CreateProjectFunc = (value, navigate) => {
  const existingProjects = storageService().getObject("todoProjects");
  if (isEmpty(existingProjects)) {
    value.projectID = 1;
    storageService().setObject("todoProjects", [value]);
  } else {
    value.projectID = existingProjects.length + 1;
    existingProjects.push(value);
    storageService().setObject("todoProjects", existingProjects);
  }
  navigate(`/home/project/${value.projectID}`);
};

const Title = () => (
  <div className="create-project-title">
    <div>Add Project</div>
    <Tooltip
      content="This Page Creates Project"
      direction="right"
      styles={{ zindex: 2000 }}
    >
      <HelpOutlineIcon />
    </Tooltip>
  </div>
);

const Children = ({ onClose, navigate }) => {
  const [selectedColor, setSelectedColor] = useState('red');
  const [projectName, setProjectName] = useState();
  const [disabled, setDisabled] = useState(true);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  useEffect(() => {
    if (projectName && selectedColor) setDisabled(false);
  }, [projectName]);

  const onSubmit = () => {
    CreateProjectFunc({ projectName, selectedColor }, navigate);
    onClose();
  };
  return (
    <div>
      <h4>Name</h4>
      <TextField
        id="outlined-basic"
        label=""
        onChange={(e) => setProjectName(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <h4>color</h4>
      <DropDownComp selectedOption={(ele) => setSelectedColor(ele || 'red')} />
      <br />
      <div>
        <Switch {...label} />
        Add to favorites
      </div>
      <SubmitBtn onSubmit={onSubmit} onCancle={onClose} disabled={disabled} />
    </div>
  );
};

export const CreateProject = ({ openDialog, onClose, navigate }) => {
  return (
    <div className="create-project">
      {
        <WVBottomSheet
          isOpen={openDialog}
          onClose={onClose}
          title={<Title />}
          children={<Children navigate={navigate} onClose={onClose} />}
        />
      }
    </div>
  );
};

export const DropDownComp = ({ selectedOption }) => {
  const [selected, setSelected] = useState([]);
  selectedOption(selected);
  return (
    <div>
      <form action={selectedOption(selected?.target?.value)}>
        <select
          style={{ width: "100%", height: "40px" }}
          onChange={setSelected}
        >
          <option value="red">🔴 Red</option>
          <option value="blue">🔵 Blue</option>
          <option value="green">🟢 Green</option>
          <option value="yellow">🟡 Yellow</option>
        </select>
      </form>
    </div>
  );
};

const SubmitBtn = ({ onSubmit, onCancle, disabled }) => {
  return (
    <div
      className={disabled ? "button-css" : "button-css btn-submit"}
      style={{
        position: "absolute",
        bottom: 10,
        right: 0,
        display: "flex",
        borderTop: "1px solid #bdbdbd",
        width: "100%",
        justifyContent: "right",
        padding: "10px",
      }}
    >
      <Button onClick={onCancle} variant="outlined">
        Cancle
      </Button>
      <span style={{ marginRight: "10px" }} />
      <Button
        onClick={onSubmit}
        disabled={disabled}
        variant="contained"
        color="error"
      >
        Add Task
      </Button>
    </div>
  );
};
