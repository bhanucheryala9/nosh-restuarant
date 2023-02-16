import { Flex, HStack, Text, Image, InputGroup, InputLeftAddon, Input, InputRightAddon } from "@chakra-ui/react";
import React from "react";
import biryani from "../../../assets/biryani.jpg";

const CartItem = () => {
  return (
    <Flex my="4">
      <Flex>
        <Image src={biryani} maxH={14} maxW={14} borderRadius="lg" />
      </Flex>
      <Flex mx="4" direction={"column"} >
        <HStack justifyContent={"space-between"}>
          <Text >
            Biryani
          </Text>
          <Text  textColor="orange.600" >
            $11
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"sm"}>X 1</Text>
          <Text>
            <InputGroup size="sm" colorScheme={"orange"} borderColor="orange.500">
              <InputLeftAddon children="-" />
              <Input  />
              <InputRightAddon children="+" />
            </InputGroup>
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CartItem;