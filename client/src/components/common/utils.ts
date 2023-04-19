import { ReactNode } from "react";

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

export interface AlertMessageProps {
  status: AlertStatus;
  alertMessage?: string;
  showAlert?: boolean;
}

export enum NotificationStatus {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  DEFAULT = "default",
}

export interface NotificationProps {
  status?: NotificationStatus;
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
        label: "Add Inventory",
        subLabel: "Create inventory",
        href: "/add-inventory",
      },
      {
        label: "Inventory",
        subLabel: "Manage inventory",
        href: "/inventory",
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

// export const CLIENT_NAV_ITEMS: Array<NavItem> = [
//   {
//     label: "Dashboard",
//     href: "/dashboard",
//   },
//   {
//     label: "Admin",
//     children: [
//       {
//         label: "Create Employee",
//         subLabel: "you can create and manage employees",
//         href: "/employee",
//       },
//       {
//         label: "Add Inventory",
//         subLabel: "Create inventory",
//         href: "/add-inventory",
//       },
//       {
//         label: "Inventory",
//         subLabel: "Manage inventory",
//         href: "/inventory",
//       },
//       {
//         label: "Offers",
//         subLabel: "Create Offers and Rewards",
//         href: "/rewards",
//       },
//       {
//         label: "Sales",
//         subLabel: "View the sales details.",
//         href: "/sales",
//       },
//     ],
//   },

//   {
//     label: "Employee",
//     children: [
//       {
//         label: "Orders",
//         subLabel: "Find your orders",
//         href: "/employee-orders",
//       },
//       {
//         label: "Orders Now",
//         subLabel: "Find your orders",
//         href: "/create-order",
//       },
//       {
//         label: "Update Orders",
//         subLabel: "Update inventory items status",
//         href: "/employee-update-orders",
//       },
//     ],
//   },

//   {
//     label: "Customer",
//     children: [
//       {
//         label: "Orders Now",
//         subLabel: "Find items to order",
//         href: "/orders",
//       },
//       {
//         label: "Purchase History",
//         subLabel: "Check your purchase history",
//         href: "/purchase-history",
//       },
//       {
//         label: "Payment",
//         subLabel: "Check your payment section",
//         href: "/payment",
//       },
//       {
//         label: "Restaurant Tour",
//         subLabel: "Check your payment section",
//         href: "/tour",
//       },
//     ],
//   },
// ];

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
    label: "Update Orders",
    subLabel: "Update inventory items status",
    href: "/employee-update-orders",
  },
];
export const ADMIN_NAV_ITEMS: Array<NavItem> = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
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
];

export const CLIENT_NAV_ITEMS: Array<NavItem> = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Order Now",
    href: "/orders",
  },
  {
    label: "Purchase History",
    href: "/purchase-history",
  },
  {
    label: "Restaurant Tour",
    href: "/tour",
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
  about?: string;
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
  price: number;
  discount: number;
  isAvailable: boolean;
  tax: number;
}

export interface RewardsRequestPayload {
  id: string;
  rewardType: string;
  code: string;
  discountPercentage: number;
  maxDiscountAmount: number;
  minOrderPrice: number;
  appliesTo: string;
  appliedCategory: string[] | string;
  startTime?: Date | string;
  endTime?: Date | string;
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
  } else if (status === true) {
    return "green";
  } else if (status === false) {
    return "red";
  } else {
    return "green";
  }
};

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
    id: '0',
    message: 'Welcome Order & Enjoy the food in NOSH',
    trigger: '1',
    waitAction: true,
  },
  {
    id: '1',
    message: 'Is this your first order',
    trigger: '2',
    waitAction: true,
  },
    {
    id: '2',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '3' },
      { value: 'No', label: 'No', trigger: '4' },
    ],
    waitAction: true,
  },
  {
    id: '3',
    message: 'thankyou',
    end:true,
  },

   {
    id: '4',
    message: 'May I know your name?',
    trigger: '5',
    waitAction: true,
  },
  {
    id: '5',
    user: true,
    metadata: {
      name: 'name',
      value: '{{{raw}}}'
    },
    trigger: '6',
    waitAction: true,
  },
  {
    id: '6',
    message: 'Would you like to order your previous-order?',
    trigger: '7',
    waitAction: true,
  },
  {
    id: '7',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '8' },
      { value: 'No', label: 'No', trigger: '9' },
    ],
    waitAction: true,
  },
  {
    id: '9',
    message: 'thankyou',
    end:true,
  },
  {
    id: '8',
    message: 'Are you sure? Do you want to order your previous-order?',
    trigger: '10',
    waitAction: true,
  },
  {
    id: '10',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '11' },
      { value: 'No', label: 'No', trigger: '12' },
    ],
    waitAction: true,
  },
  {
    id: '12',
    message: 'thankyou',
    end:true,
  },
  {
    id: '11',
    message: 'Your previous-order is added to cart. Please proceed for the payment',
    end:true,
    waitAction: true,
  },
];