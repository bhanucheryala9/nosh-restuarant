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
          >
            <Text textColor="black" fontWeight="semibold" fontSize="2xl">
        
            </Text>

            <Flex direction="column" mt="4">
           
            </Flex>
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};
export default Dashboard;