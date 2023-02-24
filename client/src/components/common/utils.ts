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

export const Orders_Catergory = [
  "all",
  "appetizers",
  "biryani",
  "soups",
  "indo-chinese",
  "main-course",
  "beverages",
];

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Admin",
    children: [
      {
        label: "Create Employee",
        subLabel: "you can create and manage employees",
        href: "/employee",
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
    label: "Customer",
    children: [
      {
        label: "Orders Now",
        subLabel: "Find items to order",
        href: "/orders",
      },
      {
        label: "Purchase History",
        subLabel: "Check your purchase history",
        href: "/purchase-history",
      },
      {
        label: "Payment",
        subLabel: "Check your payment section",
        href: "/payment",
      },
    ],
  },
];

/**  Api response structures */
export interface EmployeeRequestPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  joinedDate: Date;
  type: string;
  phoneNumber: number;
  subtype: string;
  salary: number;
  about?:string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipcode: string;
  };
}
export interface InventoryRequestPayload {
  id: string;
  productName: string;
  category: string;
  description: string;
  price:number;
  discount:number;
  isAvailable:boolean;
  tax:number;
}


export interface RewardsRequestPayload {
  id: string;
  rewardType: string;
  code: string;
  discountPercentage: number;
  maxDiscountAmount:number;
  minOrderPrice:number;
  appliesTo:string;
  appliedCategory:string[] |string;
}

// {
//   label: "Employee",
//   children: [
//     {
//       label: "Orders",
//       subLabel: "Find your orders",
//       href: "#",
//     },
//     {
//       label: "Create Order",
//       subLabel: "Create new order for Customer",
//       href: "#",
//     },
//   ],
// },
