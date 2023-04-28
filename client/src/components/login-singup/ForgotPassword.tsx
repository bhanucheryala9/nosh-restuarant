import "./login.css";
import { Button, Checkbox, Form, Input } from "antd";
import { FC, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AlertMessageProps, AlertStatus } from "../common/utils";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [form] = Form.useForm();
  const [showAlert, setShowAlert] = useState<AlertMessageProps>({
    status: AlertStatus.SUCCESS,
    alertMessage: "loading",
    showAlert: false,
  });
  const navigate = useNavigate();

  const onSubmitClicked = (values: any) => {
    const email = values.email;
    try {
      resetPassword(email)
        .then(() => {
          setShowAlert({
            status: AlertStatus.SUCCESS,
            alertMessage: "Successfully logged in..!",
            showAlert: true,
          });
          navigate("/");
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
          <img src={"../assets/login.jpg"} alt="Login" />
        </div>
        <Form name="login-form" onFinish={onSubmitClicked}>
          <p className="form-title">Welcome to App </p>
          <p>Reset Password </p>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              {
                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "please enter valid email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Reset Password
            </Button>
          </Form.Item>
          <Form.Item>
            <p style={{ cursor: "pointer" }}>
              don't have an account? <Link to={"/signup"}> Sign Up </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
