import "./login.css";
import { Button, Divider, Form, Input } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import AlertMessage from "../common/AlertMessage";
import { useState } from "react";
import { AlertMessageProps, AlertStatus, NotificationStatus } from "../common/utils";
import { Link, useNavigate } from "react-router-dom";
import lgn from "../../assets/loginPage.jpg";
import { useNotification } from "../../contexts/Notification";

interface UserInformation {
  email: string;
  password: string;
}

const SignUp = () => {
  const { signUp } = useAuth();
  const [form] = Form.useForm();
  const [showAlert, setShowAlert] = useState<AlertMessageProps>({
    status: AlertStatus.SUCCESS,
    alertMessage: "loading",
    showAlert: false,
  });

  const navigate = useNavigate();
  const { setShowNotification } = useNotification();

  const isPasswordMatched = (values: any) => {
    if (values.password === values.conformPasswords) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmitClicked = (values: any) => {
    if (isPasswordMatched(values)) {
      const email = values.email;
      const pwd = values.password;
      try {
        signUp(email, pwd)
          .then(() => {
            setShowNotification({
              status: NotificationStatus.SUCCESS,
              alertMessage: "User account successfully created..!",
              showAlert: true,
            });
            navigate("/");
          })
          .catch(() => {
            setShowNotification({
              status: NotificationStatus.SUCCESS,
              alertMessage: "Failed to create user account..!",
              showAlert: true,
            });
          });
      } catch {
        setShowNotification({
          status: NotificationStatus.SUCCESS,
          alertMessage: "Failed to create user account..!",
          showAlert: true,
        });
      }
    } else {
      setShowAlert({
        status: AlertStatus.ERROR,
        alertMessage: "Password doesn't mached",
        showAlert: true,
      });
    }
  };
  return (
    <div className="login-page">
      <div className="login-box">
        <AlertMessage {...showAlert} />
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
            <div className="text-md font-semibold">Sign Up</div>
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
            <Input placeholder="Email your email." />
          </Form.Item>

          <Form.Item
            label="Password"
            className="font-semibold"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter Password" className="text-orange-600 focus:border-orange-700" />
          </Form.Item>

          <Form.Item
            className="font-semibold"
            label="Confirm Password"
            name="conformPasswords"
            rules={[
              { required: true, message: "Please conform your password!" },
            ]}
          >
            <Input.Password placeholder="Conform password" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="login-form-button bg-orange-500 hover:bg-orange-600 outline-none text-white font-semibold shadow-md"

            >
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item>
            <p className="flex justify-center cursor-pointer">
              Already have an account? <Link to={"/"} className="text-orange-600 hover:text-orange-600 hover:font-semibold ml-1"> Login In</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
