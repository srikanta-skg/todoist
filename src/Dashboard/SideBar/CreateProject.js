import "./Style.scss";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import WVBottomSheet from "../Task/WVBottomSheet.js";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "react-tooltip-lite";
import TextField from "@mui/material/TextField";

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

const Children = () => {
  const [selectedColor, setSelectedColor] = useState();
  console.log("selectedColor", selectedColor);
  return (
    <div>
      <h4>Name</h4>
      <TextField id="outlined-basic" label="" variant="outlined" fullWidth />
      <h4>color</h4>
      <DropDownComp selectedOption={(ele) => setSelectedColor(ele)} />
    </div>
  );
};

export const CreateProject = ({ openDialog, onClose }) => {
  return (
    <div className="create-project">
      {
        <WVBottomSheet
          isOpen={openDialog}
          onClose={onClose}
          title={<Title />}
          children={<Children />}
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
