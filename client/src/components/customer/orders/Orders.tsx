import {
    Flex,
    Grid,
    GridItem,
    Image,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  import OrderItem from "./OrderItem";
  import order from "../../../assets/orders.jpg";
  import { Orders_Catergory } from "../../common/utils";
  import _ from "lodash";
  import ReactPaginate from "react-paginate";
  import axios from "axios";
  
  const Orders = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [seachfood, setSearchFood] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [data, setData] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const PER_PAGE = 10;
    const pageCount = Math.ceil(data.length / PER_PAGE);
  

return(
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
            px={{ base: "16", lg: "28" }}
            mt="-10"
            zIndex={10}
            shadow="base"
          >
            <Text
              fontSize={{ sm: "md", lg: "2xl" }}
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
          mt={{ base: "4", lg: "8" }}
          mx={{ base: "4", lg: "10" }}
          size={{ base: "sm", lg: "lg" }}
          onChange={(index) => {
            setSelectedCategory(Orders_Catergory[index]);
            const redata = itemsData.filter(
              (item: any) => item.category === Orders_Catergory[index]
            );
            setData(
              Orders_Catergory[index] === "all"
                ? itemsData.slice(0, 8)
                : redata.slice(0, 8)
            );
          }}
        >
            <TabList>
            {Orders_Catergory.map((item, index) => {
              return <Tab key={index}>{_.capitalize(item)}</Tab>;
            })}
            </TabList>
            <TabPanels my="8" rounded={"lg"} shadow="base">
            {Orders_Catergory.map((index, item) => {
              return (
                <TabPanel bg={"white"} key={index}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      fontSize={"2xl"}
                      fontWeight="semibold"
                      textColor={"orange.500"}
                      mx="4"
                      my="4"
                    >
                      Menu
                    </Text>
                    {/* <Input
                      type="text"
                      placeholder="search food"
                      width="48"
                      onChange={(e) => {
                        setSearchFood(e.target.value);
                      }}
                    /> */}
                  </Flex>

          </TabPanel>
              );
            })}
        </TabPanels>
        </Tabs>




       
        
        </Flex>
    </div>

);  
};