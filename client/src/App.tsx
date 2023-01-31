import React from 'react';
import './App.css';
import LoginPage from "./components/login-singup/LoginPage";
import SignUp from "./components/login-singup/Signup";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Loader from "./components/common/Loader";
import ForgotPassword from "./components/login-singup/ForgotPassword";
import Employee from './components/admin/employee/Employee';
import Inventory from './components/admin/inventory/Inventory';

function App() {
  return (
    <React.StrictMode>
          <Router>
            <AuthProvider>
              <Loader>
                <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/add-inventory" element={<Inventory />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/resetPassword" element={<ForgotPassword />} />
                </Routes>
              </Loader>
            </AuthProvider>
          </Router>
      </React.StrictMode>
  );
}

export default App;
