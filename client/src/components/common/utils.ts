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

export const CLIENT_NAV_ITEMS: Array<NavItem> = [
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
      {
        label: "Payment and Rewards",
        subLabel: "Manage payments and refunds.",
        href: "/refund",
      },
    ],
  },

  {
    label: "Employee",
    children: [
      {
        label: "Orders",
        subLabel: "Find your orders",
        href: "/employee-orders",
      },
      {
        label: "Orders Now",
        subLabel: "Find your orders",
        href: "/create-order",
      },
      {
        label: "Update Orders",
        subLabel: "Update inventory items status",
        href: "/employee-update-orders",
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
      {
        label: "Restaurant Tour",
        subLabel: "Check your payment section",
        href: "/tour",
      },
    ],
  },
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

// export const CLIENT_NAV_ITEMS: Array<NavItem> = [
//   {
//     label: "Dashboard",
//     href: "/dashboard",
//   },
//   {
//     label: "Order Now",
//     href: "/orders",
//   },
//   {
//     label: "Purchase History",
//     href: "/purchase-history",
//   },
//   {
//     label: "Restaurant Tour",
//     href: "/tour",
//   },
// ];

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
    message: 'Welcome Order & Enjoy the food in NOSH!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Is this your first order',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '3' },
      { value: 'No', label: 'No', trigger: '4' },
    ],
  },
  {
    id: '3',
    message: 'May I know your email?',
    trigger: '13',
  },
  {
    id: '13',
    user: true,
    metadata: {
      email: 'email',
      value: '{{{raw}}}'
    },
    trigger: '14',
    validator: (value: any) =>{
      if(validator.validate(value)){
        return true
      }else{
        return false
      }
    }
  },
  {
    id: '14',
    message: 'So, Which type of food do you want to order?',
    trigger: '15',
  },
  {
    id: '15',
    options: [
      { value: 'Appetizers', label: 'Appetizers', trigger: '16' },
      { value: 'Soups', label: 'Soups', trigger: '17' },
      { value: 'Biryani', label: 'Biryani', trigger: '18' },
      { value: 'Main Course', label: 'Main Course', trigger: '19' },
      { value: 'Indo Chineese', label: 'Indo Chineese', trigger: '20' },
      { value: 'Beverages', label: 'Beverages', trigger: '26'}
    ],
  },
  {
    id: '16',
    message: 'Which Appetizers do you want to order?',
    trigger: '21',
  },
  {
    id: '21', 
    options: [
      { value: 'Chilli Chicken', label: 'Chilli Chicken', trigger: '8' },
      { value: 'Chicken 65', label: 'Chicken 65', trigger: '8' },
      { value: 'Apollo Fish', label: 'Apollo Fish', trigger: '8' },
      { value: 'Gobi Manchuria', label: 'Gobi Manchuria', trigger: '8' },
      { value: 'Chilli Paneer', label: 'Chilli Paneer', trigger: '8' },
    ],
  },
  {
    id: '17',
    message: 'Which Soup do you want to order?',
    trigger: '22',
  },
  {
    id: '22', 
    options: [
      { value: 'Tomato Soup', label: 'Tomato Soup', trigger: '8' },
      { value: 'Veg Corn Soup', label: 'Veg Corn Soup', trigger: '8' },
      { value: 'Chicken Corn Soup', label: 'Chicken Corn Soup', trigger: '8' },
    ],
  },
  {
    id: '18',
    message: 'Which Biryani do you want to order?',
    trigger: '23',
  },
  {
    id: '23', 
    options: [
      { value: 'Chicken Biryani', label: 'Chicken Biryani', trigger: '8' },
      { value: 'Lamb Biryani', label: 'Lamb Biryani', trigger: '8' },
      { value: 'Fish Biryani', label: 'Fish Biryani', trigger: '8' },
      { value: 'Goat Biryani', label: 'Goat Biryani', trigger: '8' },
      { value: 'Vegetable Dum Biryani', label: 'Vegetable Dum Biryani', trigger: '8' },
    ],
  },
  {
    id: '19',
    message: 'Which Main Course do you want to order?',
    trigger: '24',
  },
  {
    id: '24', 
    options: [
      { value: 'Kadai Chicken', label: 'Kadai Chicken', trigger: '8' },
      { value: 'Butter Chicken', label: 'Butter Chicken', trigger: '8' },
      { value: 'Egg Masala', label: 'Egg Masala', trigger: '8' },
      { value: 'Goat Curry', label: 'Goat Curry', trigger: '8' },
      { value: 'Shrimp Masala', label: 'Shrimp Masala', trigger: '8' },
      { value: 'Palak Paneer', label: 'Palak Paneer', trigger: '8' },
      { value: 'Mixed Veg Masala', label: 'Mixed Veg Masala', trigger: '8' },
    ],
  },
  {
    id: '20',
    message: 'Which Indo Chineese dish do you want to order?',
    trigger: '25',
  },
  {
    id: '25', 
    options: [
      { value: 'Fried Rice', label: 'Fried Rice', trigger: '8' },
      { value: 'Hakka Noodles', label: 'Hakka Noodles', trigger: '8' },
      { value: 'Chicken Manchuria', label: 'Chicken Manchuria', trigger: '8' },
    ],
  },
  {
    id: '26',
    message: 'Which Beverage do you want to order?',
    trigger: '27',
  },
  {
    id: '27', 
    options: [
      { value: 'Tea', label: 'Tea', trigger: '8' },
      { value: 'Coffee', label: 'Coffee', trigger: '8' },
      { value: 'Butter Milk', label: 'Butter Milk', trigger: '8' },
      { value: 'Mango Shake', label: 'Mango Shake', trigger: '8' },
    ],
  },
   {
    id: '4',
    message: 'May I know your email?',
    trigger: '5',
  },
  {
    id: '5',
    user: true,
    metadata: {
      email: 'email',
      value: '{{{raw}}}'
    },
    trigger: '6',
    validator: (value: any) =>{
      if(validator.validate(value)){
        return true
      }else{
        return false
      }
    }
  },
  {
    id: '6',
    message: 'Would you like to order your previous-order?',
    trigger: '7',
  },
  {
    id: '7',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '8' },
      { value: 'No', label: 'No', trigger: '14' },
    ],
  },
  {
    id: '8',
    message: 'Are you sure? Do you want to order?',
    trigger: '10',
  },
  {
    id: '10',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '11' },
      { value: 'No', label: 'No', trigger: '14' },
    ],
  },
  {
    id: '11',
    message: 'Your order is added to cart. Please proceed for the payment',
    end:true,
  },
];