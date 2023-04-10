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

abel: "Lamb Biryani", trigger: "8" },
      { value: "Fish Biryani", label: "Fish Biryani", trigger: "8" },
      { value: "Goat Biryani", label: "Goat Biryani", trigger: "8" },
      {
        value: "Vegetable Dum Biryani",
        label: "Vegetable Dum Biryani",
        trigger: "8",
      },
    ],
  },
  {
    id: "19",
    message: "Which Main Course do you want to order?",
    trigger: "24",
  },
  {
    id: "24",
    options: [
      { value: "Kadai Chicken", label: "Kadai Chicken", trigger: "8" },
      { value: "Butter Chicken", label: "Butter Chicken", trigger: "8" },
      { value: "Egg Masala", label: "Egg Masala", trigger: "8" },
      { value: "Goat Curry", label: "Goat Curry", trigger: "8" },
      { value: "Shrimp Masala", label: "Shrimp Masala", trigger: "8" },
      { value: "Palak Paneer", label: "Palak Paneer", trigger: "8" },
      { value: "Mixed Veg Masala", label: "Mixed Veg Masala", trigger: "8" },
    ],
  },
  {
    id: "20",
    message: "Which Indo Chineese dish do you want to order?",
    trigger: "25",
  },
  {
    id: "25",
    options: [
      { value: "Fried Rice", label: "Fried Rice", trigger: "8" },
      { value: "Hakka Noodles", label: "Hakka Noodles", trigger: "8" },
      { value: "Chicken Manchuria", label: "Chicken Manchuria", trigger: "8" },
    ],
  },
  {
    id: "26",
    message: "Which Beverage do you want to order?",
    trigger: "27",
  },
  {
    id: "27",
    options: [
      { value: "Tea", label: "Tea", trigger: "8" },
      { value: "Coffee", label: "Coffee", trigger: "8" },
      { value: "Butter Milk", label: "Butter Milk", trigger: "8" },
      { value: "Mango Shake", label: "Mango Shake", trigger: "8" },
    ],
  },
  {
    id: "4",
    message: "May I know your email?",
    trigger: "5",
  },
  {
    id: "5",
    user: true,
    metadata: {
      email: "email",
      value: "{{{raw}}}",
    },
    trigger: "6",
    validator: (value: any) => {
      if (validator.validate(value)) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    id: "6",
    message: "Would you like to order your previous-order?",
    trigger: "7",
  },
  {
    id: "7",
    options: [
      { value: "Yes", label: "Yes", trigger: "8" },
      { value: "No", label: "No", trigger: "14" },
    ],
  },
  {
    id: "8",
    message: "Are you sure? Do you want to order?",
    trigger: "10",
  },
  {
    id: "10",
    options: [
      { value: "Yes", label: "Yes", trigger: "11" },
      { value: "No", label: "No", trigger: "14" },
    ],
  },
  {
    id: "11",
    message: "Your order is added to cart. Please proceed for the payment",
    end: true,
  },
];