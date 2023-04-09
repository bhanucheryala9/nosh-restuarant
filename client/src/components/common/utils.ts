
import { ReactNode } from "react";
const validator = require("email-validator");
export const resetLocalStorage = () => {
  localStorage.setItem("userInfo", JSON.stringify({}));
  localStorage.setItem("isUserLoggedIn", "no");
  localStorage.setItem("orders", JSON.stringify([]));
};


export const Orders_Catergory = [
  "all",
  "appetizers",
  "biryani",
  "soups",
  "indo-chinese",
  "main-course",
  "beverages",
];



export const EMPLOYEE_NAV: Array<NavItem> = [
  {
    label: "Dashboard",
    subLabel: "Find your dashboard",
    href: "/employee-orders",
  },
  {
    label: "Orders",
    subLabel: "Find your orders",
    href: "/create-order",
  },
  {
    label: "Items Availability",
    subLabel: "Update inventory items status",
    href: "/employee-update-orders",
  },
];
export const ADMIN_NAV_ITEMS: Array<NavItem> = [
  {
    label: "Manage Employee",
    href: "/employee",
  },
  {
    label: "Manage Inventory",
    children: [
      {
        label: "Add Inventory",
        subLabel: "Create inventory",
        href: "/add-inventory",
      },
      {
        label: "View Inventory",
        subLabel: "Manage inventory",
        href: "/inventory",
      },
    ],
  },
  {
    label: "Offers",
    href: "/rewards",
  },
  {
    label: "Sales",
    href: "/sales",
  },
  {
    label: "Payment and Refunds",
    href: "/refund",
  },
];



export const cartData = [
  {
    name: "biryani",
    price: 10,
    quantity: 0,
  },
  {
    name: "pulav",
    price: 7,
    quantity: 0,
  },
  {
    name: "idly",
    price: 7,
    quantity: 0,
  },
  {
    name: "vada",
    price: 7,
    quantity: 0,
  },
  {
    name: "dosa",
    price: 9,
    quantity: 0,
  },
];

export const steps_for_chat = [
  {
    id: "0",
    message: "Welcome Order & Enjoy the food in NOSH!",
    trigger: "1",
  },
  {
    id: "1",
    message: "Is this your first order",
    trigger: "2",
  },

];
