import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import "./App.css";
import LoginPage from "./components/login-singup/LoginPage";
import SignUp from "./components/login-singup/Signup";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Loader from "./components/common/Loader";
import ForgotPassword from "./components/login-singup/ForgotPassword";
import Employee from "./components/admin/employee/Employee";
import Inventory from "./components/admin/inventory/AddInventory";
import Rewards from "./components/admin/rewards/Rewards";
import SalesDashboard from "./components/admin/sales/SalesDashboard";
import AppLayout from "./components/common/AppLayout";
import Orders from "./components/customer/orders/Orders";
import Cart from "./components/customer/cart/Cart";
import CartProvider from "./contexts/CartContext";
import PurchaseHistory from "./components/customer/purchase-history/PurchaseHistory";
import Payments from "./components/customer/payments/Payments";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import NotificationProvider from "./contexts/Notification";
interface CartContextProp {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}

function App() {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
            {/* <Loader> */}
            <AppLayout>
              {/* <ErrorBoundary> */}
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/add-inventory" element={<Inventory />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/sales" element={<SalesDashboard />} />
                <Route path="/purchase-history" element={<PurchaseHistory />} />
                <Route path="/payment" element={<Payments />} />
                <Route path="/resetPassword" element={<ForgotPassword />} />
              </Routes>
              {/* </ErrorBoundary> */}
            </AppLayout>
            {/* </Loader> */}
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
