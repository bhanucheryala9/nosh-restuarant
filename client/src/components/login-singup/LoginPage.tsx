import "./login.css";
import { Button, Divider, Form, Input, Typography } from "antd";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AlertMessageProps, AlertStatus } from "../common/utils";
import lgn from "../../assets/loginPage.jpg";

const LoginPage = () => {
  const { Title, Text } = Typography;
  const { loginIn } = useAuth();
  const [form] = Form.useForm();
  const [showAlert, setShowAlert] = useState<AlertMessageProps>({
    status: AlertStatus.SUCCESS,
    alertMessage: "loading",
    showAlert: false,
  });
  const navigate = useNavigate();

  const onSubmitClicked = (values: any) => {
    const email = values.email;
    const pwd = values.password;
    try {
      loginIn(email, pwd)
        .then(() => {
          setShowAlert({
            status: AlertStatus.SUCCESS,
            alertMessage: "Successfully logged in..!",
            showAlert: true,
          });
          navigate("/dashboard");
        })
        .catch(() => {
          setShowAlert({
            status: AlertStatus.ERROR,
            alertMessage: "Failed to login user",
            showAlert: true,
          });
        });
    } catch {
      setShowAlert({
        status: AlertStatus.ERROR,
        alertMessage: "Failed to login user",
        showAlert: true,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={lgn} alt="Login" className="rounded-lg" />
        </div>
        <Form name="login-form" onFinish={onSubmitClicked} layout="vertical">
           <Form.Item className="flex justify-center">
           <div className="form-title font-bold text-4xl text-orange-500">
            Welcome to App{" "}
          </div>
           </Form.Item>
        
          <Divider plain className="border-gray-700">
            <div className="text-md font-semibold">Sign In</div>
          </Divider>
          <Form.Item
            name="email"
            label="Email"
            className="font-semibold text-gray-800"
            rules={[
              { required: true, message: "Please enter your email" },
              {
                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "please enter valid email",
              },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
          <Form.Item
            className="font-semibold"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Link to={"/resetPassword"} className="text-black hover:text-orange-600 !mb-2"> Forgot password? </Link>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="login-form-button bg-orange-500 hover:bg-orange-600 outline-none text-white font-semibold shadow-md"
            >
              LOGIN
            </Button>
          </Form.Item>
          <Form.Item className="flex justify-center">
            <p style={{ cursor: "pointer" }}>
              don't have an account? <Link to={"/signup"} className="text-orange-600 hover:text-orange-600 hover:font-semibold"> Sign Up </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
