import { Box } from "@chakra-ui/react";
<<<<<<< HEAD
import React, { ReactNode, useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import Cart from "../customer/cart/Cart";
import Footer from "../footer/Footer";
import Header from "../header/Header";
=======
import React, { ReactNode } from "react";
import Cart from "../customer/cart/Cart";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Loader from "./Loader";
>>>>>>> repo-b/main

interface AppLayoutProp {
  children?: ReactNode;
}
const AppLayout = (props: AppLayoutProp) => {
  const { children } = props;
<<<<<<< HEAD
  const { setUserData, setUserLoggedIn } = useUser();
  const [showHeader, setShowHeader] = useState<boolean>(false);

  useEffect(() => {
    const userInfo = JSON.parse(
      localStorage?.getItem("userInfo") || ("{}" as string)
    );
    const isLoggedIn =
      (localStorage.getItem("isUserLoggedIn") || ("" as string)) === "yes"
        ? true
        : false;
    setShowHeader(isLoggedIn);
    setUserData(userInfo);
    setUserLoggedIn(isLoggedIn);
  }, []);

  const reload = () => {
    setShowHeader(showHeader);
  };

  return (
    <React.Fragment>
       <Header />
      {/* <Header /> */}
      <Box minH={"85vh"}>{children}</Box>
      {<>{reload}</>}
      {showHeader ? <Footer /> : null}
      <Cart />
=======
  return (
    <React.Fragment>
      {/* <Loader> */}
        <Header />
        <Box minH={"85vh"}>{children}</Box>
        <Footer />
        <Cart />
      {/* </Loader> */}
>>>>>>> repo-b/main
    </React.Fragment>
  );
};

export default AppLayout;
