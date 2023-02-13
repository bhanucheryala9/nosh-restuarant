import {
  Flex,
  Grid,
  Image,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import order from "../../../assets/orders.jpg";
import { Orders_Catergory } from "../../common/utils";
import _ from "lodash";
import axios from "axios";

const Orders = () => {


  useEffect(() => {
    setData(data.slice(0, 8));
    axios
      .get("http://localhost:5000/api/admin/v1/get-items")
      .then((response) => {
        setData(response.data.items);
        setItemsData(response.data.items);
        localStorage.setItem("orders",JSON.stringify([]))
      })
      .catch((error) => {
        console.log("Error while retreiveing items: ", error);
      });
  }, []);


  return (
    <div>
      <Flex direction={"column"}>
        <Flex>
          <Image />
          <Flex>
            <Text>
              Order Section
            </Text>
          </Flex>
        </Flex>
        <Tabs>
          <TabList>
          </TabList>
          <TabPanels >
            {Orders_Catergory.map((index, item) => {
              return (
                <TabPanel >
                  <Flex >
                    <Text>
                      Menu
                    </Text>
              
                  </Flex>

                  <Grid
                
                 
                  </Grid>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      
      </Flex>
    </div>
  );
};

export default Orders;