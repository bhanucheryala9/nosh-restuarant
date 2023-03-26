import {
  Avatar,
  Box,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import welcome from "../assets/welcome-4.jpg";
import section2 from "../assets/section-2.jpg";
import section3 from "../assets/section-3.jpg";
import Loader from "./common/Loader";
import { CSSProperties, useEffect, useState } from "react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Flex direction={"column"}>
      {!isLoading && <Loader />}
      <Flex style={{ background: "rgba(0, 0, 0, 0.5)" }} position="relative">
       
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
           
            </Flex>
          </GridItem>
        </Grid>
      </Flex>

     
       
    </Flex>
  );
};
export default Dashboard;