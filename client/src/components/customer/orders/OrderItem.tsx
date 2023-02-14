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
import OrderItem from "./OrderItem";
import order from "../../../assets/orders.jpg";

const Orders = () => {
  return (
    <div>
      <Flex >
        <Flex justifyContent={"center"} direction="column" alignItems={"center"}>
          <Image src={order} filter="auto" brightness={"50%"} />
          <Flex bg={"white"} rounded="lg"  shadow="base">
            <Text  fontWeight="semibold"  fontFamily={"'Nunito', sans-serif"}>
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
                textColor={"orange.500"}
              >
                Menu
              </Text>
              <Grid
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