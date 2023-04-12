import {
  Flex,
  HStack,
  Text,
  Image,
  Grid,
} from "@chakra-ui/react";
import "./dashboard.css";
import Loader from "./common/Loader";
import { useCallback, useEffect, useState } from "react";
import banner from "../assets/banner.jpg";
import banner2 from "../assets/banner-2.jpg";


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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