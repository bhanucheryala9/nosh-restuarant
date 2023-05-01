import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Image,
  Divider,
  Button,
  CardFooter,
  ButtonGroup,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import welcome from "../assets/welcome-4.jpg";
import section2 from "../assets/section-2.jpg";
import section3 from "../assets/section-3.jpg";
import "./dashboard.css";
import Cart from "./customer/cart/Cart";
import Loader from "./common/Loader";
import { CSSProperties, useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import biryani from "../assets/biryani.jpg";
import usersFood from "../test-data/customer/user-specific.json";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userData } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex direction={"column"}>
      {!isLoading && <Loader />}
      <Flex style={{ background: "rgba(0, 0, 0, 0.5)" }} position="relative">
        <Box filter="auto" brightness="35%" overflow={"hidden"}>
          <img
            src={welcome}
            alt="welcome screen"
            style={{
              minWidth: "100%",
              animation: "zoom-in-zoom-out 12s ease infinite",
              overflow: "hidden",
            }}
          />
        </Box>
        <Box
          position="absolute"
          top={{ lg: "20%", base: "20%" }}
          left={{ lg: "30%", base: "5%" }}
        >
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "5xl" }}
            color="white"
            zIndex={1000}
            fontWeight="semibold"
            textShadow="0 2px px black"
            fontFamily="'Permanent Marker', cursive"
          >
            {" "}
            Welcome to our
          </Text>
          <Text
            fontSize={{ base: "4xl", md: "4xl", lg: "9xl" }}
            textColor="red.500"
            fontWeight={"bold"}
            textShadow="0 2px 10px black"
            fontFamily="'Permanent Marker', cursive"
          >
            Nosh{" "}
          </Text>
        </Box>
      </Flex>
      <Flex px="6" py="6" bg="white" alignItems="center" direction={"column"}>
        <Text
          fontFamily={"'Nunito', sans-serif"}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight={"semibold"}
        >
          Indian Cuisines
        </Text>
        <Text
          fontFamily={"'Nunito', sans-serif"}
          fontSize={{ base: "sm", lg: "lg" }}
        >
          Incredibly Tasty Indian Dish
        </Text>
        <Grid
          my={{ base: "6", lg: "4" }}
          templateRows={{ base: "repeat(5, 1fr)", lg: "repeat(1, 1fr)" }}
          templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }}
          gap={4}
        >
          <GridItem
            colSpan={2}
            rowSpan={{ base: 2, lg: 1 }}
            display="flex"
            alignItems={{ base: "start", lg: "center" }}
            justifyContent={{ base: "center", lg: "end" }}
          >
            <Flex
              direction={"column"}
              alignItems="end"
              justifyContent={"center"}
            >
              <Box maxW={{ base: "full", lg: "md" }}>
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Chole Bhature
                </Text>
                <Text fontSize={"md"}>
                  A popular North Indian dish, consisting of spicy chickpea
                  curry (chole) and deep-fried bread (bhature). It is usually
                  served with onion, pickle, and a side of yogurt.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Hyderabad Biryani
                </Text>
                <Text fontSize={"md"}>
                  A fragrant and flavorful rice dish made with spices, herbs,
                  and meat or vegetables. It is usually served with raita, a
                  yogurt-based side dish.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Pav Bjaji
                </Text>
                <Text fontSize={"md"}>
                  A popular street food from Mumbai, consisting of a spicy
                  vegetable curry (bhaji) served with buttered bread (pav). It
                  is often garnished with chopped onions, cilantro, and a
                  squeeze of lime juice.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Rogan Josh
                </Text>
                <Text fontSize={"md"}>
                  A Kashmiri dish made with tender lamb cooked in a rich and
                  flavorful tomato-based gravy, with a blend of spices. It is
                  usually served with rice or naan bread.
                </Text>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 2, lg: 1 }} rowSpan={{ base: 1, lg: 1 }}>
            <Flex justifyContent={{ base: "center" }}>
              <Image src={section2} h={{ base: "64", lg: "full" }} w={"lg"} />
            </Flex>
          </GridItem>
          <GridItem
            colSpan={2}
            rowSpan={{ base: 2, lg: 1 }}
            display="flex"
            alignItems={"center"}
          >
            <Flex
              direction={"column"}
              alignItems="start"
              justifyContent={"center"}
            >
              <Box maxW={"md"}>
                <Text
                  textColor={"orange.600"}
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                >
                  Vegetable Pakoras
                </Text>
                <Text fontSize={"md"}>
                  Deep-fried fritters made with a mixture of vegetables, gram
                  flour, and spices. They are crispy on the outside and soft on
                  the inside, and are usually served with mint chutney or
                  tamarind chutney.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Dahi Bhalla
                </Text>
                <Text fontSize={"md"}>
                  Soft and fluffy lentil dumplings soaked in sweetened yogurt
                  and topped with tamarind chutney, green chutney, and spices.
                  It is a perfect blend of sweet and tangy flavors.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Samosas
                </Text>
                <Text fontSize={"md"}>
                  Triangular-shaped pastries filled with spiced potatoes, peas,
                  or meat. They are usually deep-fried and served with chutney
                  or ketchup.
                </Text>
              </Box>
              <Box maxW={"md"} mt="5">
                <Text
                  textColor={"orange.600"}
                  fontSize="xl"
                  fontWeight={"semibold"}
                >
                  Chilli Chicken
                </Text>
                <Text fontSize={"md"}>
                  A Chinese-inspired dish made with crispy fried chicken tossed
                  in a spicy and tangy sauce. It is usually served with onion
                  rings and lemon wedges.
                </Text>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
      <Flex direction={"column"} position="relative">
        <Flex
          direction={"column"}
          position="absolute"
          top={{ base: "20%", lg: "40%" }}
          left="10%"
          zIndex={1000}
        >
          <Text fontSize={{ sm: "md", lg: "xl" }} textShadow="0 1px 2px black">
            Enjoy Great Recipe
          </Text>
          <Text
            fontSize={{ sm: "lg", lg: "4xl" }}
            fontWeight="semibold"
            textColor={"orange.500"}
            textShadow="0 2px 2px black"
          >
            Simple And Delicious Food
          </Text>
        </Flex>
        <Box filter="auto" brightness="80%">
          <img
            src={section3}
            alt="welcome screen"
            style={{ minWidth: "100%" }}
          />
        </Box>
      </Flex>
      <Flex
        direction={"column"}
        p="4"
        mb="6"
        alignItems={"center"}
        px="6"
        bg="white"
      >
        <Text
          fontFamily={"'Nunito', sans-serif"}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight={"semibold"}
          mt="6"
        >
          Food Suggestion
        </Text>
        <Text
          fontFamily={"'Nunito', sans-serif"}
          fontSize={{ base: "sm", lg: "lg" }}
          mt="2"
          mb="6"
        >
          choose your own taste
        </Text>
        <Flex>
          {usersFood["test@gmail.com"].map((item) => {
            return (
              <Flex
                border={"1px solid"}
                borderColor="orange.500"
                px="4"
                py="6"
                borderRadius={"lg"}
                direction={"column"}
                alignItems="center"
                mx="2"
                mt="4"
                _hover={{
                  backgroundColor: "orange.50",
                }}
                cursor="pointer"
              >
                <Image
                  filter="auto"
                  brightness="70%"
                  maxHeight={"56"}
                  minW={{ base: "full", lg: "xs" }}
                  src={item.url !== "" ? item.url : biryani}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Text
                  fontSize={"2xl"}
                  fontWeight="semibold"
                  mt="6"
                  letterSpacing={"wide"}
                >
                  {item.productName}
                </Text>
                <Text
                  fontSize={"3xl"}
                  fontWeight="bold"
                  my="2"
                  letterSpacing={"wide"}
                  textColor="orange.500"
                >
                  ${item.price}
                </Text>
                <Divider />
                <Button my="4" width={"xs"} colorScheme="orange">
                  Add to Cart
                </Button>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Dashboard;