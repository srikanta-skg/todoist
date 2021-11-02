import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  