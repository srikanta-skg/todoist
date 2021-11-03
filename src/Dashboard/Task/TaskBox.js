import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './Style.scss';

export const Taskbox = ({
    disabled,
    handleChange,
    handleChangeDec,
    onCancle,
    onSubmit,
    value,
    valueDec,
  }) => {
    return (
      <div className='addtask-box'>
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
            // label="Multiline Placeholder"
            placeholder="eg,. Get pastries Sun at 9 #Family"
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
              placeholder="Description"
              onChange={handleChangeDec}
              variant="standard"
            />
          </div>
        </Box>
        <div className='btn-submit'>
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
  