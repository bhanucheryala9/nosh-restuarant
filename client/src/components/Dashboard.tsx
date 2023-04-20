import {
  Flex,
  HStack,
  Text,
  Image,
  Divider,
  Button,
  Grid,
  GridItem,
  VStack,
  Icon,
} from "@chakra-ui/react";
import "./dashboard.css";
import Loader from "./common/Loader";
import { useCallback, useEffect, useState } from "react";
import biryani from "../assets/biryani.jpg";
import banner from "../assets/banner.jpg";
import banner2 from "../assets/banner-2.jpg";

import usersFood from "../test-data/customer/user-specific.json";
import { ArrowRightIcon } from "@chakra-ui/icons";
import _, { upperCase } from "lodash";
import axios from "axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCat, setSelectedCat] = useState(0);
  const [data, setData] = useState([]);
  const [dataforDashboard, setdataforDashboard] = useState([]);
  const [dashboardCart, setDashboardCart] = useState();
  const [presentdata, setPresentation] = useState([]);
  const [cart, setCart] = useState([]);

  const getCategoryIndexMapper = (index: number) => {
    if (index === 0) {
      return "budget";
    } else if (index === 1) {
      return "favorite";
    } else if (index === 3) {
      return "ready";
    } else if (index === 4) {
      return "trending";
    } else {
      return "recent";
    }
  };

  const createCart = useCallback(
    (datas: any) => {
      const items: any = [];
      Object.entries(datas || {})?.map((item: any) => {
        return item[1]
          ?.filter((order: any) => order.quantity !== 0)
          .map((food: any) => {
            items.push({
              category: food.category,
              id: food.id,
              price: food.price,
              productName: food.productName,
              quantity: food.quantity,
              url: food.url,
            });
          });
      });
      localStorage.setItem("orders", JSON.stringify(items))
      //   category: food.category,
      //         id: food.id,
      //         price: food.price,
      //         productName: food.productName,
      //         quantity: food.quantity,
      //         url: food.url,
      // }
    },
    [dashboardCart]
  );

  const catergoryLabels = [
    {
      label: "Budget Friendly",
      count: 12,
    },
    {
      label: "Restuarant Favorite",
      count: 14,
    },
    {
      label: "Fastest Near You",
      count: 22,
    },
    {
      label: "Recommended Items",
      count: 18,
    },
    {
      label: "Recent Orders",
      count: 13,
    },
  ];

  const handleCart = (data: any, operation: string, categ: string) => {
    const updatedData = presentdata?.map((item: any) => {
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

    setPresentation(updatedData as any);
    (dashboardCart as any)[categ] = updatedData;
    createCart(dashboardCart);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getRandomItem = (arr: any) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  };
  const prepareData = (payload: any) => {
    const data1 = payload.map((item: any) => {
      return { ...item, quantity: 0 };
    });
    return data1;
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/v1/get-items")
      .then((response) => {
        setData(prepareData(response.data.items));
        prepareCart(prepareData(response.data.items));
      })
      .catch((error) => {
        console.log("Error while retreiveing items: ", error);
      });
  }, []);

  const prepareCart = useCallback(
    (cartdata: any) => {
      const makedata = cartdata;
      const budget = makedata?.filter((item: any) => Number(item.price) < 10);
      const trendings: any = [];
      for (let i = 0; i < 10; i++) {
        trendings.push(getRandomItem(makedata));
      }
      const trending = trendings.filter(
        (item: any, index: any) => trendings.indexOf(item) === index
      );
      const readyfor = makedata
        ?.filter(
          (item: any) =>
            item.category === "appetizers" || item.category === "main-course"
        )
        .slice(0, 8);
      const restu: any = [];
      for (let i = 0; i < 10; i++) {
        restu.push(getRandomItem(makedata));
      }
      const fav = restu.filter(
        (item: any, index: any) => restu.indexOf(item) === index
      );
      const finalData = {
        recent: trending.slice(0, 8),
        trending: trending.slice(0, 8),
        favorite: fav.slice(0, 8),
        budget: budget.slice(0, 8),
        ready: readyfor.slice(0, 8),
      };
      setDashboardCart(finalData as any);
    },
    [data]
  );

  useEffect(() => {
    prepareCart(data);
  }, [data]);

  useEffect(() => {
    if (selectedCat === 0) {
      setPresentation((dashboardCart as any)?.budget);
    } else if (selectedCat === 1) {
      setPresentation((dashboardCart as any)?.favorite);
    } else if (selectedCat === 2) {
      setPresentation((dashboardCart as any)?.ready);
    } else if (selectedCat === 3) {
      setPresentation((dashboardCart as any)?.trending);
    } else {
      setPresentation((dashboardCart as any)?.recent);
    }
  }, [dashboardCart, selectedCat]);

  const getCategoriesItem = (index: number) => {
    return (
      <Flex
        bg={selectedCat === index ? "orange.400" : "gray.100"}
        my="2"
        py="2"
        px="4"
        borderRadius="xl"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        onClick={() => setSelectedCat(index)}
      >
        <Flex direction="row" alignItems="center">
          {/* <IconButton
            colorScheme="orange"
            aria-label="Call Segun"
            size="lg"
            icon={<PhoneIcon />}
          /> */}
          <Flex alignItems="start" direction="column" py="2" mx="3">
            <Text
              fontSize="lg"
              fontWeight="semibold"
              textColor={selectedCat === index ? "white" : "black"}
            >
              {catergoryLabels[index].label}
            </Text>
            {/* <Text
              fontSize="md"
              textColor={selectedCat === index ? "white" : "gray.600"}
            >
              {catergoryLabels[index].count} foods
            </Text> */}
          </Flex>
        </Flex>
        <Icon
          as={ArrowRightIcon}
          boxSize={3}
          mr="4"
          textColor={selectedCat === index ? "white" : "black"}
        />
      </Flex>
    );
  };

  const getOrderItem = (item: any) => {
    return (
      <Flex>
        <Flex
          bg={"gray.100"}
          borderRadius={"2xl"}
          direction={"column"}
          maxW={"250px"}
        >
          <Image
            src={item.url}
            width={"250px"}
            height={"150px"}
            borderRadius={"xl"}
          />
          <Flex mt="1" mb="2" mx="4" direction={"column"}>
            <Text fontSize={"lg"} fontWeight={"semibold"} my="2">
              {_.capitalize(item.productName)}
            </Text>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                ${item.price}
              </Text>
              {item.quantity === 0 ? (
                <Button
                  colorScheme="orange"
                  rounded={"full"}
                  borderRadius={"full"}
                  size={"sm"}
                  onClick={() =>
                    handleCart(item, "add", getCategoryIndexMapper(selectedCat))
                  }
                >
                  order
                </Button>
              ) : (
                <HStack>
                  <Button
                    colorScheme="orange"
                    rounded={"full"}
                    size={"sm"}
                    onClick={() =>
                      handleCart(
                        item,
                        "minus",
                        getCategoryIndexMapper(selectedCat)
                      )
                    }
                  >
                    -
                  </Button>
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    {item.quantity}
                  </Text>
                  <Button
                    colorScheme="orange"
                    rounded={"full"}
                    size={"sm"}
                    onClick={() =>
                      handleCart(
                        item,
                        "add",
                        getCategoryIndexMapper(selectedCat)
                      )
                    }
                  >
                    +
                  </Button>
                </HStack>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const getTrendingItem = (item: any) => {
    return (
      <>
        <Flex
          my="2"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack alignItems="start">
            <Text fontSize="xl" fontWeight="semibold">
              {item?.productName}
            </Text>
            <Text textColor="orange.500" fontWeight="semibold">
              ${item?.price}
            </Text>
          </VStack>
          <Image src={item?.url} width="80px" height="80px" borderRadius="xl" />
        </Flex>
        <Divider />
      </>
    );
  };

  return (
    <Flex direction={"column"}>
      {!isLoading && <Loader />}
      <Flex direction="column">
        <Flex mx="10" mt="6">
          <Image src={banner} w="73%" h="60" borderRadius="2xl" />
          <Image src={banner2} w="25%" h="60" borderRadius="2xl" ml="10" />
        </Flex>
        <HStack gap={4} mx="10" my="10" alignItems="start">
          <Flex
            w="20%"
            bg="white"
            borderRadius="2xl"
            px="6"
            py="4"
            shadow="base"
            direction="column"
          >
            <Flex justifyContent="space-between" alignItems="center" w="100%">
              <Text textColor="black" fontWeight="semibold" fontSize="2xl">
                Categories
              </Text>
            </Flex>
            <Flex direction="column" mt="4">
              {[1, 2, 3, 4, 5]?.map((item, index) => {
                return getCategoriesItem(index);
              })}
            </Flex>
          </Flex>
          <Flex
            w="60%"
            bg="white"
            borderRadius="2xl"
            py="4"
            px="6"
            direction="column"
            shadow="base"
          >
            <Text textColor="black" fontWeight="semibold" fontSize="2xl">
              Orders
            </Text>
            <Grid
              mt="4"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
              width={"100%"}
              mb="6"
            >
              {presentdata?.map((item) => {
                return <GridItem>{getOrderItem(item)}</GridItem>;
              })}
            </Grid>
          </Flex>
          <Flex
            w="20%"
            bg="white"
            borderRadius="xl"
            py="4"
            px="6"
            shadow="base"
            direction="column"
          >
            <Text textColor="black" fontWeight="semibold" fontSize="2xl">
              Recommended Items
            </Text>

            <Flex direction="column" mt="4">
              {(dashboardCart as any)?.trending
                ?.slice(0, 5)
                ?.map((item: any) => {
                  return getTrendingItem(item);
                })}
            </Flex>
            {/* <Text mt="2" textColor="orange.500" fontWeight="semibold" ml="24">
              View More +
            </Text> */}
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};
export default Dashboard;
