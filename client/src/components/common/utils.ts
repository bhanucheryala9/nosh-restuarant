import { ReactNode } from "react";

export enum AlertStatus {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export interface AlertMessageProps {
  status: AlertStatus;
  alertMessage?: string;
  showAlert?: boolean;
}

export interface LoaderProps {
  loadingMessage?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label:"Dashboard",
    href:"dashboard"
  },
  {
    label: "Admin",
    children: [
      {
        label: "Create Employee",
        subLabel: "you can create and manage employees",
        href: "employee",
      },
      {
        label: "Inventory",
        subLabel: "Create and manage inventory",
        href: "/add-inventory",
      },
      {
        label: "Offers",
        subLabel: "Create Offers and Rewards",
        href: "/rewards",
      },
      {
        label: "Sales",
        subLabel: "View the sales details.",
        href: "/sales",
      },
    ],
  },
  {
    label: "Employee",
    children: [
      {
        label: "Orders",
        subLabel: "Find your orders",
        href: "#",
      },
      {
        label: "Create Order",
        subLabel: "Create new order for Customer",
        href: "#",
      },
    ],
  },
  {
    label: "Customer",
    children: [
      {
        label: "Orders Now",
        subLabel: "Find items to order",
        href: "#",
      },
      {
        label: "Cart",
        subLabel: "Check your cart",
        href: "#",
      },
    ],
  },

];