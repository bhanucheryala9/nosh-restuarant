import React from "react";
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

function App() {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <AppLayout>
            <Loader>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/add-inventory" element={<Inventory />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/sales" element={<SalesDashboard />} />
                <Route path="/resetPassword" element={<ForgotPassword />} />
              </Routes>
            </Loader>
          </AppLayout>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;
