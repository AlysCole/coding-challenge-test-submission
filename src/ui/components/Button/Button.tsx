import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";

import Spinner from "../Spinner/Spinner";

import $ from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      className={`${$.button} ${variant === "secondary" ? $.secondary : $.primary}`}
      type={type}
      onClick={onClick}
    >
      <Spinner loading={loading} data-testid="loading-spinner" />
      {children}
    </button>
  );
};

export default Button;
