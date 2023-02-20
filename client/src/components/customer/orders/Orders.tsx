import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import OrdersBanner from "../../../assets/orders.jpg";
import Cart from "../cart/Cart";
import OrderItem from "./OrderItem";
import order from "../../../assets/orders.jpg";

const Orders = () => {
  return (
    <div>
      <Flex direction={"column"}>
        <Flex justifyContent={"center"} direction="column" alignItems={"center"}>
          <Image src={order} filter="auto" brightness={"50%"} />
          <Flex bg={"white"} rounded="lg" py="4" px="28" mt="-10" zIndex={10} shadow="base">
            <Text fontSize={"2xl"} fontWeight="semibold"  fontFamily={"'Nunito', sans-serif"}>
              Order Section
            </Text>
          </Flex>
        </Flex>
        <Tabs variant="soft-rounded" colorScheme="orange" mt="8" mx="10">
          <TabList>
            <Tab>All</Tab>
            <Tab>Staters</Tab>
            <Tab>Main Course</Tab>
            <Tab>Deserts</Tab>
          </TabList>
          <TabPanels mt="8" rounded={"lg"} shadow="base">
            <TabPanel bg={"white"}>
              <Text
                fontSize={"2xl"}
                fontWeight="semibold"
                textColor={"orange.500"}
                mx="4"
                my="4"
              >
                Menu
              </Text>
              <Grid
                mt="4"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={8}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                  return (
                    <GridItem
                      colSpan={1}
                      rowSpan={1}
                      display="flex"
                      alignItems={"center"}
                      justifyContent="end"
                    >
                      <OrderItem />
                    </GridItem>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex mt="4"></Flex>
      </Flex>
    </div>
  );
};

export default Orders;
