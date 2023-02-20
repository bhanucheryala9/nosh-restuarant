import { Flex, HStack, Text, Image, InputGroup, InputLeftAddon, Input, InputRightAddon } from "@chakra-ui/react";
import React from "react";
import biryani from "../../../assets/biryani.jpg";

const CartItem = () => {
  return (
    <Flex my="4">
      <Flex>
        <Image src={biryani} maxH={14} maxW={14} borderRadius="lg" />
      </Flex>
      <Flex mx="4" direction={"column"} width="100%">
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"lg"} fontWeight="semibold">
            Biryani
          </Text>
          <Text fontSize={"lg"} textColor="orange.600" fontWeight={"semibold"}>
            $11
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={"sm"}>X 1</Text>
          <Text>
            <InputGroup size="sm" colorScheme={"orange"} borderColor="orange.500">
              <InputLeftAddon children="-" />
              <Input placeholder="0" defaultValue={0} w={10} />
              <InputRightAddon children="+" />
            </InputGroup>
          </Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default CartItem;
