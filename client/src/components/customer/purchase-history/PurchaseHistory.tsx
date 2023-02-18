import { Flex, Image, Text } from "@chakra-ui/react";
import purchase from "../../../assets/purchase-history.jpg";
import React from "react";

const PurchaseHistory = () => {
  return (
    <Flex direction={"column"} justifyContent="center">
      <Flex justifyContent={"center"} direction="column" alignItems={"center"}>
        <Image
          src={purchase}
          width={"100%"}
          height="72"
          filter={"auto"}
          brightness="75%"
        />
        <Flex
          bg={"white"}
          rounded="lg"
          py="4"
          px="28"
          mt="-10"
          zIndex={10}
          shadow="base"
        >
          <Text
            fontSize={"2xl"}
            fontWeight="semibold"
            fontFamily={"'Nunito', sans-serif"}
          >
            Purchase History
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PurchaseHistory;