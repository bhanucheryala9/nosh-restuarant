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

  };




  return (
    <div>
      <Flex direction={"column"}>
        <Flex
          justifyContent={"center"}
          direction="column"
          alignItems={"center"}
        >
          <Image src={order} filter="auto" brightness={"50%"} />
          <Flex>
            <Text
            >
              Order Section
            </Text>
          </Flex>
        </Flex>
        <Tabs

            );
          }}
        >
          <TabList>
          </TabList>
          <TabPanels my="8" rounded={"lg"} shadow="base">
              return (
                <TabPanel bg={"white"} key={index}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text>
                      Menu
                    </Text>
             
                  </Flex>

                  <Grid>
                 
                          return (
                            <GridItem >
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
     
      </Flex>
    </div>
  );
};

export default Orders;