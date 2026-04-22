import React from "react";
import { TextField, type TextFieldProps } from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, "variant"> {
  sx?: object;
}

const InputField: React.FC<InputFieldProps> = ({ sx = {}, ...props }) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "6px",
          "& fieldset": {
            borderColor: "#A4A7B7",
             fontSize: "1rem",
          },
          "&:hover fieldset": {
            borderColor: "#A4A7B7",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0A74DC",
            borderWidth: "1.5px",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "1rem",
          "&.Mui-focused": {
            color: "primary.main",
          },
        },
        "& .MuiOutlinedInput-input": {
          padding: "14px 16px",
          fontSize: "1rem",
        },
        ...sx,
      }}
    />
  );
};

export default InputField;
