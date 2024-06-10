import { TextField } from "@mui/material";
import React from "react";

interface IFormTextField {
  id: string;
  label: string;
  getFieldProps: any;
  error: boolean;
  helperText: string;
  disabled?: boolean;
  multiline?: boolean;
}

export const FormTextField = ({
  id,
  label,
  getFieldProps,
  error,
  helperText,
  disabled,
  multiline = false,
}: IFormTextField) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      id={id}
      label={label}
      {...getFieldProps(id)}
      error={error}
      helperText={helperText}
      disabled={disabled && disabled}
      multiline={multiline}
      rows={multiline ? 6 : 1}
    />
  );
};
