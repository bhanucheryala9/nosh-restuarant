import { Box } from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import Cart from "../customer/cart/Cart";
import Footer from "../footer/Footer";
import Header from "../header/Header";

interface AppLayoutProp {
  children?: ReactNode;
}
const AppLayout = (props: AppLayoutProp) => {
  const { children } = props;
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
    </React.Fragment>
  );
};

export default AppLayout;
