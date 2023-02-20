import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import payments from "../../../assets/payments.jpg";
const Payments = () => {
  return (
    <Flex direction={"column"} justifyContent="center">
      <Flex justifyContent={"center"} direction="column" alignItems={"center"}>
        <Image
          src={payments}
          width={"100%"}
          height="72"
          filter={"auto"}
          brightness="50%"
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
            Payments Section
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Payments;
