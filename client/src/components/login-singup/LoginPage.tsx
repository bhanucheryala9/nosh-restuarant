import "./login.css";
import { Button, Divider, Form, Input, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  AlertMessageProps,
  AlertStatus,
  NotificationStatus,
} from "../common/utils";
import lgn from "../../assets/loginPage.jpg";
import Header from "../header/Header";
import { useNotification } from "../../contexts/Notification";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import Chatbot from 'react-best-chatbot';
import { AiOutlineClose, AiOutlineReload, AiOutlineSend } from "react-icons/ai";

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
  const { setShowNotification } = useNotification();
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "31e86c3017597b6413fbbe3cf554d500e",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
  }, []);


  const getErroMessage = (message: string) => {
    if (message === "wrong-password") {
      return "Incorrect password..!";
    } else if (message === "user-not-found") {
      return "User doesn't exsists..!";
    } else {
      return "Failed to login the user..!";
    }
  };

  const onSubmitClicked = (values: any) => {
    const email = values.email;
    const pwd = values.password;
    try {
      loginIn(email, pwd)
        .then((res: any) => {
          // setShowNotification({
          //   status: NotificationStatus.SUCCESS,
          //   alertMessage: "User successfully logged in..!",
          //   showAlert: true,
          // });
          axios
            .get("http://localhost:5000/api/admin/v1/get-user-details", {
              params: {
                id: email,
              },
            })
            .then((response) => {
              localStorage.setItem("isUserLoggedIn", "yes");
              console.log("**************** user info:" ,response.data.userInfo[0])
              localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.userInfo[0])
              );
              navigate("/dashboard");
            })
            .catch((error) => {
              setShowNotification({
                status: NotificationStatus.ERROR,
                alertMessage: getErroMessage(
                  (error.code as string)?.split("/")[1]
                ),
                showAlert: true,
              });
            });
        })
        .catch((error: any) => {
          setShowNotification({
            status: NotificationStatus.ERROR,
            alertMessage: getErroMessage((error.code as string)?.split("/")[1]),
            showAlert: true,
          });
        });
    } catch {
      setShowAlert({
        status: AlertStatus.ERROR,
        alertMessage: "Failed to login the user..!",
        showAlert: true,
      });
    }
  };

  const steps = [
    {
      id: 1,
      content: "Hello, human!",
      goTo: 2
    }, 
    {
      id: 2,
      content: "See ya...",
      end: true
    }
  ];

  const options = {
    header: "Tutorial Bot",
    endContent: "See ya 👋",
    botAvatarSrc: "/img/bot.png",
    hidden: false,
    messageDelay: 1000,
    open: true,
    sendComponentFunction: (disabled: any) => (
      <AiOutlineSend style={{ color: disabled ? "#DDDDDD" : "" }} />
    ),
    refreshComponent: <AiOutlineReload fontSize={18} color="#7b68ee" />,
    closeComponent: <AiOutlineClose />,
    chatButtonComponent: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#333333",
          color: "#FFFFFF",
          borderRadius: "50%",
          height: 50,
          width: 50,
          cursor: "pointer"
        }}
      >
        <AiOutlineReload />
      </div>
    ),
    loadingComponent: <AiOutlineReload size={16} 
      style={{ color: "#7b68ee" }} />,
    openingCallback: () => console.log("Opening..."),
    // sendingMessageCallback: (_answers) => console.log("Sending message..."),
    // endingCallback: (answers, toggleOpen, refresh) => console.log("Ending..."),
    closingCallback: () => console.log("Closing..."),
  };

  return (
    <div className="login-page">
      {/* <Header /> */}
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
            <Link
              to={"/resetPassword"}
              className="text-black hover:text-orange-600 !mb-2"
            >
              {" "}
              Forgot password?{" "}
            </Link>
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
              don't have an account?{" "}
              <Link
                to={"/signup"}
                className="text-orange-600 hover:text-orange-600 hover:font-semibold"
              >
                {" "}
                Sign Up{" "}
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>

      {/* <Chatbot steps={steps}  options={options}/> */}

    </div>
  );
};

export default LoginPage;
