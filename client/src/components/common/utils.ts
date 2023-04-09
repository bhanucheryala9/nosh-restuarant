import { ReactNode } from "react";
const validator = require("email-validator");
export const resetLocalStorage = () => {
  localStorage.setItem("userInfo", JSON.stringify({}));
  localStorage.setItem("isUserLoggedIn", "no");
  localStorage.setItem("orders", JSON.stringify([]));
};
export enum AlertStatus {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export const generateUID = () => {
  return Math.floor(Math.random() * 90000) + 10000;
};

export const getStatusColors = (status: string | boolean) => {
  if (status === "processing") {
    return "yellow";
  } else if (status === "accepted") {
    return "orange";
  } else if (status === "preparing") {
    return "blue";
  } else if (status === "cancel") {
    return "red";
  } else if (status === true) {
    return "green";
  } else if (status === false) {
    return "red";
  } else {
    return "green";
  }
};
