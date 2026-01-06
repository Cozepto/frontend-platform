import * as React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export type ButtonTone =
  | "primary"
  | "inherit"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type ButtonProps = MuiButtonProps & {
  loading?: boolean;
  tone?: ButtonTone;
};

export function Button({
  loading,
  tone = "primary",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <MuiButton color={tone} disabled={disabled || loading} {...props}>
      {loading ? "Loading..." : children}
    </MuiButton>
  );
}
