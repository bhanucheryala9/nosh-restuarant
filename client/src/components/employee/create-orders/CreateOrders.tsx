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
 const [orders, setOrders] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [amount, setAmount] = useState({
    total: 0,
    tax: 0,
  });

  const navigate = useNavigate();

  const handleCart = (data: any, operation: string) => {
    const updatedData = orders?.map((item: any) => {
      if (operation === "add") {
        if (item.productName === data.productName) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      } else {
        if (item.productName === data.productName) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          return item;
        }
      }
    });
    const amount = updatedData?.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);

    setOrders(updatedData as any);
    setAmount({
      total: amount,
      tax: Number((amount / 8).toFixed(2)),
    });
  };

  const prepareData = (payload: any) => {
    const data1 = payload.map((item: any) => {
      return { ...item, quantity: 0 };
    });
    return data1;
  };

  useEffect(() => {
    axios
      .get("http://34.235.166.147:5000/api/admin/v1/get-items")
      .then((response) => {
        setOrders(prepareData(response.data.items));
        setItemsData(prepareData(response.data.items))
      })
      .catch((error) => {
        console.log("Error while retreiveing items: ", error);
      });
  }, []);

  const orderItem = (item: any) => {
    return (
      <>
        <Flex
          bg="gray.100"
          borderRadius={"2xl"}
          direction={"column"}
          maxW={"300px"}
        >
          <Image
            src={item.url}
            width={"300px"}
            height={"200px"}
            borderRadius={"xl"}
          />
          <Flex mt="2" mb="3" mx="4" direction={"column"}>
            <Text  fontWeight={"semibold"} my="2">
              {_.capitalize(item.productName)}
            </Text>
            <Text  fontWeight={"semibold"} mt="-1" mb="2">
              {_.capitalize(item.description.slice(0, 35)) + "...."}
            </Text>

            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text  fontWeight={"bold"}>
                ${item.price}
              </Text>
              {item.quantity === 0 ? (
                <Button
                  colorScheme="orange"
                  rounded={"full"}
                  borderRadius={"full"}
                  size={"md"}
                  onClick={() => handleCart(item, "add")}
                >
                  order
                </Button>
              ) : (
                <HStack>
                  <Button
                    colorScheme="orange"
                    rounded={"full"}
                    size={"sm"}
                    onClick={() => handleCart(item, "minus")}
                  >
                    -
                  </Button>
                  <Text  fontWeight={"semibold"}>
                    {item.quantity}
                  </Text>
                  <Button
                    colorScheme="orange"
                    rounded={"full"}
                    size={"sm"}
                    onClick={() => handleCart(item, "add")}
                  >
                    +
                  </Button>
                </HStack>
              )}
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  };

  const onPayClicked = () => {
    const payload = ((orders as any) || [])
      .filter((item: any) => item.quantity !== 0)
      .map((food: any) => {
        return {
          category: food.category,
          id: food.id,
          price: food.price,
          productName: food.productName,
          quantity: food.quantity,
          url: food.url,
        };
      });

    localStorage.setItem("orders", JSON.stringify(payload));
    navigate("/payment");
  };

  return (
    <Flex direction={"column"} mx="6" my="6">
      <Flex justifyContent={"space-between"} mb="3">
        <Text  fontWeight={"semibold"}>
          Create Order
        </Text>
        <Button colorScheme="orange" onClick={onPayClicked}>
          Proceed to pay
        </Button>
      </Flex>

      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={1}
          colSpan={3}
          bg="white"
          rounded={"md"}
          shadow={"base"}
          p="4"
        >
          <Tabs
            colorScheme="orange"
            mb="4"
            onChange={(index) => {
              setSelectedCategory(Orders_Catergory[index]);
              const redata = itemsData.filter(
                (item: any) => item.category === Orders_Catergory[index]
              );
              setOrders(
                Orders_Catergory[index] === "all"
                  ? itemsData.slice(0, 8)
                  : redata.slice(0, 8)
              );
            }}
          >
            <TabList mb="4">
              {Orders_Catergory.map((item, index) => {
                return <Tab key={index}>{_.capitalize(item)}</Tab>;
              })}
            </TabList>

            <TabPanels>

                return (
                  <TabPanel>
                    <Grid
                      templateRows="repeat(2, 1fr)"
                      templateColumns="repeat(4, 1fr)"
                      gap={6}
                      width={"100%"}
                    >
                      {orders?.map((item) => {
                        return (
                          <GridItem rowSpan={1} colSpan={1}>
                            {orderItem(item)}
                          </GridItem>
                        );
                      })}
                    </Grid>
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg="white"
          p="4"
          borderRadius={"md"}
          shadow={"base"}
          justifyContent="center"
        >
          <Text
            
            fontWeight={"semibold"}
            textColor={"orange.500"}
            mb="4"
          >
            Find your cart here
          </Text>
          <Flex justifyContent="center" direction="column" alignItems="center">
            {orders.filter((item: any) => item.quantity !== 0).length !== 0 ? (
              <Flex direction="column" width="100%">
                {orders
                  ?.filter((item: any) => item.quantity !== 0)
                  ?.map((data: any) => {
                    return (
                      <Flex
                        bg="gray.100"
                        py="3"
                        px="4"
                        direction={"column"}
                        borderRadius={"lg"}
                        mt="3"
                        w="100%"
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Flex>
                            <Image
                              src={data.url}
                              width={"80px"}
                              height={"80px"}
                              borderRadius={"lg"}
                            />
                            <Flex direction={"column"} ml="6">
                              <Text
                                
                                fontWeight={"semibold"}
                                my="2"
                              >
                                {_.capitalize(data.productName)}
                              </Text>
                              <Text>Quantity: {data.quantity}</Text>
                            </Flex>
                          </Flex>
                          <Flex>
                            <Text
                              textColor="orange.500"
                              fontWeight="semibold"
                                                         >
                              ${(data.quantity * data.price).toFixed(2)}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    );
                  })}
                <Divider mt="6" />
                <Text my="3">Specify your customization</Text>
                <Textarea />
                <Divider mt="6" />
                <VStack mt="3" width="100%" px="3">
                  <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="semibold">Tax</Text>
                    <Text>${amount.tax}</Text>
                  </Flex>
                  <Flex justifyContent="space-between" width="100%">
                    <Text fontWeight="semibold">Sub Total</Text>
                    <Text>${amount.total}</Text>
                  </Flex>
                </VStack>
                <Divider mt="3" />
                <Flex justifyContent="space-between" width="100%" px="3">
                  <Text fontWeight="semibold">Total</Text>
                  <Text>${amount.total + amount.tax}</Text>
                </Flex>
              </Flex>
            ) : (
              <Flex mt="16">
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{ height: 100 }}
                  description="No Cart Data..."
                />
              </Flex>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default CreateOrders;
