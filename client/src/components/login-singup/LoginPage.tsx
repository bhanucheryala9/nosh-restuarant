import "./login.css";
import { Button, Divider, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  AlertMessageProps,
  AlertStatus,
  NotificationStatus,
  steps_for_chat,
} from "../common/utils";
import lgn from "../../assets/loginPage.jpg";
import botAvatar from "../../assets/nosh.jpg";
import { useNotification } from "../../contexts/Notification";
import axios from "axios";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider as TPC } from "styled-components";

const theme = {
  background: "white",
  headerBgColor: "#ed872d",
  headerFontSize: "20px",
  botBubbleColor: "#F5F5F5",
  headerFontColor: "white",
  botFontColor: "black",
  userBubbleColor: "#ed872d",
  userFontColor: "white",
  headerImage: "none",
};
const config = {
  floating: true,
};

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
  const [conversationHistory, setConversationHistory] = useState([]);
  const [orders, setOrders] = useState([]);

  const getOrderDetails = async (email: string) => {
    await axios
      .get("http://localhost:5000/api/customer/v1/get-purchase-history", {
        params: {
          id: email,
        },
      })
      .then((response) => {
        localStorage.setItem(
          "orders",
          JSON.stringify(response.data.orders[0].orderDetails)
        );
        axios
          .get("http://localhost:5000/api/admin/v1/get-user-details", {
            params: {
              id: email,
            },
          })
          .then((response) => {
            localStorage.setItem(
              "userInfo",
              JSON.stringify(response.data.userInfo[0])
            );

            navigate("/payment");
          });
      })
      .catch((error) => {
        console.log("Error while retreiveing items: ", error);
      });
  };

  const formatterChat = (data: any) => {
    const userChat = data?.filter((item: any) => item.type === "user");
    const chartinformation = (userChat[0] as any)?.data?.filter(
      (item: string) => item !== "Yes" && item !== "Appetizers"
    );

    const isExisistingUser = userChat[0]?.data[0] === "No";
    const email = userChat[0]?.data[1];
    const previousOrder = userChat[0]?.data[2] === "Yes";
    if (isExisistingUser && previousOrder) {
      getOrderDetails(email);
    } else {
      const cart: any = [];
      for (let i = 1; i < chartinformation.length; i++) {
        orders
          ?.filter((item: any) => item.productName === chartinformation[1])
          .map((food: any) => {
            cart.push({
              category: food.category,
              id: food.id,
              price: food.price,
              productName: food.productName,
              quantity: 1,
              url: food.url,
            });
          });
      }
      localStorage.setItem("orders", JSON.stringify(cart));
      navigate("/payment");
    }
  };

  const handleEnd = ({ steps, values }: any) => {
    if (!conversationHistory.length) {
      const newConversationHistory = [
        {
          type: "user",
          message: values.name,
          data: values,
        },
      ];
      steps.forEach((step: any) => {
        if (step.message) {
          newConversationHistory.push({
            type: "bot",
            message: step.message,
            data: step as any,
          });
        }
      });
      setConversationHistory(newConversationHistory as any);
      formatterChat(newConversationHistory);
    }
  };

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify({}));
    localStorage.setItem("orders", JSON.stringify([]));
    localStorage.setItem("isUserLoggedIn", "no");
    axios
      .get("http://localhost:5000/api/admin/v1/get-items")
      .then((response) => {
        setOrders(response.data.items);
      })
      .catch((error) => {
        console.log("Error while retreiveing items: ", error);
      });
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
              console.log(
                "**************** user info:",
                response.data.userInfo[0]
              );
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

      <TPC theme={theme}>
        <ChatBot
          headerTitle="Nosh-Bot"
          steps={steps_for_chat}
          {...config}
          botAvatar={botAvatar}
          headerAvatar={botAvatar}
          handleEnd={handleEnd}
        />
        {/* <div className="conversation-container">
          {conversationHistory.map((message: any, index) => {
            if (message.type === "user") {
              return (
                <div key={index} className="user-message">
                  <span>{message.message}</span>
                </div>
              );
            } else {
              return (
                <div key={index} className="bot-message">
                  <span>{message.message}</span>
                </div>
              );
            }
          })}
        </div> */}
      </TPC>
    </div>
  );
};

export default LoginPage;
