import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const Dashboard = () => {
  
  return (
    <Flex direction="column" justifyContent={"space-between"} >
      <Header />
      <Box minH={"87vh"}>
        
      </Box>
      <Footer/>
    </Flex>
  );
};
export default Dashboard;
