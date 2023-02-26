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
        
        </Flex>
    </div>

);  
};