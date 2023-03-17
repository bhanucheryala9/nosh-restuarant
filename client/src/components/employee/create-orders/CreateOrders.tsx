import {
    Button,
    Divider,
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
    VStack,
    Textarea,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { Orders_Catergory, cartData } from "../../common/utils";
  import _ from "lodash";
  import axios from "axios";
  import { Empty } from "antd";
  import { useNavigate } from "react-router-dom";

const CreateOrders = () => {
    const [ecart, setECart] = useState(cartData);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [orders, setOrders] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [amount, setAmount] = useState({
      total: 0,
      tax: 0,
    });
    const navigate = useNavigate();

    return(
    <Flex direction={"column"} mx="6" my="6">
      <Flex justifyContent={"space-between"} mb="3">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          Create Order
        </Text>
        <Button colorScheme="orange" onClick={onPayClicked}>
          Proceed to pay
        </Button>
        </Flex>
        <Grid
        
      >

      
       <GridItem>
        <Tabs>
            <TabList>
            </TabList>
        <TabPanels>
        {Orders_Catergory.map((item, index) => {
            return(
            <TabPanel>
                <Grid>

                </Grid>
            </TabPanel>
            );
              
              })};
        </TabPanels>
          
        ></GridItem>
        </Grid>
    </Flex>


    );

};