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
import React, { useState, useEffect } from "react";
import OrdersBanner from "../../../assets/orders.jpg";
import Cart from "../cart/Cart";
import OrderItem from "./OrderItem";
import order from "../../../assets/orders.jpg";
import { Orders_Catergory } from "../../common/utils";
import _ from "lodash";
import ReactPaginate from "react-paginate";
import { orders_items } from "../../../test-data/customer/orders";
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [data, setData] = useState(orders_items);
  const PER_PAGE = 10;
  const pageCount = Math.ceil(data.length / PER_PAGE);

  const handlePageClick = (selected: any) => {
    const offset = currentPage * PER_PAGE;
    const currentPageData = data.slice(offset, offset + PER_PAGE);
    setData(currentPageData);
    setCurrentPage(selected);
  };

  useEffect(() => {
    setData(orders_items.slice(0, 8));
  }, []);

  return (
    <div>
      <Flex direction={"column"}>
        <Flex
          justifyContent={"center"}
          direction="column"
          alignItems={"center"}
        >
          <Image src={order} filter="auto" brightness={"50%"} />
          <Flex
            bg={"white"}
            rounded="lg"
            py="4"
            px={{base:"16",lg:"28"}}
            mt="-10"
            zIndex={10}
            shadow="base"
          >
            <Text
              fontSize={{sm:"md",lg:"2xl"}}
              fontWeight="semibold"
              fontFamily={"'Nunito', sans-serif"}
            >
              Order Section
            </Text>
          </Flex>
        </Flex>
        <Tabs
          variant="soft-rounded"
          colorScheme="orange"
          mt={{base:"4",lg:"8"}}
          mx={{base:"4",lg:"10"}}
          size={{base:"sm", lg:"lg"}}
          onChange={(index) => {
            setSelectedCategory(Orders_Catergory[index]);
            const redata = orders_items.filter(
              (item) => item.category === Orders_Catergory[index]
            );
            setData(
              Orders_Catergory[index] === "all" ? orders_items.slice(0, 8) : redata.slice(0, 8)
            );
          }}
        >
          <TabList>
            {Orders_Catergory.map((item) => {
              return <Tab>{_.capitalize(item)}</Tab>;
            })}
          </TabList>
          <TabPanels my="8" rounded={"lg"} shadow="base">
            {Orders_Catergory.map((item) => {
              return (
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
                    templateRows={{base:"repeat(8, 1fr)",lg:"repeat(2, 1fr)"}}
                    templateColumns={{base:"repeat(1, 1fr)",lg:"repeat(4, 1fr)"}}
                    gap={{base:3,lg:8}}
                  >
                    {data.map((orders, index) => {
                      return (
                        <GridItem
                          colSpan={1}
                          rowSpan={1}
                          display="flex"
                          alignItems={"center"}
                          justifyContent="end"
                        >
                          <OrderItem {...(orders as any)} />
                        </GridItem>
                      );
                    })}
                  </Grid>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
        {/* <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        /> */}
      </Flex>
    </div>
  );
};

export default Orders;