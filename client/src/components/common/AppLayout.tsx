import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

interface AppLayoutProp {
  children?: ReactNode;
}
const AppLayout = (props: AppLayoutProp) => {
  const { children } = props;
  return (
    <React.Fragment>
      <Header />
      <Box minH={"85vh"}>{children}</Box> 
      <Footer />
    </React.Fragment>
  );
};

export default AppLayout;
