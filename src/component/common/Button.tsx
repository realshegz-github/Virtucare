import React from "react";
import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

interface AppButtonProps extends MuiButtonProps {
  className?: string;
  to?: string;
}

const Button: React.FC<AppButtonProps> = ({
  children,
  className = "",
  sx,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      className={className}
      sx={{
        textTransform: "capitalize",
        fontFamily: "500",
        color: "#fff",
        width: "100%",
        px: 3,
        py: 1,
        whiteSpace: "nowrap",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          // transform: "scale(1.05)",
          opacity: 0.8,
        },
        ...sx,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
