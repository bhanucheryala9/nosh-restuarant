import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import "./App.css";
import LoginPage from "./components/login-singup/LoginPage";
import SignUp from "./components/login-singup/Signup";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/login-singup/ForgotPassword";
import Employee from "./components/admin/employee/Employee";
import AddInventory from "./components/admin/inventory/AddInventory";
import Rewards from "./components/admin/rewards/Rewards";
import SalesDashboard from "./components/admin/sales/SalesDashboard";
import AppLayout from "./components/common/AppLayout";
import Orders from "./components/customer/orders/Orders";
import CartProvider from "./contexts/CartContext";
import PurchaseHistory from "./components/customer/purchase-history/PurchaseHistory";
import Payments from "./components/customer/payments/Payments";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import NotificationProvider from "./contexts/Notification";
import Inventory from "./components/admin/inventory/Inventory";
import Test from "./components/Test";
import UserProvider, { useUser } from "./contexts/UserContext";
import AppStoreProvider from "./contexts/AppStoreContext";
import Tour from "./components/customer/tour/Tour";
import EOrders from "./components/employee/orders/EOrders";
import EInventory from "./components/employee/Inventory/EInventory";
import Profile from "./components/common/Profile";
import CreateOrders from "./components/employee/create-orders/CreateOrders";
import EmployeeDashboard from "./components/employee/dashboard/EmployeeDashboard";

interface CartContextProp {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}

function App() {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <AppStoreProvider>
            <UserProvider>
              <CartProvider>
                <NotificationProvider>
                  {/* <Loader> */}
                  <AppLayout>
                    {/* <ErrorBoundary> */}
                    <Routes>
                      //inventory
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/dashboard" element={<EmployeeDashboard />} />
                      <Route path="/test" element={<Test />} />
                      <Route path="/employee" element={<Employee />} />
                      <Route path="/rewards" element={<Rewards />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/add-inventory" element={<AddInventory />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/sales" element={<SalesDashboard />} />
                      <Route path="/employee-orders" element={<EOrders />} />
                      <Route
                        path="/employee-update-orders"
                        element={<EInventory />}
                      />
                      <Route path="/tour" element={<Tour />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/create-order" element={<CreateOrders />} />
                      <Route
                        path="/purchase-history"
                        element={<PurchaseHistory />}
                      />
                      <Route path="/payment" element={<Payments />} />
                      <Route
                        path="/resetPassword"
                        element={<ForgotPassword />}
                      />
                    </Routes>
                    {/* </ErrorBoundary> */}
                  </AppLayout>
                  {/* </Loader> */}
                </NotificationProvider>
              </CartProvider>
            </UserProvider>
          </AppStoreProvider>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
